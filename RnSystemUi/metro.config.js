const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '..')

const config = getDefaultConfig(projectRoot)

config.watchFolders = [workspaceRoot]
config.resolver.disableHierarchicalLookup = true
config.resolver.unstable_enableSymlinks = true
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  // 兼容 npm 安装下 react-native 将部分依赖安装在自身 node_modules 内的情况
  path.resolve(projectRoot, 'node_modules/react-native/node_modules'),
]

config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  'react-native-system-ui': path.resolve(workspaceRoot, 'src'),
}

module.exports = config
