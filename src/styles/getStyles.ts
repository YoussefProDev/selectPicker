import { Platform, StyleSheet } from 'react-native';
import { Styles } from './styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ColorDarkMode, ColorLightMode } from './colors';

export const getStyles = (darkTheme = false) => {
  const Colors = darkTheme ? ColorDarkMode : ColorLightMode;

  const marginBottomByPlatform = Platform.OS === 'ios' ? 5 : 0;

  return StyleSheet.create({
    container: {
      paddingTop: getStatusBarHeight(),
      backgroundColor: Colors.backgroundModal,
      height: Styles.window.height,
    },
    listContainer: {
      backgroundColor: Colors.backgroundModal,
    },
    title: {
      fontSize: 18,
      color: Colors.txtTitleModal,
      fontWeight: '700',
    },
    item: {
      flexDirection: 'row',
      paddingVertical: 15,
      alignItems: 'center',
      paddingHorizontal: 25,
    },
    itemLabel: {
      color: Colors.txtCountryName,
      fontWeight: '600',
      padding: 5,
      // textAlign: 'center',
      fontSize: 16,
      marginBottom: marginBottomByPlatform,
    },

    search: {
      ...Styles.justifyCenter,
      height: 40,
      paddingHorizontal: 20,
    },
    textInputContainer: {
      borderRadius: 7,
      backgroundColor: Colors.backgroundInput,
      flex: 1,
      justifyContent: 'center',
    },
    textSearch: {
      fontSize: 16,
      fontWeight: '500',
      color: Colors.txtTitleModal,
    },
    textInput: {
      padding: 10,
      flex: 1,
    },
    searchClose: {
      alignItems: 'flex-end',
      marginLeft: 10,
    },
    listNullContainer: {
      ...Styles.center,
      marginTop: 50,
    },
    header: {
      ...Styles.justifyContent,
      alignItems: 'center',
      marginBottom: 10,
      marginHorizontal: 20,
    },
    titleModal: {
      fontSize: 24,
      fontWeight: '600',

      color: Colors.txtTitleModal,
    },
    btnClose: {
      fontSize: 24,
    },
    txtEmpty: {
      color: Colors.txtCountryCode,
      fontSize: 16,
      fontWeight: '500',
    },
    selectedItem: {
      backgroundColor: Colors.selectColor,
      color: Colors.txtTitleModal,
      borderRadius: 5,
      width: '100%',
    },
  });
};
