import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from './colors';
const { width, height } = Dimensions.get('window');

export const Styles = StyleSheet.create({
  window: {
    width,
    height,
  },
  container: {
    flex: 1,
  },
  justifyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  justifyCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontDefault: {
    fontSize: 16,
    color: Colors.black,
  },
  modalView: {
    flex: 1,
    marginTop: height * 0.08,
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
  },
  lastItem: { marginBottom: 80 },
});
