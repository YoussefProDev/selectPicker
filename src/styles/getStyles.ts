// styles.ts

import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Colors } from './colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';
export const getStyles = (darkMode: boolean = false) => {
  const ColorsSet = darkMode ? Colors.DarkModeColors : Colors.LightModeColors;
  const windowHeight = Dimensions.get('window').height;
  const marginTopByPlatform = Platform.OS === 'ios' ? 50 : getStatusBarHeight();
  // const width = Dimensions.get('window').width;
  return StyleSheet.create({
    container: {
      paddingTop: marginTopByPlatform,
      flex: 1,
      backgroundColor: ColorsSet.background, // Sfondo principale
      // paddingTop: 20,
      paddingBottom: 30,
      paddingHorizontal: 15,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    titleModal: {
      fontSize: 20,
      fontWeight: 'bold',
      color: ColorsSet.textPrimary, // Colore del titolo
    },
    searchClose: {
      padding: 5,
      borderRadius: 15,
      backgroundColor: ColorsSet.textSecondary, // Colore del pulsante di chiusura
    },
    btnClose: {
      fontSize: 18,

      // color: ColorsSet.textSecondary, // Colore del testo nel pulsante
    },
    search: {
      marginBottom: 10,
    },
    textInputContainer: {
      backgroundColor: ColorsSet.inputBackground, // Colore di sfondo input
      borderRadius: 10,
      padding: 5,
    },
    textSearch: {
      fontSize: 16,
      color: ColorsSet.textPrimary, // Colore del testo nella barra di ricerca
    },
    textInput: {
      padding: 10,
    },
    listContainer: {
      flex: 1,
    },
    section: {
      padding: 15,
    },
    item: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: ColorsSet.borderColor, // Colore per il bordo
    },
    itemLabel: {
      fontSize: 16,
      color: ColorsSet.textPrimary, // Colore del testo dell'elemento
    },
    lastItem: {
      marginBottom: 20,
    },
    selectedSectionContainer: {
      marginBottom: 10,
      height: 50,
    },
    selectedSectionItem: {
      borderRadius: 10,
      backgroundColor: ColorsSet.selectedItemBackground,
    },
    selectedItem: {
      backgroundColor: ColorsSet.selectedItemBackground, // Colore di selezione
    },
    listNullContainer: {
      padding: 10,
    },
    txtEmpty: {
      fontSize: 16,
      color: ColorsSet.neutralGray, // Colore del testo quando la lista è vuota
    },
    modalView: {
      backgroundColor: ColorsSet.backgroundModal, // Colore diverso per la modalità scura e chiara

      height: windowHeight * 0.9,
    },
    fullPageView: {
      backgroundColor: ColorsSet.backgroundModal, // Colore diverso per la modalità scura e chiara

      height: windowHeight,
    },
    fontDefault: {
      color: ColorsSet.neutralBlack, // Colore del testo di default
    },
    justifyCenter: {
      justifyContent: 'center',
    },
    modalBorders: {
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
  });
};
