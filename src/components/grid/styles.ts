import { StyleSheet } from 'react-native'

export const gridStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  contentBase: {
    flex: 1,
    justifyContent: 'center',
  },
  vertical: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  reverseColumn: {
    flexDirection: 'column-reverse',
  },
  reverseRow: {
    flexDirection: 'row-reverse',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 8,
  },
})
