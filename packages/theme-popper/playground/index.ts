import { Popper } from '../src/'
import { PopperShape, PopperConfig } from '../src/'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { CanvasOptions } from '@moefy-canvas/core'

const themeConfig: PopperConfig = {
  mode: PopperShape.Star,
}

const canvasOptions: CanvasOptions = {
  opacity: 1,
  zIndex: MAX_Z_INDEX,
}

const el = document.getElementById('moefy-canvas')
const sparkler = new Popper(themeConfig, canvasOptions)
sparkler.mount(el as HTMLCanvasElement)
// @ts-ignore
window.sp = sparkler
