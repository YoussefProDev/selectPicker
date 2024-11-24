// styles.ts

import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from './colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';
export const getStyles = (darkMode: boolean = false) => {
  const ColorsSet = darkMode ? Colors.DarkModeColors : Colors.LightModeColors;
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  return StyleSheet.create({
    container: {
      paddingTop: getStatusBarHeight(),
      flex: 1,
      backgroundColor: ColorsSet.background, // Sfondo principale
      // paddingTop: 20,
      paddingBottom: 30,
      paddingHorizontal: 15,
    },

    // selectedItemText: {
    //   width: 100,
    //   fontSize: 16,
    //   fontWeight: 'bold',
    //   color: ColorsSet.textFieldColor, // Colore del testo basato sulla modalità
    // },
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
      color: ColorsSet.neutralBlack, // Colore del testo nella barra di ricerca
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
    selectedItemContainer: {
      padding: 10,
      backgroundColor: ColorsSet.background, // Cambia il colore di sfondo in base alla modalità
      borderRadius: 5,
      marginLeft: 10,

      width: width,
    },
    selectedSectionItem: {
      // backgroundColor: ColorsSet.background, // Cambia il colore di sfondo in base alla modalità
      padding: 10,
      borderRadius: 10,
      backgroundColor: ColorsSet.selectedItemBackground,
      // marginBottom: 10,
      // alignItems: 'center',
      // justifyContent: 'center',
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
      backgroundColor: ColorsSet.background, // Colore diverso per la modalità scura e chiara
      borderRadius: 10,
      // padding: 20,
      height: height * 0.7,
    },
    fontDefault: {
      color: ColorsSet.neutralBlack, // Colore del testo di default
    },
    justifyCenter: {
      justifyContent: 'center',
    },
  });
};
