# @moefy-canvas/theme-meteor <GitHubLink repo="moefyit/moefy-canvas" subpath="packages/theme-meteor"/>

<p align="center">
   <img alt="type" src="https://img.shields.io/static/v1?label=type&message=background&color=green&style=for-the-badge" />
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-meteor" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/@moefy-canvas/theme-meteor.svg?style=for-the-badge&logo=npm"></a>
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-meteor" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dt/@moefy-canvas/theme-meteor.svg?style=for-the-badge"></a>
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-meteor" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dm/@moefy-canvas/theme-meteor.svg?style=for-the-badge"></a>
   <a href="https://github.com/moefyit/moefy-canvas/blob/main/LICENSE" target="_blank"><img alt="GitHub license" src="https://img.shields.io/github/license/moefyit/moefy-canvas?style=for-the-badge"></a>
</p>

:stars: 晃动下鼠标～

## Install

```bash
pnpm add @moefy-canvas/theme-meteor
```

## Usage

```html
<canvas id="moefy-canvas"></canvas>
```

```ts
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
   zIndex: -MAX_Z_INDEX,
}

const el = document.getElementById('moefy-canvas')
const meteor = new Meteor(themeConfig, canvasOptions)
meteor.mount(el as HTMLCanvasElement)
```

## ThemeConfig

```ts
export interface ColorTheme {
   light: string
   dark: string
}

export interface MeteorConfig extends ThemeConfig {
   numParticles?: number | null
   particleColor?: string | ColorTheme
}
```

<Meteor />
