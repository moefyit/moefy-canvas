import { Vector2D } from '@moefy-canvas/core'

export class Particle {
  public position: Vector2D
  public renderCount: number = 0
  constructor(
    public origin: Vector2D,
    public size: number,
    public speed: number,
    public color: string,
    public angle: number,
    public context: CanvasRenderingContext2D
  ) {
    this.position = { ...this.origin }
  }

  draw() {}

  move() {
    this.position.x = Math.sin(this.angle) * this.speed + this.position.x
    this.position.y = Math.cos(this.angle) * this.speed + this.position.y + this.renderCount * 0.3
    this.renderCount++
  }
}

export class Circle extends Particle {
  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2)
    this.context.fill()
  }
}

export class Star extends Particle {
  public rotate: number = 0
  constructor(
    origin: Vector2D,
    size: number,
    speed: number,
    color: string,
    angle: number,
    context: CanvasRenderingContext2D
  ) {
    super(origin, size, speed, color, angle, context)
  }

  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    const R = this.size * 2
    const r = this.size
    for (let i = 0; i < 5; i++) {
      this.context.lineTo(
        Math.cos(((18 + 72 * i - this.rotate) / 180) * Math.PI) * R + this.position.x,
        -Math.sin(((18 + 72 * i - this.rotate) / 180) * Math.PI) * R + this.position.y
      )
      this.context.lineTo(
        Math.cos(((54 + 72 * i - this.rotate) / 180) * Math.PI) * r + this.position.x,
        -Math.sin(((54 + 72 * i - this.rotate) / 180) * Math.PI) * r + this.position.y
      )
    }
    this.context.fill()
    this.rotate += 5
  }
}
