import { StyleSheet } from 'react-native'

export const dividerStyles = StyleSheet.create({
  horizontal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
  },
  contentWrapper: {
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  verticalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  verticalLine: {
    borderLeftWidth: 1,
    alignSelf: 'stretch',
  },
})
