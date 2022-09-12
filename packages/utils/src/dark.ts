export function getColorSchemeMediaList() {
  return window.matchMedia('(prefers-color-scheme: dark)')
}

export function isDarkMode(): boolean {
  return getColorSchemeMediaList().matches ? true : false
}
