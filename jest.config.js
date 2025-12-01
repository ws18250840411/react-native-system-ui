const path = require('path')

const styleMock = require.resolve('rndoc-cli/cjs/jest.style-mock.cjs')
const fileMock = require.resolve('rndoc-cli/cjs/jest.file-mock.cjs')
const codegenMock = path.resolve(__dirname, 'jest/mocks/codegenNativeComponent.js')

module.exports = {
  maxWorkers: 2,
  moduleNameMapper: {
    '\\.(css|less|scss|styl)$': styleMock,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': fileMock,
    '^react-native$': 'react-native-web',
    '^react-native/Libraries/Utilities/codegenNativeComponent$': codegenMock,
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-native-web|@react-native|@react-native-community|rndoc-cli))/',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '_site',
    'site',
    'react-native-xiaoshu-main',
    'react-vant',
    're-write-gluestack-ui-main',
    'react-native-aria-main',
  ],
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest/setupTests.js')],
}
