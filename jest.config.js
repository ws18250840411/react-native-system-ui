const path = require('path')

const styleMock = require.resolve('rndoc-cli/cjs/jest.style-mock.cjs')
const fileMock = require.resolve('rndoc-cli/cjs/jest.file-mock.cjs')
const codegenMock = path.resolve(__dirname, 'jest/mocks/codegenNativeComponent.js')
const safeAreaContextMock = path.resolve(__dirname, 'jest/mocks/react-native-safe-area-context.js')

module.exports = {
  maxWorkers: 1,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|styl)$': styleMock,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': fileMock,
    '^react-native$': 'react-native-web',
    '^react-native/Libraries/Utilities/codegenNativeComponent$': codegenMock,
    '^react-native-safe-area-context$': safeAreaContextMock,
  },
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
      ],
    }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-native-web|@react-native|@react-native-community|rndoc-cli))/',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '_site',
    'site',
    'ant-design-mobile-rn-master',
    'gluestack-ui-main',
    'react-native-xiaoshu-main',
    'react-native-paper',
    'react-vant',
    're-write-gluestack-ui-main',
    'react-native-aria-main',
  ],
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest/setupTests.js')],
}
