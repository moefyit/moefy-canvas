import { Vector2D, Size2D } from '@moefy-canvas/core'
import { Random } from '@moefy-canvas/utils'
import { Particle, Star, Circle } from './particle'
import { PopperShape } from './popper'

export class Boom {
  public stopped: boolean = false
  private particles: Set<Particle> = new Set()
  constructor(
    private origin: Vector2D,
    private shape: PopperShape,
    private size: number,
    private numParticles: number
  ) {
    for (let i = 0; i < this.numParticles; i++) {
      const Shape = getShape(this.shape)
      const particle = new Shape(
        this.origin,
        this.size,
        Random.randomFloat(1, 6),
        Random.color('89ABCDEF'),
        Random.randomFloat(Math.PI - 1, Math.PI + 1)
      )
      this.particles.add(particle)
    }
  }

  move(canvasSize: Size2D) {
    for (const particle of this.particles) {
      if (particle.shouleRemove(canvasSize)) {
        this.particles.delete(particle)
        continue
      }
      particle.move()
    }
    if (this.particles.size === 0) {
      this.stopped = true
    }
  }

  draw(ctx: CanvasRenderingContext2D, canvasSize: Size2D) {
    for (const particle of this.particles) {
      particle.draw(ctx, canvasSize)
    }
  }
}

function getShape(shape: PopperShape): typeof Particle {
  const shapeMap = {
    star: Star,
    circle: Circle,
  }
  return shapeMap[shape]
}
