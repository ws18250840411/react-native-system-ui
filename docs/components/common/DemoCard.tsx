import React from 'react'
import { StyleSheet, View } from 'react-native'

interface DemoCardProps {
  children: React.ReactNode
  style?: object
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#1f2933',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e9ed',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  gridItem: {
    marginHorizontal: 6,
    marginBottom: 12,
  },
})

export const DemoCard: React.FC<DemoCardProps> = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
)

interface DemoGridProps {
  children: React.ReactNode
}

export const DemoGrid: React.FC<DemoGridProps> = ({ children }) => (
  <View style={styles.grid}>
    {React.Children.map(children, (child, index) => (
      <View key={index} style={styles.gridItem}>
        {child}
      </View>
    ))}
  </View>
)
