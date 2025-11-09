import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CellGroupContext } from './CellContext'
import type { CellGroupProps } from './types'

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: '#969799',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  body: {
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ebedf0',
  },
  inset: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ebedf0',
  },
})

export const CellGroup: React.FC<CellGroupProps> = ({
  children,
  title,
  border = true,
  inset = false,
  card = false,
  style,
  bodyStyle,
}) => {
  const containerStyle = [styles.container, style]
  const bodyStyles = [styles.body, inset && styles.inset, card && styles.inset, bodyStyle]

  return (
    <CellGroupContext.Provider value={{ border, inset: inset || card }}>
      <View style={containerStyle}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <View style={bodyStyles}>{children}</View>
      </View>
    </CellGroupContext.Provider>
  )
}
