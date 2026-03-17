# Moefy Canvas

用可可爱爱的 canvas 动效装饰你的网页吧～

<HideInDoc>
前往文档 → <a href="https://moefy-canvas.nyakku.moe">https://moefy-canvas.nyakku.moe</a>
</HideInDoc>

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

- theme popper :tada:
- theme sparkler :sparkler:

### Background themes

- theme ribbon :reminder_ribbon:
- theme sakura :cherry_blossom:
- theme meteor :stars:

## TODO

- [x] theme sakara :cherry_blossom:, ref: <https://github.com/jhammann/sakura>
- [ ] 优化 sakura 的效果（目前效果只是简单能看，尚需仔细调优）
- [ ] 增加非全屏支持
- [ ] theme popper :tada:, 添加新形状 Confetti 🎊，ref: <https://github.com/catdad/canvas-confetti>
- [ ] 增加动态的 Ribbon，ref: <https://gist.github.com/imaegoo/074b5842d9cd8d80ecfa0d3fa4ecd556>
- [x] 使用 [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [ ] 尝试使用 Web Workder 进行离屏渲染
- [ ] 尝试 wasm
