import { Theme, ThemeConfig, CanvasOptions } from '@moefy-canvas/core'
import { DrawBoard, Size2D } from '@moefy-canvas/core'
import { EventsHandler } from '@moefy-canvas/utils'
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
  private shape: PopperShape
  private size: number
  private numParticles: number
  private board: DrawBoard | null
  private booms: Set<Boom> = new Set()
  private running: boolean = false
  private eventsHandler: EventsHandler = new EventsHandler()
  constructor(
    { shape = PopperShape.Star, size = 2, numParticles = 10 }: PopperConfig,
    private canvasOptions: CanvasOptions
  ) {
    this.shape = shape
    this.size = size
    this.numParticles = numParticles
    this.board = null

    this.animate = this.animate.bind(this)
  }

  mount(el: HTMLCanvasElement) {
    this.board = new DrawBoard(
      el,
      window.innerWidth,
      window.innerHeight,
      true,
      true,
      this.canvasOptions
    )
    this.listen()
  }

  unmount() {
    this.unlisten()
    this.running = false
  }

  private listen() {
    if (isMobile()) {
      this.eventsHandler.add('touchstart', this.handleMouseDown.bind(this))
    } else {
      this.eventsHandler.add('mousedown', this.handleMouseDown.bind(this))
    }
    this.eventsHandler.add('visibilitychange', this.handleVisibilityChange.bind(this))
    this.eventsHandler.add('resize', debounce(this.handleResize.bind(this), 500))
    this.eventsHandler.startAll()
  }

  private unlisten() {
    this.eventsHandler.stopAll()
    this.eventsHandler.clear()
  }

  private handleMouseDown(event: MouseEvent | TouchEvent) {
    const currentPosition = {
      x: isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
      y: isTouchEvent(event) ? event.touches[0].clientY : event.clientY,
    }
    const boom = new Boom({ ...currentPosition }, this.shape, this.size, this.numParticles)
    this.booms.add(boom)
    this.running || this.startAnimation()
  }

  private handleResize(event: UIEvent) {
    this.board!.handleResize(event)
  }

  private handleVisibilityChange(event: any) {
    this.booms.clear()
    this.running = false
  }

  private animate() {
    this.running = true
    if (this.booms.size === 0) {
      this.running = false
      this.board!.clear()
      return
    }

    requestAnimationFrame(this.animate)

    for (const boom of this.booms) {
      if (boom.stopped) {
        this.booms.delete(boom)
        return
      }
      boom.move(this.board!.canvas.size)
    }

    this.board!.draw((ctx, canvasSize) => {
      for (const boom of this.booms) {
        boom.draw(ctx, canvasSize)
      }
    })
    this.board!.render()
  }

  private startAnimation() {
    requestAnimationFrame(this.animate)
  }
}
