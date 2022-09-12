import {
  Meteor,
  type MeteorConfig,
  type CanvasOptions,
  MAX_Z_INDEX,
} from '@moefy-canvas/theme-meteor'

const themeConfig: MeteorConfig = {
  numParticles: null,
  particleColor: {
    light: 'rgba(102, 175, 239, .2)',
    dark: 'rgba(245, 236, 66, .2)',
  },
}

const canvasOptions: CanvasOptions = {
  opacity: 1,
  zIndex: MAX_Z_INDEX,
}

const el = document.getElementById('moefy-canvas')
const metor = new Meteor(themeConfig, canvasOptions)
metor.mount(el as HTMLCanvasElement)
// @ts-ignore
window.sp = metor
