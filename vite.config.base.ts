import type { UserConfig } from 'vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'

const dir = dirname(fileURLToPath(import.meta.url))

const config: UserConfig = {
  define: {
    __MOEFY_CANVAS_VERSION__: JSON.stringify(getAppVersion()),
    __GIT_HASH__: JSON.stringify(getGitHash()),
  },
  resolve: {
    alias: {
      '@moefy-canvas/core': resolve(dir, './packages/core/src/index.ts'),
      '@moefy-canvas/utils': resolve(dir, './packages/utils/src/index.ts'),
      '@moefy-canvas/theme-sparkler': resolve(dir, './packages/theme-sparkler/src/index.ts'),
      '@moefy-canvas/theme-sakura': resolve(dir, './packages/theme-sakura/src/index.ts'),
      '@moefy-canvas/theme-popper': resolve(dir, './packages/theme-popper/src/index.ts'),
      '@moefy-canvas/theme-ribbon': resolve(dir, './packages/theme-ribbon/src/index.ts'),
      '@moefy-canvas/theme-meteor': resolve(dir, './packages/theme-meteor/src/index.ts'),
    },
  },
}

function getGitHash() {
  return execSync('git rev-parse --short HEAD').toString().trim()
}

function getAppVersion() {
  return JSON.parse(readFileSync(resolve(dir, './package.json')).toString())['version']
}

export default config
