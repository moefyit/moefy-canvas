import type { UserConfig } from 'vite'
import { resolve } from 'path'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'

const config: UserConfig = {
  define: {
    __MOEFY_CANVAS_VERSION__: JSON.stringify(getAppVersion()),
    __GIT_HASH__: JSON.stringify(getGitHash()),
  },
  resolve: {
    alias: {
      '@moefy-canvas/core': resolve(__dirname, './packages/core/src/index.ts'),
      '@moefy-canvas/utils': resolve(__dirname, './packages/utils/src/index.ts'),
      '@moefy-canvas/theme-sparkler': resolve(__dirname, './packages/theme-sparkler/src/index.ts'),
      '@moefy-canvas/theme-sakura': resolve(__dirname, './packages/theme-sakura/src/index.ts'),
      '@moefy-canvas/theme-popper': resolve(__dirname, './packages/theme-popper/src/index.ts'),
      '@moefy-canvas/theme-ribbon': resolve(__dirname, './packages/theme-ribbon/src/index.ts'),
    },
  },
}

function getGitHash() {
  return execSync('git rev-parse --short HEAD').toString().trim()
}

function getAppVersion() {
  return JSON.parse(readFileSync(resolve(__dirname, './package.json')).toString())['version']
}

export default config
