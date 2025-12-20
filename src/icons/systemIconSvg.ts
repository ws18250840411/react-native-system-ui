// 统一从 react-native-system-icon 的 IconBase 导出 SVG 图元：
// - Native 端由 react-native-system-icon 内部依赖 react-native-svg
// - Web 端由 react-native-system-icon 在运行时渲染原生 <svg>
//
// 组件库内部如果需要 SVG 图元，请从这里引入，避免直接依赖 react-native-svg。
export {
  Svg,
  Path,
  G,
  Circle,
  Use,
  Rect,
  Line,
  Polygon,
  Polyline,
  Ellipse,
  Text,
  TSpan,
  TextPath,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
  Marker,
  Symbol,
  Image,
  ForeignObject,
} from 'react-native-system-icon/es/IconBase'

export type {
  SvgProps,
  PathProps,
  GProps,
  CircleProps,
  UseProps,
  RectProps,
  LineProps,
  PolygonProps,
  PolylineProps,
  EllipseProps,
  TextProps,
  TSpanProps,
  TextPathProps,
  DefsProps,
  LinearGradientProps,
  RadialGradientProps,
  StopProps,
  ClipPathProps,
  PatternProps,
  MaskProps,
  MarkerProps,
  SymbolProps,
  ImageProps,
  ForeignObjectProps,
} from 'react-native-system-icon/es/IconBase'

