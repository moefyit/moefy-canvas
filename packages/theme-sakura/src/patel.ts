import { Vector2D, Size2D } from '@moefy-canvas/core'

export class Patel {
  #position: Vector2D
  #size: number
  #speed: number
  #direction: number
  #scale: number
  #imgElement: HTMLImageElement
  #angle: number = 0
  #angleDirection: number = 1
  constructor(
    position: Vector2D,
    size: number,
    speed: number,
    direction: number,
    scale: number,
    imgElement: HTMLImageElement
  ) {
    this.#position = position
    this.#size = size
    this.#speed = speed
    this.#direction = direction
    this.#scale = scale
    this.#imgElement = imgElement
  }

  draw(ctx: CanvasRenderingContext2D, canvasSize: Size2D) {
    ctx.translate(this.#position.x, this.#position.y)
    ctx.rotate(this.#angle)
    ctx.drawImage(this.#imgElement, 0, 0, this.#size, this.#size)
    ctx.rotate(-this.#angle)
    ctx.translate(-this.#position.x, -this.#position.y)
  }

  move() {
    this.#position.x = Math.sin((this.#direction / 180) * Math.PI) * this.#speed + this.#position.x
    this.#position.y = Math.cos((this.#direction / 180) * Math.PI) * this.#speed + this.#position.y
    this.#size *= this.#scale
    this.#angle += 0.003 * this.#angleDirection
    if ((this.#angle / Math.PI) * 180 > 60) {
      this.#angleDirection = -1
    }
    if ((this.#angle / Math.PI) * 180 < -60) {
      this.#angleDirection = 1
    }
  }

  shouleRemove(canvasSize: Size2D) {
    return (
      this.#position.x + this.#size < 0 ||
      this.#position.x - this.#size > canvasSize.width ||
      this.#position.y - this.#size > canvasSize.height ||
      this.#size <= 3
    )
  }
}
