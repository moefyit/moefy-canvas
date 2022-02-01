import * as path from 'path'
import { promises as fs } from 'fs'

const themes = ['sparkler', 'popper', 'ribbon', 'sakura']

async function copyReadme() {
  console.log('Copy...')
  await fs.mkdir(path.resolve(__dirname, `../themes/`)).catch((_) => {})
  for (const theme of themes) {
    await fs.copyFile(
      path.resolve(__dirname, `../../packages/theme-${theme}/README.md`),
      path.resolve(__dirname, `../themes/${theme}.md`)
    )
  }
}

let hasWatched = false
export default async function start() {
  console.log('Start watch...')
  copyReadme()

  if (hasWatched || process.env.NODE_ENV === 'production') {
    return
  }

  const CheapWatch = (await import('cheap-watch')).default
  // @ts-ignore
  const watcher = new CheapWatch({
    dir: path.resolve(__dirname, '../../packages/'),
    debounce: 50,
  })
  await watcher.init()
  watcher.on('+', copyReadme)
  watcher.on('-', copyReadme)
}
