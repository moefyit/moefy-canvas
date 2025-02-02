export const MAX_Z_INDEX = 2147483647

export interface Vector2D {
  x: number
  y: number
}

export interface Vector3D {
  x: number
  y: number
  z: number
}

export interface Size2D {
  width: number
  height: number
}

export interface CanvasOptions {
  opacity?: number
  zIndex?: number
}

abstract class CanvasWithContext {
  abstract ctx: ImageBitmapRenderingContext | OffscreenCanvasRenderingContext2D
  #rawSize: Size2D = { width: 0, height: 0 }
  hd: boolean
  constructor(hd: boolean = true) {
    this.hd = hd
  }

  get size(): Size2D {
    return this.getSize()
  }

  set size(size: Size2D) {
    this.setSize(size)
  }

  getSize(): Size2D {
    return this.#rawSize
  }

  abstract setSize(size: Size2D): void

  handleResize(_: UIEvent) {
    this.size = { width: window.innerWidth, height: window.innerHeight }
  }
}

class OnscreenCanvasWithContext extends CanvasWithContext {
  el: HTMLCanvasElement
  ctx: ImageBitmapRenderingContext
  constructor(el: HTMLCanvasElement, width?: number, height?: number, hd: boolean = true) {
    super(hd)
    this.el = el
    this.ctx = el.getContext('bitmaprenderer')!
    this.setSize({ width: width || window.innerWidth, height: height || window.innerHeight })
  }

  setSize(size: Size2D) {
    if (this.size.width === size.width && this.size.height === size.height) {
      return
    }
    this.size.width = size.width
    this.size.height = size.height
    const dpr = (this.hd ? window.devicePixelRatio : 1) ?? 1
    this.el.width = Math.round(this.size.width * dpr)
    this.el.height = Math.round(this.size.height * dpr)
    this.el.style.width = this.size.width + 'px'
    this.el.style.height = this.size.height + 'px'
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
}

class OffscreenCanvasWithContext extends CanvasWithContext {
  offscreenCanvas: OffscreenCanvas
  ctx: OffscreenCanvasRenderingContext2D
  constructor(width?: number, height?: number, hd: boolean = true) {
    super(hd)
    this.offscreenCanvas = new OffscreenCanvas(this.size.width, this.size.height)
    this.ctx = this.offscreenCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D
    this.setSize({ width: width || window.innerWidth, height: height || window.innerHeight })
  }

  setSize(size: Size2D) {
    if (this.size.width === size.width && this.size.height === size.height) {
      return
    }
    this.size.width = size.width
    this.size.height = size.height
    const dpr = (this.hd ? window.devicePixelRatio : 1) ?? 1
    this.offscreenCanvas.width = Math.round(this.size.width * dpr)
    this.offscreenCanvas.height = Math.round(this.size.height * dpr)
    this.hd && this.ctx.scale(dpr, dpr)
  }

  to(canvas: OnscreenCanvasWithContext) {
    canvas.ctx.transferFromImageBitmap(this.offscreenCanvas.transferToImageBitmap())
  }

  clear() {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height)
  }
}

export class DrawBoard {
  #canvas: OnscreenCanvasWithContext
  #offscreenCanvas: OffscreenCanvasWithContext
  constructor(
    el: HTMLCanvasElement,
    width: number,
    height: number,
    hd: boolean = true,
    canvasOptions: CanvasOptions = {
      zIndex: 0,
      opacity: 1,
    }
  ) {
    this.#canvas = new OnscreenCanvasWithContext(el, width, height, hd)
    OnscreenCanvasWithContext.setCanvasStyle(this.#canvas.el, canvasOptions, { width, height })
    this.#offscreenCanvas = new OffscreenCanvasWithContext(width, height, hd)
  }

  get size(): Size2D {
    return this.#canvas.size
  }

  draw(callback: (ctx: OffscreenCanvasRenderingContext2D, canvasSize: Size2D) => void) {
    this.#offscreenCanvas.clear()
    callback(this.#offscreenCanvas.ctx, {
      ...this.#offscreenCanvas.size,
    })
  }

  render() {
    this.#offscreenCanvas.to(this.#canvas)
  }

  handleResize(event: UIEvent) {
    this.#canvas.handleResize(event)
    this.#offscreenCanvas.handleResize(event)
  }

  clear() {
    this.#offscreenCanvas.clear()
    this.#offscreenCanvas.to(this.#canvas)
  }
}
