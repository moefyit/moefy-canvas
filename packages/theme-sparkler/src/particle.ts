import { Vector2D } from '@moefy-canvas/core'
import { Random } from '@moefy-canvas/utils'
import { opacify } from 'color2k'

function normalize(x: number, MIN: number, MAX: number) {
  return (x - MIN) / (MAX - MIN)
}

export class Particle {
  private direction: Vector2D
  private opacity: number = 1
  private position: Vector2D
  constructor(
    private startTime = 0,
    private startPosition = { x: 0, y: 0 },
    private duration = Random.randomInt(50, 500),
    private distance = Random.randomInt(40, 100),
    private angle = Random.randomFloat(0, Math.PI * 2),
    private size = Random.randomInt(1, 3),
    private color = Random.choice(['yellow', 'pink', 'red', 'orange', 'purple', 'cyan'])
  ) {
    this.direction = {
      x: Math.cos(this.angle) * this.distance,
      y: Math.sin(this.angle) * this.distance,
    }
    this.position = Object.assign({}, this.startPosition)

    // // TODO
    // const ptr = Random.randomFloat(0, Math.PI * 2)
    // this.color =
    //   '#' +
    //   (
    //     ((Math.cos(ptr) * 127 + 128) << 16) |
    //     ((Math.cos(ptr + (Math.PI * 2) / 3) * 127 + 128) << 8) |
    //     (Math.cos(ptr + (Math.PI * 4) / 3) * 127 + 128)
    //   )
    //     .toString(16)
    //     .padStart(6, '0')

    // this.canvasContext.fillStyle = `hsla(${Random.randomInt(0, 12) * 30}, 100%, 50%, ${
    //   this.opacity
    // })`

    // this.color = Random.choice(['yellow', 'pink', 'red', 'orange', 'purple', 'cyan'])
  }

  move(currentTime: number) {
    const step = normalize(currentTime, this.startTime, this.startTime + this.duration)
    this.position.x = this.startPosition.x + this.direction.x * step
    this.position.y = this.startPosition.y + this.direction.y * step
    this.opacity = 1 - step
  }

  draw(canvasContext: CanvasRenderingContext2D, currentTime: number) {
    canvasContext.fillStyle = opacify(this.color, this.opacity)

    canvasContext.beginPath()
    canvasContext.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2)
    canvasContext.fill()
  }

  shouldRemove(currentTime: number) {
    return currentTime > this.startTime + this.duration
  }
}
