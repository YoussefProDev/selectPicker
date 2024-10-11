import type { UseDynamicAnimationState } from 'moti';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

// Tipo per i dati degli item, con un supporto flessibile per chiavi e valori
export interface ItemType {
  key: string;
  label: string;
  value: string | Record<string, string>;
  data?: Record<any, any>; // Oggetto opzionale per dati aggiuntivi
}

export interface SectionType {
  sectionName: {
    key: string;
    label: string;
    value: string | Record<string, string>;
    data?: Record<any, any>; // Oggetto opzionale per dati aggiuntivi
  };
}
export type Items = ItemType[] | SectionType[];
// Tipi per lo stile del trigger di selezione
type TriggerStyle = {
  container?: StyleProp<ViewStyle>; // Stile per il contenitore del trigger
  itemLabel?: StyleProp<TextStyle>; // Stile per il testo dell'etichetta dell'item
};

// Tipi per lo stile del modale
type ModalStyle = {
  itemStyle?: StyleProp<TextStyle>; // Stile per ogni elemento nel modale
  container?: StyleProp<ViewStyle>; // Stile per il contenitore del modale
  searchStyle?: StyleProp<ViewStyle>; // Stile per il campo di ricerca
  titleStyle?: StyleProp<TextStyle>; // Stile per il titolo del modale
  listStyle?: StyleProp<ViewStyle>; // Stile per la lista all'interno del modale
};

// Props per il componente SelectTrigger
export type SelectTriggerProps = {
  open: () => void; // Metodo per aprire il modale
  selectItem: ItemType | undefined; // Item attualmente selezionato
  triggerStyle?: TriggerStyle; // Stili personalizzati per il trigger
  renderTrigger?: (item: ItemType | undefined) => React.ReactNode; // Funzione opzionale per renderizzare il trigger
  disable?: boolean; // Disabilita l'interazione col trigger
  darkMode?: boolean; // Attiva la modalità scura
};

// Props per il componente SelectModal
export type SelectModalProps = {
  pageStyle: 'FullPage' | 'Modal';
  items: Items; // Lista degli item da mostrare
  selectItem: ItemType | undefined; // Item attualmente selezionato
  onSelectItem: (item: ItemType) => void; // Callback per selezionare un item
  title?: string; // Titolo del modale
  searchPlaceholder?: string; // Placeholder per il campo di ricerca
  textEmpty?: string; // Testo da mostrare quando la lista è vuota
  close: () => void; // Metodo per chiudere il modale
  darkMode?: boolean; // Modalità scura
  modalStyle?: ModalStyle; // Stili personalizzati per il modale
  showCloseButton?: boolean; // Mostra il pulsante di chiusura
  showModalTitle?: boolean; // Mostra il titolo del modale
  renderItem?: (item: ItemType | undefined) => React.ReactNode; // Funzione per renderizzare un item
  modalAnimation: UseDynamicAnimationState<StyleProp<ViewStyle>>; // Stato dell'animazione dinamica del modale
};

// Riferimento al componente SelectPicker per controlli programmatici
export type SelectPickerRef = {
  open: () => void; // Metodo per aprire il picker
  close: () => void; // Metodo per chiudere il picker
};

// Props per il componente SelectPicker
export type SelectPickerProps = {
  pageStyle?: 'FullPage' | 'Modal';
  items: ItemType[]; // Lista di item da selezionare
  onSelectItem?: (item: ItemType) => void; // Callback per l'item selezionato
  darkMode?: boolean; // Modalità scura
  renderTrigger?: (item: ItemType | undefined) => React.ReactNode; // Funzione opzionale per customizzare il trigger
  renderItem?: (item: ItemType | undefined) => React.ReactNode; // Funzione opzionale per customizzare gli item
  disable?: boolean; // Disabilita il componente
  onOpen?: () => void; // Callback per apertura del picker
  onClose?: () => void; // Callback per chiusura del picker
  triggerStyle?: TriggerStyle; // Stili per il trigger
  modalStyle?: ModalStyle; // Stili per il modale
  title?: string; // Titolo del modale
  searchPlaceholder?: string; // Placeholder per il campo di ricerca
  textEmpty?: string; // Testo da mostrare quando la lista è vuota
  showCloseButton?: boolean; // Mostra il pulsante di chiusura
  showModalTitle?: boolean; // Mostra il titolo del modale
};
