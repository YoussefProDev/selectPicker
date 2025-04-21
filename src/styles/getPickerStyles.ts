import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Colors } from './colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const getPickerStyles = (darkMode: boolean = false) => {
  // Corretto
  const ColorsSet = darkMode ? Colors.DarkModeColors : Colors.LightModeColors;
  const windowHeight = Dimensions.get('window').height;
  const marginTopByPlatform = Platform.OS === 'ios' ? 50 : getStatusBarHeight();

  return StyleSheet.create({
    container: {
      paddingTop: marginTopByPlatform,
      flex: 1,
      backgroundColor: ColorsSet.background, // Sfondo principale
      paddingHorizontal: 15,
      padding: 20, // Spazio interno
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
      marginBottom: 70,
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
    modalContainer: {
      flex: 1, // Rende il contenitore principale grande quanto l'intera finestra
      flexDirection: 'column', // Imposta la direzione degli oggetti in colonna
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(52, 52, 52, 0.0)',
    },
    modalView: {
      // Sfondo semitrasparente (puoi modificarlo per chiaro/scuro)
      paddingTop: marginTopByPlatform,

      paddingBottom: 0,
      marginBottom: 0,
      margin: 10, // Spazio esterno
      height: windowHeight * 0.9, // Altezza del modale (può essere una percentuale della finestra)
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
      borderBottomWidth: 0,
      borderWidth: 2,
      borderColor: ColorsSet.textSecondary, // Colore del bordo
    },
  });
};
