# @moefy-canvas/theme-sakura <GitHubLink repo="moefyit/moefy-canvas" subpath="packages/theme-sakura" />

<p align="center">
   <img alt="type" src="https://img.shields.io/static/v1?label=type&message=background&color=green&style=for-the-badge" />
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-sakura" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/@moefy-canvas/theme-sakura.svg?style=for-the-badge&logo=npm"></a>
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-sakura" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dt/@moefy-canvas/theme-sakura.svg?style=for-the-badge"></a>
   <a href="https://www.npmjs.com/package/@moefy-canvas/theme-sakura" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dm/@moefy-canvas/theme-sakura.svg?style=for-the-badge"></a>
   <a href="https://github.com/moefyit/moefy-canvas/blob/main/LICENSE" target="_blank"><img alt="GitHub license" src="https://img.shields.io/github/license/moefyit/moefy-canvas?style=for-the-badge"></a>
</p>

:cherry_blossom: 稍等片刻～

## Install

```bash
pnpm add @moefy-canvas/theme-sakura
```

## Usage

```html
<canvas id="moefy-canvas"></canvas>
```

```ts
import {
   Sakura,
   type SakuraConfig,
   MAX_Z_INDEX,
   type CanvasOptions,
} from '@moefy-canvas/theme-sakura'

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
```

## ThemeConfig

```ts
export interface SakuraConfig extends ThemeConfig {
   numPatels?: number
}
```

<Sakura />
