import { type CanvasOptions } from './draw'

export type ThemeConfig = Record<string, any>

export abstract class Theme<T extends ThemeConfig> {
  constructor(_themeConfig?: T, _canvasOptions?: CanvasOptions) {}
  abstract mount(el: HTMLCanvasElement): void
  abstract unmount(): void
}
