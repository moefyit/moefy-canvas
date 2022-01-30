import { Vector2D, Size2D } from '@moefy-canvas/core'
import { Random } from '@moefy-canvas/utils'
import { Particle, Star, Circle } from './particle'
import { PopperShape } from './popper'

export class Boom {
  public stopped: boolean = false
  private particles: Array<Particle> = []
  constructor(
    private origin: Vector2D,
    private context: CanvasRenderingContext2D,
    private shape: PopperShape,
    private size: number,
    private numParticles: number,
    private canvasSize: Size2D
  ) {
    for (let i = 0; i < this.numParticles; i++) {
      const Shape = getShape(this.shape)
      const particle = new Shape(
        this.origin,
        this.size,
        Random.range(1, 6),
        Random.color('89ABCDEF'),
        Random.range(Math.PI - 1, Math.PI + 1),
        context
      )
      this.particles.push(particle)
    }
  }

  move() {
    this.particles.forEach((particle, index) => {
      if (
        particle.position.x < 0 ||
        particle.position.x > this.canvasSize.width ||
        particle.position.y > this.canvasSize.height
      ) {
        this.particles.splice(index, 1)
        return
      }
      particle.move()
    })
    if (this.particles.length == 0) {
      this.stopped = true
    }
  }

  draw() {
    this.particles.forEach((particle) => particle.draw())
  }
}

function getShape(shape: PopperShape): typeof Particle {
  const shapeMap = {
    star: Star,
    circle: Circle,
  }
  return shapeMap[shape]
}
