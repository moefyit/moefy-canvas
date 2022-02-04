import { Random, EventsHandler } from '@moefy-canvas/utils'
import { isMobile, showBadge } from '@moefy-canvas/utils'
import { debounce } from 'ts-debounce'
import { Theme, ThemeConfig, CanvasOptions } from '@moefy-canvas/core'
import { Vector2D, DrawBoard, Size2D } from '@moefy-canvas/core'

export interface RibbonConfig extends ThemeConfig {
  size?: number
}

export class Ribbon implements Theme<RibbonConfig> {
  #size: number
  #canvasOptions: CanvasOptions
  #eventsHandler: EventsHandler = new EventsHandler()
  #board: DrawBoard | null = null
  #angle: number = 0
  constructor({ size = 90 }: RibbonConfig, canvasOptions: CanvasOptions) {
    this.#size = size
    this.#canvasOptions = canvasOptions
  }

  mount(el: HTMLCanvasElement) {
    this.#board = new DrawBoard(
      el,
      window.innerWidth,
      window.innerHeight,
      true,
      true,
      this.#canvasOptions
    )
    this.#listen()
    this.#redraw()
    showBadge('Theme Ribbon 🎗️', { leftBgColor: '#b300b2' })
  }

  unmount() {
    this.#board!.clear()
    this.#unlisten()
  }

  #listen() {
    if (isMobile()) {
      this.#eventsHandler.add('touchstart', this.#handleMouseDown.bind(this))
    } else {
      this.#eventsHandler.add('mousedown', this.#handleMouseDown.bind(this))
    }
    this.#eventsHandler.add('resize', debounce(this.#handleResize.bind(this), 500))
    this.#eventsHandler.startAll()
  }

  #unlisten() {
    this.#eventsHandler.stopAll()
    this.#eventsHandler.clear()
  }

  #handleResize(event: UIEvent) {
    this.#board!.handleResize(event)
    this.#redraw()
  }

  #handleMouseDown(_: MouseEvent | TouchEvent) {
    this.#redraw()
  }

  #redraw() {
    this.#board!.draw((ctx, canvasSize) => {
      this.#draw(ctx, canvasSize)
    })
    this.#board!.render()
  }

  #draw(ctx: CanvasRenderingContext2D, canvasSize: Size2D) {
    const { width, height } = canvasSize
    const foldMark: [Vector2D, Vector2D] = [
      { x: 0, y: height * 0.7 + this.#size },
      { x: 0, y: height * 0.7 - this.#size },
    ]
    while (foldMark[1].x < width + this.#size) this.#drawFold(ctx, foldMark)
  }

  #drawFold(ctx: CanvasRenderingContext2D, foldMark: [Vector2D, Vector2D]) {
    const size = this.#size
    const p1 = foldMark[0]
    const p2 = foldMark[1]
    const p3 = { x: p2.x + Random.randomFloat(-0.25, 1.75) * size, y: this.#nextY(p2.y) }
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.lineTo(p3.x, p3.y)
    ctx.closePath()
    ctx.fillStyle = this.#nextColor()
    ctx.fill()
    foldMark[0] = p2
    foldMark[1] = p3
  }

  #nextColor() {
    const pi_2 = Math.PI * 2
    this.#angle += pi_2 * 0.02
    this.#angle %= pi_2
    return (
      '#' +
      (
        ((Math.cos(this.#angle) * 127 + 128) << 16) |
        ((Math.cos(this.#angle + pi_2 / 3) * 127 + 128) << 8) |
        (Math.cos(this.#angle + (pi_2 / 3) * 2) * 127 + 128)
      )
        .toString(16)
        .padStart(6, '0')
    )
  }

  #nextY(y: number) {
    const { width: _, height } = this.#board!.size
    const t = y + Random.randomFloat(-1.1, 0.9) * this.#size
    return t > height || t < 0 ? this.#nextY(y) : t
  }
}
