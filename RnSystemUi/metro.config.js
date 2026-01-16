const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '..')

const config = getDefaultConfig(projectRoot)

config.watchFolders = [
  path.resolve(workspaceRoot, 'src'),
  path.resolve(workspaceRoot, 'docs'),
]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  // 兼容 npm 安装下 react-native 将部分依赖安装在自身 node_modules 内的情况
  path.resolve(projectRoot, 'node_modules/react-native/node_modules'),
]

const escapeRegExp = (value) => value.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
const toPathRegexFragment = (absolutePath) =>
  escapeRegExp(absolutePath).replaceAll('/', '[/\\\\]')

config.resolver.blockList = new RegExp(
  `^(${[
    path.resolve(workspaceRoot, 'node_modules/react'),
    path.resolve(workspaceRoot, 'node_modules/react-dom'),
    path.resolve(workspaceRoot, 'node_modules/react-native'),
    path.resolve(workspaceRoot, 'node_modules/react-native-svg'),
  ]
    .map(toPathRegexFragment)
    .join('|')})(?:[/\\\\].*)?$`
)

config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  'react-native-system-ui': path.resolve(workspaceRoot, 'src'),
  'react': path.resolve(projectRoot, 'node_modules/react'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-svg': path.resolve(projectRoot, 'node_modules/react-native-svg'),
}

module.exports = config
