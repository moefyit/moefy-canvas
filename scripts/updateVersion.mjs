import { readFileSync, writeFileSync } from 'fs'

const packages = ['core', 'theme-popper', 'theme-ribbon', 'theme-sakura', 'theme-sparkler', 'utils']

function getAppVersion() {
  return JSON.parse(readFileSync(new URL('../package.json', import.meta.url)).toString())['version']
}

function main() {
  const appVersion = getAppVersion()

  for (const pkg of packages) {
    const packageJsonPath = new URL(`../packages/${pkg}/package.json`, import.meta.url)
    const originPackageJson = readFileSync(packageJsonPath).toString()
    let newPackageJson = JSON.parse(originPackageJson)
    newPackageJson.version = appVersion
    newPackageJson = JSON.stringify(newPackageJson, null, 2) + '\n'
    writeFileSync(packageJsonPath, newPackageJson)
  }
}

main()
