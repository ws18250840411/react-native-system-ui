// 仅用于 Web 文档站点构建的 shim：
// - 避免 Vite 在 Web 端打包时引入 react-native-svg 及其原生相关实现（例如 codegenNativeComponent）
// - 让依赖 react-native-svg 的库（如 react-native-system-icon）在 Web 端“可解析但不执行”
//
// 注意：这不是给业务使用的 polyfill，只是文档/构建层面的兜底。
const Empty = () => null

export const Svg = Empty
export const Path = Empty
export const Circle = Empty
export const G = Empty
export const Use = Empty
export const Rect = Empty
export const Defs = Empty
export const LinearGradient = Empty
export const RadialGradient = Empty
export const Stop = Empty
export const Mask = Empty
export const ClipPath = Empty
export const Ellipse = Empty
export const Polygon = Empty
export const Polyline = Empty
export const Line = Empty
export const Text = Empty
export const TSpan = Empty
export const TextPath = Empty
export const Pattern = Empty
export const Symbol = Empty
export const Marker = Empty
export const Image = Empty
export const ForeignObject = Empty
export const Filter = Empty
export const FeOffset = Empty
export const FeFlood = Empty
export const FeComposite = Empty
export const FeMerge = Empty
export const FeMergeNode = Empty
export const FeGaussianBlur = Empty
export const FeBlend = Empty
export const FeColorMatrix = Empty
export const SvgUri = Empty
export const SvgXml = Empty

export default Svg

