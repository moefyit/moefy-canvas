import { Sparkler } from '../src/'
import { SparklerMode, SparklerConfig } from '../src/'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { CanvasOptions } from '@moefy-canvas/core'

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
