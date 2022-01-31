export const MAX_Z_INDEX = 2147483647

export interface Vector2D {
  x: number
  y: number
}

export interface Size2D {
  width: number
  height: number
}

export interface CanvasOptions {
  opacity?: number
  zIndex?: number
}

export class Canvas {
  public el: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public rawWidth: number = 0
  public rawHeight: number = 0
  constructor(el?: HTMLCanvasElement, width?: number, height?: number, private hd: boolean = true) {
    const { el: el_, ctx } = Canvas.initCanvas(el)
    this.el = el_
    this.ctx = ctx
    this.size = [width || window.innerWidth, height || window.innerHeight]
  }

  public get size(): [number, number] {
    return [this.rawWidth, this.rawHeight]
  }

  public set size([newWidth, newHeight]: [number, number]) {
    if (this.rawWidth === newWidth && this.rawHeight === newHeight) {
      return
    }
    this.rawWidth = newWidth
    this.rawHeight = newHeight
    const dpr = (this.hd ? window.devicePixelRatio : 1) ?? 1
    this.el.width = Math.round(this.rawWidth * dpr)
    this.el.height = Math.round(this.rawHeight * dpr)
    this.el.style.width = this.rawWidth + 'px'
    this.el.style.height = this.rawHeight + 'px'
    this.hd && this.ctx.scale(dpr, dpr)
  }

  clear() {
    Canvas.clearCanvas(this.ctx, [this.rawWidth, this.rawHeight])
  }

  to(canvas: Canvas) {
    canvas.ctx.drawImage(this.el, 0, 0, this.rawWidth, this.rawHeight)
  }

  handleResize(_: UIEvent) {
    this.size = [window.innerWidth, window.innerHeight]
  }

  static setCanvasStyle(
    canvas: HTMLCanvasElement,
    canvasOptions: CanvasOptions,
    canvasSize?: [number, number]
  ) {
    const style = canvas.style
    const { zIndex = 0, opacity = 1 } = canvasOptions
    style.position = 'fixed'
    style.top = '0'
    style.left = '0'
    style.zIndex = zIndex.toString()
    style.width = (canvasSize ? canvasSize[0] : canvas.width).toString() + 'px'
    style.height = (canvasSize ? canvasSize[1] : canvas.height).toString() + 'px'
    opacity !== 1 && (style.opacity = opacity.toString())
    style.pointerEvents = 'none'
  }

  static initCanvas(el?: HTMLCanvasElement) {
    if (!el) {
      el = document.createElement('canvas') as HTMLCanvasElement
    }
    const ctx = el.getContext('2d') as CanvasRenderingContext2D
    return {
      el,
      ctx,
    }
  }

  static createOffscreenCanvas() {
    return new Canvas()
  }

  static clearCanvas(ctx: CanvasRenderingContext2D, canvasSize: [number, number]) {
    ctx.clearRect(0, 0, canvasSize[0], canvasSize[1])
  }
}

export class DrawBoard {
  public canvas: Canvas
  private offscreenCanvas: Canvas | null
  public drawingContext: CanvasRenderingContext2D
  constructor(
    el: HTMLCanvasElement,
    width: number,
    height: number,
    hd: boolean = true,
    useOffscreenCanvas: boolean = true,
    canvasOptions: CanvasOptions = {
      zIndex: 0,
      opacity: 1,
    }
  ) {
    this.canvas = new Canvas(el, width, height, hd)
    Canvas.setCanvasStyle(this.canvas.el, canvasOptions, [width, height])
    this.offscreenCanvas = useOffscreenCanvas ? new Canvas(undefined, width, height, hd) : null
    this.drawingContext = this.offscreenCanvas ? this.offscreenCanvas.ctx : this.canvas.ctx
  }

  draw(callback: (ctx: CanvasRenderingContext2D) => void) {
    const canvasUtils = this.offscreenCanvas ? this.offscreenCanvas : this.canvas
    canvasUtils.clear()
    callback(canvasUtils.ctx)
  }

  render() {
    if (!this.offscreenCanvas) {
      return
    }
    this.canvas.clear()
    this.offscreenCanvas.to(this.canvas)
  }

  handleResize(event: UIEvent) {
    this.canvas.handleResize(event)
    this.offscreenCanvas && this.offscreenCanvas.handleResize(event)
  }

  clear() {
    this.canvas.clear()
    this.offscreenCanvas && this.offscreenCanvas.clear()
  }
}
