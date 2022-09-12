import { Vector3D, Size2D } from '@moefy-canvas/core'

export interface GlobalSpeed {
  x: number
  y: number
  tx: number
  ty: number
  z: number
}

export class Particle implements Vector3D {
  #globalSpeed: GlobalSpeed | null = null
  #color: string | null = null
  #screenMargin: number = 50
  constructor(public x = 0, public y = 0, public z = 0) {}

  bindGlobalSpeed(globalSpeed: GlobalSpeed) {
    this.#globalSpeed = globalSpeed
    return this
  }

  bindColor(color: string) {
    this.#color = color
    return this
  }

  reset(canvasSize: Size2D, zOnly: boolean = false) {
    if (!zOnly) {
      this.x = Math.random() * canvasSize.width
      this.y = Math.random() * canvasSize.height
    }
    this.z = 0.2 + Math.random() * 0.8
  }

  move(canvasSize: Size2D) {
    let direction, globalSpeedTX, globalSpeedTY
    this.x += this.#globalSpeed!.x * this.z
    this.y += this.#globalSpeed!.y * this.z
    this.x += (this.x - canvasSize.width / 2) * this.#globalSpeed!.z * this.z
    this.y += (this.y - canvasSize.height / 2) * this.#globalSpeed!.z * this.z
    this.z += this.#globalSpeed!.z
    if (
      this.x < -this.#screenMargin ||
      this.x > canvasSize.width + this.#screenMargin ||
      this.y < -this.#screenMargin ||
      this.y > canvasSize.height + this.#screenMargin
    ) {
      direction = 'z'
      globalSpeedTX = Math.abs(this.#globalSpeed!.tx)
      globalSpeedTY = Math.abs(this.#globalSpeed!.ty)
      if (globalSpeedTX > 1 && globalSpeedTY > 1) {
        direction =
          (globalSpeedTX > globalSpeedTY
            ? Math.random() < Math.abs(this.#globalSpeed!.x) / (globalSpeedTX + globalSpeedTY)
              ? 'h'
              : 'v'
            : Math.random() < Math.abs(this.#globalSpeed!.y) / (globalSpeedTX + globalSpeedTY)
            ? 'v'
            : 'h') == 'h'
            ? this.#globalSpeed!.x > 0
              ? 'l'
              : 'r'
            : this.#globalSpeed!.y > 0
            ? 't'
            : 'b'
      }
      this.reset(canvasSize, true)
      switch (direction) {
        case 'z':
          this.z = 0.1
          this.x = Math.random() * canvasSize.width
          this.y = Math.random() * canvasSize.height
          break
        case 'l':
          this.x = -3
          this.y = Math.random() * canvasSize.height
          break
        case 'r':
          this.x = canvasSize.width + 3
          this.y = Math.random() * canvasSize.height
          break
        case 't':
          this.x = Math.random() * canvasSize.width
          this.y = -3
          break
        case 'b':
          this.x = Math.random() * canvasSize.width
          this.y = canvasSize.height + 3
      }
    }
  }

  draw(canvasContext: CanvasRenderingContext2D, currentTime: number) {
    canvasContext.lineCap = 'round'
    canvasContext.lineWidth = 3 * this.z
    canvasContext.strokeStyle = this.#color!
    canvasContext.beginPath()
    canvasContext.moveTo(this.x, this.y)
    let dx = 2 * this.#globalSpeed!.x
    let dy = 2 * this.#globalSpeed!.y
    Math.abs(dx) < 0.1 && (dx = 0.5)
    Math.abs(dy) < 0.1 && (dy = 0.5)
    canvasContext.lineTo(this.x + dx, this.y + dy)
    canvasContext.stroke()
  }
}
