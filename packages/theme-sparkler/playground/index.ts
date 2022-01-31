import {
  Sparkler,
  SparklerMode,
  SparklerConfig,
  CanvasOptions,
  MAX_Z_INDEX,
} from '@moefy-canvas/theme-sparkler'

const themeConfig: SparklerConfig = {
  mode: SparklerMode.TRAIL,
}

const canvasOptions: CanvasOptions = {
  opacity: 1,
  zIndex: MAX_Z_INDEX,
}

const el = document.getElementById('moefy-canvas')
const sparkler = new Sparkler(themeConfig, canvasOptions)
sparkler.mount(el as HTMLCanvasElement)
// @ts-ignore
window.sp = sparkler
