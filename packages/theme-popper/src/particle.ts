import { Vector2D, Size2D } from '@moefy-canvas/core'

export class Particle {
  protected position: Vector2D
  protected renderCount: number = 0
  constructor(
    protected origin: Vector2D,
    protected size: number,
    protected speed: number,
    protected color: string,
    protected angle: number
  ) {
    this.position = { ...this.origin }
  }

  draw(ctx: CanvasRenderingContext2D, canvasSize: Size2D) {}

  move() {
    this.position.x = Math.sin(this.angle) * this.speed + this.position.x
    this.position.y = Math.cos(this.angle) * this.speed + this.position.y + this.renderCount * 0.3
    this.renderCount++
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
  public rotate: number = 0
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
        Math.cos(((18 + 72 * i - this.rotate) / 180) * Math.PI) * R + this.position.x,
        -Math.sin(((18 + 72 * i - this.rotate) / 180) * Math.PI) * R + this.position.y
      )
      ctx.lineTo(
        Math.cos(((54 + 72 * i - this.rotate) / 180) * Math.PI) * r + this.position.x,
        -Math.sin(((54 + 72 * i - this.rotate) / 180) * Math.PI) * r + this.position.y
      )
    }
    ctx.fill()
    this.rotate += 5
  }
}
