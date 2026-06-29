import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const themes = ['sparkler', 'popper', 'ribbon', 'sakura', 'meteor']
const dir = dirname(fileURLToPath(import.meta.url))

const pageWithPath = [
  ['index', '../../README.md'],
  ...themes.map((theme) => [theme, `../../packages/theme-${theme}/README.md`]),
]

export default {
  paths() {
    return pageWithPath.map(([theme, path]) => ({
      params: {
        theme,
      },
      content: fs.readFileSync(resolve(dir, path), {
        encoding: 'utf-8',
      }),
    }))
  },
}
