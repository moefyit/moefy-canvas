import { Theme, type ThemeConfig, type CanvasOptions } from '@moefy-canvas/core'
import { DrawBoard } from '@moefy-canvas/core'
import { EventsHandler, showBadge } from '@moefy-canvas/utils'
import { isMobile, isTouchEvent } from '@moefy-canvas/utils'
import { debounce } from 'ts-debounce'
import { Boom } from './boom'

export enum PopperShape {
  Star = 'star',
  Circle = 'circle',
}

export interface PopperConfig extends ThemeConfig {
  shape?: PopperShape
  size?: number
  numParticles?: number
}

export class Popper implements Theme<PopperConfig> {
  #shape: PopperShape
  #size: number
  #numParticles: number
  #board: DrawBoard | null = null
  #booms: Set<Boom> = new Set()
  #running: boolean = false
  #canvasOptions: CanvasOptions
  #eventsHandler: EventsHandler = new EventsHandler()
  constructor(
    { shape = PopperShape.Star, size = 2, numParticles = 10 }: PopperConfig = {},
    canvasOptions: CanvasOptions = {}
  ) {
    this.#shape = shape
    this.#size = size
    this.#numParticles = numParticles
    this.#canvasOptions = canvasOptions

    this.animate = this.animate.bind(this)
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
    showBadge('Theme Popper 🎉', { leftBgColor: '#ffb366' })
  }

  unmount() {
    this.#unlisten()
    this.#running = false
  }

  #listen() {
    if (isMobile()) {
      this.#eventsHandler.add('touchstart', this.#handleMouseDown.bind(this))
    } else {
      this.#eventsHandler.add('mousedown', this.#handleMouseDown.bind(this))
    }
    this.#eventsHandler.add('visibilitychange', this.#handleVisibilityChange.bind(this))
    this.#eventsHandler.add('resize', debounce(this.#handleResize.bind(this), 500))
    this.#eventsHandler.startAll()
  }

  #unlisten() {
    this.#eventsHandler.stopAll()
    this.#eventsHandler.clear()
  }

  #handleMouseDown(event: MouseEvent | TouchEvent) {
    const currentPosition = {
      x: isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
      y: isTouchEvent(event) ? event.touches[0].clientY : event.clientY,
    }
    const boom = new Boom(this.#shape, { ...currentPosition }, this.#size, this.#numParticles)
    this.#booms.add(boom)
    this.#running || this.#startAnimation()
  }

  #handleResize(event: UIEvent) {
    this.#board!.handleResize(event)
  }

  #handleVisibilityChange(event: any) {
    this.#booms.clear()
    this.#running = false
  }

  #startAnimation() {
    requestAnimationFrame(this.animate)
  }

  private animate() {
    this.#running = true
    if (this.#booms.size === 0) {
      this.#running = false
      this.#board!.clear()
      return
    }

    requestAnimationFrame(this.animate)

    for (const boom of this.#booms) {
      if (boom.stopped) {
        this.#booms.delete(boom)
        return
      }
      boom.move(this.#board!.size)
    }

    this.#board!.draw((ctx, canvasSize) => {
      for (const boom of this.#booms) {
        boom.draw(ctx, canvasSize)
      }
    })
    this.#board!.render()
  }
}
