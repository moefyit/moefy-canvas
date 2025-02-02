import { Vector2D, Size2D } from '@moefy-canvas/core'
import { Random } from '@moefy-canvas/utils'
import { Particle, ParticleFactory } from './particle'
import { PopperShape } from './popper'

export class Boom {
  stopped: boolean = false
  #particles: Set<Particle> = new Set()
  constructor(shape: PopperShape, origin: Vector2D, size: number, numParticles: number) {
    for (let i = 0; i < numParticles; i++) {
      const particle = ParticleFactory.create(
        shape,
        origin,
        Random.randomFloat(1, 6),
        size,
        Random.color('89ABCDEF'),
        Random.randomFloat(Math.PI - 1, Math.PI + 1)
      )
      this.#particles.add(particle)
    }
  }

  move(canvasSize: Size2D) {
    for (const particle of this.#particles) {
      if (particle.shouleRemove(canvasSize)) {
        this.#particles.delete(particle)
        continue
      }
      particle.move()
    }
    if (this.#particles.size === 0) {
      this.stopped = true
    }
  }

  draw(ctx: OffscreenCanvasRenderingContext2D, canvasSize: Size2D) {
    for (const particle of this.#particles) {
      particle.draw(ctx, canvasSize)
    }
  }
}
