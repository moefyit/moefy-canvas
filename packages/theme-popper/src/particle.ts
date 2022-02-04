import { Vector2D, Size2D } from '@moefy-canvas/core'

export abstract class Particle {
  #angle: number
  #speed: number
  protected position: Vector2D
  #renderCount: number = 0
  constructor(
    origin: Vector2D,
    speed: number,
    protected size: number,
    protected color: string,
    angle: number
  ) {
    this.#angle = angle
    this.#speed = speed
    this.position = { ...origin }
  }

  abstract draw(ctx: CanvasRenderingContext2D, canvasSize: Size2D)

  move() {
    this.position.x = Math.sin(this.#angle) * this.#speed + this.position.x
    this.position.y =
      Math.cos(this.#angle) * this.#speed + this.position.y + this.#renderCount * 0.3
    this.#renderCount++
  }

  shouleRemove(canvasSize: Size2D) {
    return (
      this.position.x < 0 ||
      this.position.x > canvasSize.width ||
      this.position.y > canvasSize.height
    )
  }
}

export class Circle extends Particle {
  draw(ctx: CanvasRenderingContext2D, canvasSize: Size2D) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

export class Star extends Particle {
  #rotate: number = 0
  constructor(origin: Vector2D, size: number, speed: number, color: string, angle: number) {
    super(origin, size, speed, color, angle)
  }

  draw(ctx: CanvasRenderingContext2D, canvasSize: Size2D) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    const R = this.size * 2
    const r = this.size
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        Math.cos(((18 + 72 * i - this.#rotate) / 180) * Math.PI) * R + this.position.x,
        -Math.sin(((18 + 72 * i - this.#rotate) / 180) * Math.PI) * R + this.position.y
      )
      ctx.lineTo(
        Math.cos(((54 + 72 * i - this.#rotate) / 180) * Math.PI) * r + this.position.x,
        -Math.sin(((54 + 72 * i - this.#rotate) / 180) * Math.PI) * r + this.position.y
      )
    }
    ctx.fill()
    this.#rotate += 5
  }
}

type ParticleConstructor = {
  new (origin: Vector2D, speed: number, size: number, color: string, angle: number): Particle
}

export class ParticleFactory {
  static shapeMap: Map<string, ParticleConstructor> = new Map([
    ['star', Star],
    ['circle', Circle],
  ])

  static create(
    shape: string,
    origin: Vector2D,
    speed: number,
    size: number,
    color: string,
    angle: number
  ) {
    const Shape = this.shapeMap.get(shape)!
    const shapeToCreate: Particle = new Shape(origin, speed, size, color, angle)
    return shapeToCreate
  }
}
