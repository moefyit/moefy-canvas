export function showBadge(
  appName: string,
  {
    leftColor = '#fff',
    rightColor = '#444',
    leftBgColor = '#35495e',
    rightBgColor = '#00ffc0',
  }: { leftColor?: string; rightColor?: string; leftBgColor?: string; rightBgColor?: string } = {}
) {
  console.log(
    `%c ${appName} %c v${__MOEFY_CANVAS_VERSION__} ${__GIT_HASH__} %c`,
    `background: ${leftBgColor}; padding: 2px; color: ${leftColor}; font-weight: bold; text-transform: uppercase;`,
    `background: ${rightBgColor}; padding: 2px; color: ${rightColor}; font-weight: bold; text-transform: uppercase;`,
    'background: transparent'
  )
}
