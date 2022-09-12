import {
  Meteor,
  type MeteorConfig,
  type CanvasOptions,
  MAX_Z_INDEX,
} from '@moefy-canvas/theme-meteor'

const themeConfig: MeteorConfig = {
  numParticles: null,
  particleColor: 'rgba(102,175,239,.2)',
}

const canvasOptions: CanvasOptions = {
  opacity: 1,
  zIndex: MAX_Z_INDEX,
}

const el = document.getElementById('moefy-canvas')
const sparkler = new Meteor(themeConfig, canvasOptions)
sparkler.mount(el as HTMLCanvasElement)
// @ts-ignore
window.sp = sparkler
