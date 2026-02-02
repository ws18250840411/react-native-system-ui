const path = require('path')
const Module = require('module')

const originalResolve = Module._resolveFilename
const codegenShim = path.resolve(__dirname, 'shims', 'codegenNativeComponent.tsx')

Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
  if (request === 'react-native') {
    return require.resolve('react-native-web')
  }
  if (request === 'react-native/Libraries/Utilities/codegenNativeComponent') {
    return codegenShim
  }
  return originalResolve.call(this, request, parent, isMain, options)
}
