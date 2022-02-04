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

class Canvas {
  el: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  #rawSize: Size2D = { width: 0, height: 0 }
  #hd: boolean
  constructor(el?: HTMLCanvasElement, width?: number, height?: number, hd: boolean = true) {
    const { el: el_, ctx } = Canvas.initCanvas(el)
    this.el = el_
    this.ctx = ctx
    this.#hd = hd
    this.size = { width: width || window.innerWidth, height: height || window.innerHeight }
  }

  get size(): Size2D {
    return {
      ...this.#rawSize,
    }
  }

  set size({ width: newWidth, height: newHeight }: Size2D) {
    if (this.#rawSize.width === newWidth && this.#rawSize.height === newHeight) {
      return
    }
    this.#rawSize.width = newWidth
    this.#rawSize.height = newHeight
    const dpr = (this.#hd ? window.devicePixelRatio : 1) ?? 1
    this.el.width = Math.round(this.#rawSize.width * dpr)
    this.el.height = Math.round(this.#rawSize.height * dpr)
    this.el.style.width = this.#rawSize.width + 'px'
    this.el.style.height = this.#rawSize.height + 'px'
    this.#hd && this.ctx.scale(dpr, dpr)
  }

  clear() {
    Canvas.clearCanvas(this.ctx, { ...this.#rawSize })
  }

  to(canvas: Canvas) {
    canvas.ctx.drawImage(this.el, 0, 0, this.#rawSize.width, this.#rawSize.height)
  }

  handleResize(_: UIEvent) {
    this.size = { width: window.innerWidth, height: window.innerHeight }
  }

  static setCanvasStyle(
    canvas: HTMLCanvasElement,
    canvasOptions: CanvasOptions,
    canvasSize?: Size2D
  ) {
    const style = canvas.style
    const { zIndex = 0, opacity = 1 } = canvasOptions
    style.position = 'fixed'
    style.top = '0'
    style.left = '0'
    style.zIndex = zIndex.toString()
    style.width = (canvasSize ? canvasSize.width : canvas.width).toString() + 'px'
    style.height = (canvasSize ? canvasSize.height : canvas.height).toString() + 'px'
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

  static clearCanvas(ctx: CanvasRenderingContext2D, canvasSize: Size2D) {
    const { width, height } = canvasSize
    ctx.clearRect(0, 0, width, height)
  }
}

export class DrawBoard {
  #canvas: Canvas
  #offscreenCanvas: Canvas | null
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
    this.#canvas = new Canvas(el, width, height, hd)
    Canvas.setCanvasStyle(this.#canvas.el, canvasOptions, { width, height })
    this.#offscreenCanvas = useOffscreenCanvas ? new Canvas(undefined, width, height, hd) : null
  }

  get size(): Size2D {
    return this.#canvas.size
  }

  draw(callback: (ctx: CanvasRenderingContext2D, canvasSize: Size2D) => void) {
    const drawingCanvas = this.#offscreenCanvas ?? this.#canvas
    drawingCanvas.clear()
    callback(drawingCanvas.ctx, {
      ...drawingCanvas.size,
    })
  }

  render() {
    if (!this.#offscreenCanvas) {
      return
    }
    this.#canvas.clear()
    this.#offscreenCanvas.to(this.#canvas)
  }

  handleResize(event: UIEvent) {
    this.#canvas.handleResize(event)
    this.#offscreenCanvas && this.#offscreenCanvas.handleResize(event)
  }

  clear() {
    this.#canvas.clear()
    this.#offscreenCanvas && this.#offscreenCanvas.clear()
  }
}
