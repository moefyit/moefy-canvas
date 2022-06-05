# @moefy-canvas/theme-ribbon <GitHubLink repo="moefyit/moefy-canvas" subpath="packages/theme-ribbon" />

<p align="center">
   <img alt="type" src="https://img.shields.io/static/v1?label=type&message=background&color=green&style=for-the-badge" />
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-ribbon" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/@moefy-canvas/theme-ribbon.svg?style=for-the-badge&logo=npm"></a>
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-ribbon" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dt/@moefy-canvas/theme-ribbon.svg?style=for-the-badge"></a>
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-ribbon" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dm/@moefy-canvas/theme-ribbon.svg?style=for-the-badge"></a>
   <a href="https://github.com/moefyit/moefy-canvas/blob/main/LICENSE" target="_blank"><img alt="GitHub license" src="https://img.shields.io/github/license/moefyit/moefy-canvas?style=for-the-badge"></a>
</p>

:reminder_ribbon: 背景的彩带效果～

## Install

```bash
pnpm add @moefy-canvas/theme-ribbon
```

## Usage

```html
<canvas id="moefy-canvas"></canvas>
```

```ts
import {
   Ribbon,
   type RibbonConfig,
   type CanvasOptions,
   MAX_Z_INDEX,
} from '@moefy-canvas/theme-ribbon'

const themeConfig: RibbonConfig = {
   size: 90,
}

const canvasOptions: CanvasOptions = {
   opacity: 1,
   zIndex: -MAX_Z_INDEX,
}

const el = document.getElementById('moefy-canvas')
const sparkler = new Ribbon(themeConfig, canvasOptions)
sparkler.mount(el as HTMLCanvasElement)
```

## ThemeConfig

```ts
export interface RibbonConfig extends ThemeConfig {
   size?: number
}
```

<Ribbon />
