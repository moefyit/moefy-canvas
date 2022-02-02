import { Random, EventsHandler, showBadge } from '@moefy-canvas/utils'
import { isMobile, isTouchEvent } from '@moefy-canvas/utils'
import { Particle } from './particle'
import { debounce } from 'ts-debounce'
import { Theme, ThemeConfig, CanvasOptions } from '@moefy-canvas/core'
import { Vector2D, DrawBoard } from '@moefy-canvas/core'

export enum SparklerMode {
  FOLLOW = 'follow',
  TRAIL = 'trail',
}

export interface SparklerConfig extends ThemeConfig {
  mode?: SparklerMode
  numParticles?: number
  sparkleFactor?: number
  particleDurationRange?: [number, number]
  particleDistanceRange?: [number, number]
  particleSizeRange?: [number, number]
}

export class Sparkler implements Theme<SparklerConfig> {
  private mode: SparklerMode
  private numParticles: number
  private sparkleFactor: number
  private particleDurationRange: [number, number]
  private particleDistanceRange: [number, number]
  private particleSizeRange: [number, number]
  private board: DrawBoard | null
  private particles: Set<Particle>
  private mousePosition: Vector2D | null
  private originalSparkleFactor: number
  private paused: boolean = false
  private stopped: boolean = false
  private eventsHandler: EventsHandler
  constructor(
    {
      mode = SparklerMode.TRAIL,
      numParticles = 20,
      sparkleFactor = 1,
      particleDurationRange = [50, 500],
      particleDistanceRange = [40, 100],
      particleSizeRange = [1, 3],
    }: SparklerConfig,
    private canvasOptions: CanvasOptions
  ) {
    this.mode = mode
    this.numParticles = numParticles
    this.sparkleFactor = sparkleFactor
    this.particleDurationRange = particleDurationRange
    this.particleDistanceRange = particleDistanceRange
    this.particleSizeRange = particleSizeRange
    this.board = null
    this.particles = new Set()
    this.mousePosition = null
    this.originalSparkleFactor = this.sparkleFactor
    this.animate = this.animate.bind(this)
    this.eventsHandler = new EventsHandler()
  }

  mount(el: HTMLCanvasElement) {
    this.stopped = false
    this.board = new DrawBoard(
      el,
      window.innerWidth,
      window.innerHeight,
      true,
      true,
      this.canvasOptions
    )
    this.listen()
    showBadge('Theme Sparkler 🎇', { leftBgColor: '#989900' })
  }

  unmount() {
    this.unlisten()
    this.stopped = true
    this.mousePosition = null
  }

  private listen() {
    if (isMobile()) {
      this.eventsHandler.add('touchstart', this.handleMouseDown.bind(this))
      this.eventsHandler.add('touchmove', this.handleMouseMove.bind(this))
      this.eventsHandler.add('touchend', this.handleMouseUp.bind(this))
    } else {
      this.eventsHandler.add('mousedown', this.handleMouseDown.bind(this))
      this.eventsHandler.add('mousemove', this.handleMouseMove.bind(this))
      this.eventsHandler.add('mouseup', this.handleMouseUp.bind(this))
    }
    this.eventsHandler.add('visibilitychange', this.handleVisibilityChange.bind(this))
    this.eventsHandler.add('resize', debounce(this.handleResize.bind(this), 500))
    this.eventsHandler.startAll()
  }

  private unlisten() {
    this.eventsHandler.stopAll()
    this.eventsHandler.clear()
  }

  private startAnimation() {
    requestAnimationFrame(this.animate)
  }

  private handleMouseMove(event: MouseEvent | TouchEvent) {
    const currentPosition = {
      x: isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
      y: isTouchEvent(event) ? event.touches[0].clientY : event.clientY,
    }
    if (!this.mousePosition) {
      this.mousePosition = { x: currentPosition.x, y: currentPosition.y }
      this.startAnimation()
      return
    }
    this.mousePosition.x = currentPosition.x
    this.mousePosition.y = currentPosition.y
  }

  private handleMouseDown(event: MouseEvent | TouchEvent) {
    const currentPosition = {
      x: isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
      y: isTouchEvent(event) ? event.touches[0].clientY : event.clientY,
    }
    if (!this.mousePosition) {
      this.mousePosition = { x: currentPosition.x, y: currentPosition.y }
      this.startAnimation()
    }
    this.mousePosition.x = currentPosition.x
    this.mousePosition.y = currentPosition.y
    if (this.sparkleFactor === this.originalSparkleFactor) {
      this.sparkleFactor *= 4
    }
  }

  private handleMouseUp(event: MouseEvent | TouchEvent) {
    this.sparkleFactor = this.originalSparkleFactor
  }

  private handleResize(event: UIEvent) {
    this.board!.handleResize(event)
  }

  private handleVisibilityChange(event: any) {
    this.paused = document.hidden
  }

  private animate(currentTime: number) {
    if (this.stopped) {
      this.board!.clear()
      return
    }

    requestAnimationFrame(this.animate)

    if (this.paused) {
      return
    }

    // 移动一步
    for (const particle of this.particles) {
      particle.move(currentTime)
    }

    // 绘制与渲染
    this.board!.draw((ctx, canvasSize) => {
      for (const particle of this.particles) {
        particle.draw(ctx, currentTime)
        if (particle.shouldRemove(currentTime)) {
          this.particles.delete(particle)
        }
      }
    })
    this.board!.render()

    // 添加新的粒子
    while (this.particles.size < this.numParticles) {
      this.particles.add(
        new Particle(
          currentTime + Random.randomInt(0, 300 / this.sparkleFactor),
          this.mode === SparklerMode.TRAIL ? { ...this.mousePosition! } : this.mousePosition!,
          Random.randomFloat(
            this.particleDurationRange[0],
            this.particleDurationRange[1] / this.sparkleFactor
          ),
          Random.randomFloat(
            this.particleDistanceRange[0],
            this.particleDistanceRange[1] * (this.sparkleFactor === 1 ? 1 : this.sparkleFactor / 3)
          ),
          Random.randomFloat(0, Math.PI * 2),
          Random.randomInt(
            this.particleSizeRange[0],
            this.particleSizeRange[1] * (this.sparkleFactor === 1 ? 1 : this.sparkleFactor / 3)
          ),
          Random.choice(['yellow', 'pink', 'red', 'orange', 'purple', 'cyan'])
        )
      )
    }
  }
}
