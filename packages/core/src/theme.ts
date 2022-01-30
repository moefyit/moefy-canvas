import { CanvasOptions } from './draw'

export type ThemeConfig = Record<string, any>

export abstract class Theme<T extends ThemeConfig> {
  constructor(themeConfig: T, canvasOptions: CanvasOptions) {}
  abstract mount(el: HTMLCanvasElement): void
  abstract unmount(): void
}
