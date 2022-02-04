import { Vector2D } from '@moefy-canvas/core'
import { Random } from '@moefy-canvas/utils'
import { opacify } from 'color2k'

function normalize(x: number, MIN: number, MAX: number) {
  return (x - MIN) / (MAX - MIN)
}

export class Particle {
  #startTime: number
  #startPosition: Vector2D
  #duration: number
  #distance: number
  #angle: number
  #size: number
  #color: string
  #direction: Vector2D
  #opacity: number = 1
  #position: Vector2D
  constructor(
    startTime = 0,
    startPosition = { x: 0, y: 0 },
    duration = Random.randomInt(50, 500),
    distance = Random.randomInt(40, 100),
    angle = Random.randomFloat(0, Math.PI * 2),
    size = Random.randomInt(1, 3),
    color = Random.choice(['yellow', 'pink', 'red', 'orange', 'purple', 'cyan'])
  ) {
    this.#startTime = startTime
    this.#startPosition = startPosition
    this.#duration = duration
    this.#distance = distance
    this.#angle = angle
    this.#size = size
    this.#color = color
    this.#direction = {
      x: Math.cos(this.#angle) * this.#distance,
      y: Math.sin(this.#angle) * this.#distance,
    }
    this.#position = { ...this.#startPosition }
  }

  move(currentTime: number) {
    const step = normalize(currentTime, this.#startTime, this.#startTime + this.#duration)
    this.#position.x = this.#startPosition.x + this.#direction.x * step
    this.#position.y = this.#startPosition.y + this.#direction.y * step
    this.#opacity = 1 - step
  }

  draw(canvasContext: CanvasRenderingContext2D, currentTime: number) {
    canvasContext.fillStyle = opacify(this.#color, this.#opacity)

    canvasContext.beginPath()
    canvasContext.arc(this.#position.x, this.#position.y, this.#size, 0, Math.PI * 2)
    canvasContext.fill()
  }

  shouldRemove(currentTime: number) {
    return currentTime > this.#startTime + this.#duration
  }
}
