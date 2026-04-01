import React from 'react'
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native'

export interface IconProps {
  size?: number
  color?: string
  fill?: string
  style?: StyleProp<ViewStyle>
}

const resolveColor = (props: IconProps) => props.color ?? props.fill ?? '#333333'

const lineStyle = (size: number, color: string, lengthRatio = 0.45, thickness = 2): ViewStyle => ({
  position: 'absolute',
  width: Math.max(1, size * lengthRatio),
  height: Math.max(1.5, thickness),
  borderRadius: Math.max(1, thickness / 2),
  backgroundColor: color,
})

const IconBox: React.FC<React.PropsWithChildren<IconProps>> = ({ size = 16, style, children }) => (
  <View style={[S.box, { width: size, height: size }, style]}>
    {children}
  </View>
)

export const Arrow: React.FC<IconProps> = props => {
  const size = props.size ?? 16
  const color = resolveColor(props)
  return (
    <IconBox {...props} size={size}>
      <View style={[lineStyle(size, color, 0.42), { transform: [{ rotate: '45deg' }], top: size * 0.26, left: size * 0.3 }]} />
      <View style={[lineStyle(size, color, 0.42), { transform: [{ rotate: '-45deg' }], top: size * 0.52, left: size * 0.3 }]} />
    </IconBox>
  )
}

export const ArrowLeft: React.FC<IconProps> = props => {
  const size = props.size ?? 16
  const color = resolveColor(props)
  return (
    <IconBox {...props} size={size} style={[props.style, { transform: [{ scaleX: -1 }] }]}>
      <View style={[lineStyle(size, color, 0.42), { transform: [{ rotate: '45deg' }], top: size * 0.26, left: size * 0.3 }]} />
      <View style={[lineStyle(size, color, 0.42), { transform: [{ rotate: '-45deg' }], top: size * 0.52, left: size * 0.3 }]} />
    </IconBox>
  )
}

const CloseBase: React.FC<IconProps> = props => {
  const size = props.size ?? 16
  const color = resolveColor(props)
  const stroke = Math.max(1.75, size * 0.078)
  return (
    <IconBox {...props} size={size}>
      <View style={[lineStyle(size, color, 0.68, stroke), { transform: [{ rotate: '45deg' }], top: size * 0.44, left: size * 0.16 }]} />
      <View style={[lineStyle(size, color, 0.68, stroke), { transform: [{ rotate: '-45deg' }], top: size * 0.44, left: size * 0.16 }]} />
    </IconBox>
  )
}

export const Close = CloseBase
export const Cross = CloseBase
export const Clear = CloseBase
export const Fail = CloseBase

export const Checked: React.FC<IconProps> = props => {
  const size = props.size ?? 16
  const color = resolveColor(props)
  const t = Math.max(1.6, size * 0.086)
  const w = size * 0.32
  const h = size * 0.54
  return (
    <IconBox {...props} size={size}>
      <View
        style={{
          width: w,
          height: h,
          borderRightWidth: t,
          borderBottomWidth: t,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginTop: -size * 0.08,
        }}
      />
    </IconBox>
  )
}

export const Search: React.FC<IconProps> = props => {
  const size = props.size ?? 16
  const color = resolveColor(props)
  const stroke = Math.max(1.5, size * 0.1)
  return (
    <IconBox {...props} size={size}>
      <View style={{ position: 'absolute', width: size * 0.56, height: size * 0.56, borderWidth: stroke, borderColor: color, borderRadius: size }} />
      <View style={[lineStyle(size, color, 0.34, stroke), { transform: [{ rotate: '45deg' }], left: size * 0.48, top: size * 0.64 }]} />
    </IconBox>
  )
}

export const QuestionO: React.FC<IconProps> = props => {
  const size = props.size ?? 16
  const color = resolveColor(props)
  const stroke = Math.max(1.5, size * 0.1)
  return (
    <IconBox {...props} size={size}>
      <View style={{ position: 'absolute', width: size, height: size, borderWidth: stroke, borderColor: color, borderRadius: size / 2 }} />
      <Text style={{ color, fontSize: size * 0.7, lineHeight: size, fontWeight: '700' }}>?</Text>
    </IconBox>
  )
}

export const Description: React.FC<IconProps> = props => {
  const size = props.size ?? 16
  const color = resolveColor(props)
  const stroke = Math.max(1.5, size * 0.09)
  return (
    <IconBox {...props} size={size}>
      <View style={{ position: 'absolute', width: size * 0.78, height: size * 0.94, borderWidth: stroke, borderColor: color, borderRadius: size * 0.08, left: size * 0.11, top: size * 0.03 }} />
      <View style={{ position: 'absolute', width: size * 0.22, height: size * 0.22, right: size * 0.12, top: size * 0.04, backgroundColor: '#ffffff', transform: [{ rotate: '45deg' }], borderTopWidth: stroke, borderLeftWidth: stroke, borderColor: color }} />
      <View style={[lineStyle(size, color, 0.34, stroke), { top: size * 0.42, left: size * 0.22 }]} />
      <View style={[lineStyle(size, color, 0.3, stroke), { top: size * 0.6, left: size * 0.22 }]} />
    </IconBox>
  )
}

const S = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
})
