import { Theme, ThemeConfig, CanvasOptions } from '@moefy-canvas/core'
import { DrawBoard } from '@moefy-canvas/core'
import { EventsHandler, Random } from '@moefy-canvas/utils'
import { debounce } from 'ts-debounce'
import { Patel } from './patel'
import sakuraImgUrl from './assets/sakura.png'

export interface SakuraConfig extends ThemeConfig {
  numPatels?: number
}

export class Sakura implements Theme<SakuraConfig> {
  private numPatels: number
  private board: DrawBoard | null
  private patels: Set<Patel> = new Set()
  private paused: boolean = false
  private stopped: boolean = false
  private imgElement: HTMLImageElement | null = null
  private eventsHandler: EventsHandler = new EventsHandler()
  constructor({ numPatels = 30 }: SakuraConfig, private canvasOptions: CanvasOptions) {
    this.numPatels = numPatels
    this.board = null

    this.animate = this.animate.bind(this)
  }

  mount(el: HTMLCanvasElement) {
    this.imgElement = document.createElement('img')
    this.imgElement.src = sakuraImgUrl
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
    this.startAnimation()
  }

  unmount() {
    this.unlisten()
    this.stopped = true
    this.imgElement = null
  }

  private listen() {
    this.eventsHandler.add('visibilitychange', this.handleVisibilityChange.bind(this))
    this.eventsHandler.add('resize', debounce(this.handleResize.bind(this), 500))
    this.eventsHandler.startAll()
  }

  private unlisten() {
    this.eventsHandler.stopAll()
    this.eventsHandler.clear()
  }

  private handleResize(event: UIEvent) {
    this.board!.handleResize(event)
  }

  private handleVisibilityChange(event: any) {
    this.paused = document.hidden
  }

  private animate() {
    if (this.stopped) {
      this.board!.clear()
      return
    }

    requestAnimationFrame(this.animate)

    if (this.paused) {
      return
    }

    this.board!.draw((ctx, canvasSize) => {
      for (const patel of this.patels) {
        patel.move()
        patel.draw(ctx, canvasSize)
        if (
          patel.shouleRemove({
            ...this.board!.canvas.size,
          })
        ) {
          this.patels.delete(patel)
        }
      }
    })

    this.board!.render()

    while (this.patels.size < this.numPatels) {
      const { width, height } = this.board!.canvas.size
      this.patels.add(
        new Patel(
          { x: width * Random.range(0, 1), y: height * Random.range(-0.05, -1.4) },
          Random.randomInt(20, 30),
          Random.range(0.6, 0.9),
          Random.choice([Random.randomInt(40, 50), Random.randomInt(-50, -40)]),
          Random.range(0.9999, 1.0001),
          this.imgElement!
        )
      )
    }
  }

  private startAnimation() {
    requestAnimationFrame(this.animate)
  }
}
