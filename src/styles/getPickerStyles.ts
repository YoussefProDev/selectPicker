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
      backgroundColor: 'rgba(52, 52, 52, 0.0)', // Sfondo semitrasparente (puoi modificarlo per chiaro/scuro)

      position: 'absolute',

      height: windowHeight, // Altezza del modale (può essere una percentuale della finestra)
      bottom: 0, // Posiziona il modale sul fondo
      left: 0,
      right: 0,
      top: 'auto', // Non influenzare la parte superiore
      // flex: 1,
      // Non c'è bisogno di flex: 1 se stai impostando direttamente l'altezza
      justifyContent: 'flex-end', // Posiziona il contenuto in fondo

      // elevation: 5, // Aggiunge l'ombra su Android
    },
    fullPageView: {
      backgroundColor: ColorsSet.backgroundModal, // Colore diverso per la modalità scura e chiara
      height: windowHeight,
      position: 'absolute',
      bottom: 0, // Posiziona il modale sul fondo
      left: 0,
      right: 0,
      top: 'auto', // Non influenzare la parte superiore
      // flex: 1,
      // Non c'è bisogno di flex: 1 se stai impostando direttamente l'altezza
      justifyContent: 'flex-end', // Posiziona il contenuto in fondo
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
      padding: 20, // Spazio interno
      marginBottom: 0,
      margin: 10, // Spazio esterno
    },
  });
};
