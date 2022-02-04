# Moefy Canvas

用可可爱爱的 canvas 动效装饰你的网页吧～

前往文档 -> <https://moefyit.github.io/moefy-canvas/>

## Install

这里以 Sparkler 为例

```bash
pnpm add @moefy-canvas/theme-sparkler
```

## Usage

```html
<canvas id="moefy-canvas"></canvas>
```

零配置就可以快速创建一个动效～

```ts
import { Sparkler } from '@moefy-canvas/theme-sparkler'

const el = document.getElementById('moefy-canvas')
const sparkler = new Sparkler()
sparkler.mount(el as HTMLCanvasElement)
```

如果需要对其进行配置，只需要这样就可以啦～

```ts
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
```

所有主题都有着统一的接口，使用方法一致～

```ts
export interface CanvasOptions {
   opacity?: number // default: 1
   zIndex?: number // default: 0
}

export type ThemeConfig = Record<string, any>

export abstract class Theme<T extends ThemeConfig> {
   constructor(themeConfig?: T, canvasOptions?: CanvasOptions) {}
   abstract mount(el: HTMLCanvasElement): void
   abstract unmount(): void
}
```

## Themes

### Mouse cursor effects themes

-  theme popper :tada:
-  theme sparkler :sparkler:

### Background themes

-  theme ribbon :reminder_ribbon:
-  theme sakura :cherry_blossom:

## TODO

-  [x] theme sakara :cherry_blossom:, ref: <https://github.com/jhammann/sakura>
-  [ ] theme popper :tada:, 添加新形状 Confetti🎊，ref: <https://github.com/catdad/canvas-confetti>
-  [ ] port to deno 🦕, ref: <https://github.com/denoland/dnt>
-  [ ] 利用 Web Worker
-  [ ] 尝试 wasm
