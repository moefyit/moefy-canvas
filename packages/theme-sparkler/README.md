# @moefy-canvas/theme-sparkler <GitHubLink repo="moefyit/moefy-canvas" subpath="packages/theme-sparkler"/>

<p align="center">
   <img alt="type" src="https://img.shields.io/static/v1?label=type&message=cursor-effects&color=green&style=for-the-badge" />
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-sparkler" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/@moefy-canvas/theme-sparkler.svg?style=for-the-badge&logo=npm"></a>
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-sparkler" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dt/@moefy-canvas/theme-sparkler.svg?style=for-the-badge"></a>
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-sparkler" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dm/@moefy-canvas/theme-sparkler.svg?style=for-the-badge"></a>
   <a href="https://github.com/moefyit/moefy-canvas/blob/main/LICENSE" target="_blank"><img alt="GitHub license" src="https://img.shields.io/github/license/moefyit/moefy-canvas?style=for-the-badge"></a>
</p>

:sparkler: 就是现在鼠标周围的粒子效果啦～

## Install

```bash
pnpm add @moefy-canvas/theme-sparkler
```

## Usage

```html
<canvas id="moefy-canvas"></canvas>
```

```ts
import {
   Sparkler,
   SparklerMode,
   type SparklerConfig,
   type CanvasOptions,
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
```

## ThemeConfig

```ts
export enum SparklerMode {
   FOLLOW = 'follow',
   TRAIL = 'trail',
}

export interface SparklerConfig extends ThemeConfig {
   mode?: SparklerMode
   numParticles?: number
   sparkleFactor?: number
   particleDurationRange?: [number, number]
   particleDistanceRange?: [number, number]
   particleSizeRange?: [number, number]
}
```

<Sparkler />
