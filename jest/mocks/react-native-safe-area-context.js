const React = require('react')
const { View } = require('react-native')

const defaultInsets = { top: 0, bottom: 0, left: 0, right: 0 }

exports.initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: defaultInsets,
}

exports.SafeAreaProvider = ({ children }) => React.createElement(React.Fragment, null, children)
exports.SafeAreaView = View
exports.useSafeAreaInsets = () => defaultInsets
exports.SafeAreaInsetsContext = React.createContext(defaultInsets)
