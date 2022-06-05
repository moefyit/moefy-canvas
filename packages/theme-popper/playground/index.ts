import { Popper } from '../src/'
import { PopperShape, type PopperConfig } from '../src/'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { type CanvasOptions } from '@moefy-canvas/core'

const themeConfig: PopperConfig = {
  shape: PopperShape.Star,
  size: 1.75,
  numParticles: 10,
}

const canvasOptions: CanvasOptions = {
  opacity: 1,
  zIndex: MAX_Z_INDEX,
}

const el = document.getElementById('moefy-canvas')
const popper = new Popper(themeConfig, canvasOptions)
popper.mount(el as HTMLCanvasElement)
// @ts-ignore
window.sp = popper
