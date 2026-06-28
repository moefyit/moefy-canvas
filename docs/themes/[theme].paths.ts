import fs from 'fs'
import { resolve } from 'path'

const themes = ['sparkler', 'popper', 'ribbon', 'sakura', 'meteor']
const dir = resolve(process.cwd(), 'docs/themes')

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
