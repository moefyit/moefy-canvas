import { EventsHandler, showBadge } from '@moefy-canvas/utils'
import { isMobile, isTouchEvent } from '@moefy-canvas/utils'
import { Particle, GlobalSpeed } from './particle'
import { debounce } from 'ts-debounce'
import { Theme, type ThemeConfig, type CanvasOptions } from '@moefy-canvas/core'
import { Vector2D, DrawBoard } from '@moefy-canvas/core'

export interface MeteorConfig extends ThemeConfig {
  numParticles?: number | null
  particleColor?: string
}

export class Meteor implements Theme<MeteorConfig> {
  #numParticles: number | null
  #particleColor: string
  #canvasOptions: CanvasOptions
  #board: DrawBoard | null = null
  #particles: Set<Particle> = new Set()
  #mousePosition: Vector2D | null = null
  #globalSpeed: GlobalSpeed = { x: 0, y: 0, tx: 0, ty: 0, z: 5e-4 }
  #paused: boolean = false
  #stopped: boolean = false
  #eventsHandler: EventsHandler = new EventsHandler()
  constructor(
    { numParticles = null, particleColor = 'rgba(102,175,239,.2)' }: MeteorConfig = {},
    canvasOptions: CanvasOptions = {}
  ) {
    this.#numParticles = numParticles
    this.#particleColor = particleColor
    this.#canvasOptions = canvasOptions

    this.animate = this.animate.bind(this)
  }

  mount(el: HTMLCanvasElement) {
    this.#stopped = false
    this.#board = new DrawBoard(
      el,
      window.innerWidth,
      window.innerHeight,
      true,
      true,
      this.#canvasOptions
    )
    this.#initParticles()
    this.#startAnimation()
    this.#listen()
    showBadge('Theme Meteor 🌠', { leftBgColor: '#66afe0' })
  }

  unmount() {
    this.#unlisten()
    this.#clearParticles()
    this.#stopped = true
    this.#mousePosition = null
  }

  #initParticles() {
    const numParticles = this.#numParticles ?? (window.innerWidth + window.innerHeight) / 8
    for (let i = 0; i < numParticles; i++) {
      const particle = new Particle(0, 0, 0)
        .bindColor(this.#particleColor)
        .bindGlobalSpeed(this.#globalSpeed)
      particle.reset(this.#board!.size, false)
      this.#particles.add(particle)
    }
  }

  #clearParticles() {
    this.#particles.clear()
  }

  #listen() {
    if (isMobile()) {
      this.#eventsHandler.add('touchmove', this.#handleMouseMove.bind(this))
      this.#eventsHandler.add('touchend', this.#handleMouseLeave.bind(this))
    } else {
      this.#eventsHandler.add('mousemove', this.#handleMouseMove.bind(this))
      this.#eventsHandler.add('mouseleave', this.#handleMouseLeave.bind(this))
    }
    this.#eventsHandler.add('visibilitychange', this.#handleVisibilityChange.bind(this))
    this.#eventsHandler.add('resize', debounce(this.#handleResize.bind(this), 500))
    this.#eventsHandler.startAll()
  }

  #unlisten() {
    this.#eventsHandler.stopAll()
    this.#eventsHandler.clear()
  }

  #startAnimation() {
    requestAnimationFrame(this.animate)
  }

  #handleMouseMove(event: MouseEvent | TouchEvent) {
    const currentPosition = {
      x: isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
      y: isTouchEvent(event) ? event.touches[0].clientY : event.clientY,
    }
    if (this.#mousePosition) {
      const currentSpeed = {
        x: currentPosition.x - this.#mousePosition.x,
        y: currentPosition.y - this.#mousePosition.y,
      }
      this.#globalSpeed.tx = this.#globalSpeed.x + currentSpeed.x / 8
      this.#globalSpeed.ty = this.#globalSpeed.y + currentSpeed.y / 8
    }
    this.#mousePosition = currentPosition
  }

  #handleMouseLeave(event: MouseEvent | TouchEvent) {
    this.#mousePosition = null
  }

  #handleResize(event: UIEvent) {
    this.#board!.handleResize(event)
    for (const particle of this.#particles) {
      particle.reset(this.#board!.size, false)
    }
  }

  #handleVisibilityChange(event: any) {
    this.#paused = document.hidden
  }

  private animate(currentTime: number) {
    if (this.#stopped) {
      this.#board!.clear()
      return
    }

    requestAnimationFrame(this.animate)

    if (this.#paused) {
      return
    }

    // 移动一步
    this.#globalSpeed.tx *= 0.95
    this.#globalSpeed.ty *= 0.95
    this.#globalSpeed.x += 0.7 * (this.#globalSpeed.tx - this.#globalSpeed.x)
    this.#globalSpeed.y += 0.7 * (this.#globalSpeed.ty - this.#globalSpeed.y)
    for (const particle of this.#particles) {
      particle.move(this.#board!.size)
    }

    // 绘制与渲染
    this.#board!.draw((ctx, canvasSize) => {
      for (const particle of this.#particles) {
        particle.draw(ctx, currentTime)
      }
    })
    this.#board!.render()
  }
}
