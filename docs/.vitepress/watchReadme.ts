import { promises as fs } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const themes = ['sparkler', 'popper', 'ribbon', 'sakura', 'meteor']
const dir = dirname(fileURLToPath(import.meta.url))

async function copyReadme() {
  console.log('Copy...')
  await fs.mkdir(resolve(dir, '../themes/')).catch((_) => {})
  await fs.copyFile(resolve(dir, '../../README.md'), resolve(dir, '../themes/index.md'))
  await Promise.all(
    themes.map((theme) =>
      fs.copyFile(
        resolve(dir, `../../packages/theme-${theme}/README.md`),
        resolve(dir, `../themes/${theme}.md`)
      )
    )
  )
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
    dir: resolve(dir, '../../packages/'),
    debounce: 50,
  })
  await watcher.init()
  watcher.on('+', copyReadme)
  watcher.on('-', copyReadme)
}

const pathSplited = process.argv[1].split('/')
const programName = pathSplited[pathSplited.length - 1]
if (programName === 'vite-node.mjs') {
  copyReadme()
}
