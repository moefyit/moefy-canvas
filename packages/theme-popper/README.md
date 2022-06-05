# @moefy-canvas/theme-popper <GitHubLink repo="moefyit/moefy-canvas" subpath="packages/theme-popper"/>

<p align="center">
   <img alt="type" src="https://img.shields.io/static/v1?label=type&message=cursor-effects&color=green&style=for-the-badge" />
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-popper" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/@moefy-canvas/theme-popper.svg?style=for-the-badge&logo=npm"></a>
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-popper" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dt/@moefy-canvas/theme-popper.svg?style=for-the-badge"></a>
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-popper" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dm/@moefy-canvas/theme-popper.svg?style=for-the-badge"></a>
   <a href="https://github.com/moefyit/moefy-canvas/blob/main/LICENSE" target="_blank"><img alt="GitHub license" src="https://img.shields.io/github/license/moefyit/moefy-canvas?style=for-the-badge"></a>
</p>

:tada: 点击鼠标试试～

## Install

```bash
pnpm add @moefy-canvas/theme-popper
```

## Usage

```html
<canvas id="moefy-canvas"></canvas>
```

```ts
import {
   Popper,
   PopperShape,
   type PopperConfig,
   MAX_Z_INDEX,
   type CanvasOptions,
} from '@moefy-canvas/theme-popper'

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
```

## ThemeConfig

```ts
export enum PopperShape {
   Star = 'star',
   Circle = 'circle',
}

export interface PopperConfig extends ThemeConfig {
   shape?: PopperShape
   size?: number
   numParticles?: number
}
```

<Popper/>
