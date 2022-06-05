import { Sakura } from '../src/'
import { type SakuraConfig } from '../src/'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { type CanvasOptions } from '@moefy-canvas/core'

const themeConfig: SakuraConfig = {
  numPatels: 30,
}

const canvasOptions: CanvasOptions = {
  opacity: 1,
  zIndex: -MAX_Z_INDEX,
}

const el = document.getElementById('moefy-canvas')
const sakura = new Sakura(themeConfig, canvasOptions)
sakura.mount(el as HTMLCanvasElement)
// @ts-ignore
window.sp = sakura
