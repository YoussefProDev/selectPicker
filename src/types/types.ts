import type { UseDynamicAnimationState } from 'moti';
import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

// Tipo per i dati degli item, con un supporto flessibile per chiavi e valori
export interface Item<T = string | number | object> {
  key: string; // Chiave univoca dell'item
  label: string; // Etichetta dell'item visibile
  value: T; // Valore dell'item, può essere una stringa, un numero o un oggetto con chiavi/valori
}

// Tipo per la sezione del picker, che contiene un nome e una lista di item
export interface Section<T = any> {
  name: string; // Nome della sezione
  items: Item<T>[]; // Lista di item nella sezione
}

// Tipo per lo stile del trigger di selezione
export type TriggerStyle = {
  container?: StyleProp<ViewStyle>; // Stile per il contenitore del trigger
  itemLabel?: StyleProp<TextStyle>; // Stile per il testo dell'etichetta dell'item
};

// Tipo per lo stile del modale
export type ModalStyle = {
  itemStyle?: StyleProp<TextStyle>; // Stile per ogni elemento nel modale
  container?: StyleProp<ViewStyle>; // Stile per il contenitore del modale
  searchStyle?: StyleProp<ViewStyle>; // Stile per il campo di ricerca
  titleStyle?: StyleProp<TextStyle>; // Stile per il titolo del modale
  listStyle?: StyleProp<ViewStyle>; // Stile per la lista all'interno del modale
};

// Props per il componente SelectTrigger
export interface SelectTriggerProps<T = any> {
  open: () => void; // Funzione per aprire il picker
  selectedItem: Item<T> | null; // Item attualmente selezionato
  triggerStyle?: TriggerStyle; // Stile personalizzato per il trigger
  renderTrigger?: (selectedItem: Item<T> | null) => ReactNode; // Funzione opzionale per renderizzare il trigger
  disable?: boolean; // Disabilita il trigger
  darkMode?: boolean; // Modalità scura
}

// Props per il componente PickerModal
export interface PickerModalProps<T = any> {
  pageStyle: 'FullPage' | 'Modal'; // Tipo di visualizzazione
  items: Item<T>[]; // Lista degli item da mostrare
  selectedItem: Item<T> | null; // Item attualmente selezionato
  onSelectItem: (item: Item<T>) => void; // Callback per selezionare un item
  title?: string; // Titolo del modale
  searchPlaceholder?: string; // Placeholder per il campo di ricerca
  textEmpty?: string; // Testo da mostrare quando la lista è vuota
  close: () => void; // Funzione per chiudere il modale
  darkMode?: boolean; // Modalità scura
  modalStyle?: ModalStyle; // Stile personalizzato per il modale
  showCloseButton?: boolean; // Mostra il pulsante di chiusura
  showModalTitle?: boolean; // Mostra il titolo del modale
  renderItem?: (item: Item<T> | null) => ReactNode; // Funzione opzionale per renderizzare un item
  modalAnimation: UseDynamicAnimationState<StyleProp<ViewStyle>>; // Stato dell'animazione dinamica del modale
}

// Props per il componente PickerModalSection
export interface PickerModalSectionProps<T = any> {
  pageStyle: 'FullPage' | 'Modal'; // Tipo di visualizzazione
  sections: Section<T>[]; // Lista delle sezioni da mostrare
  selectedItem: Item<T> | null; // Item attualmente selezionato
  onSelectItem: (item: Item<T>) => void; // Callback per selezionare un item
  title?: string; // Titolo del modale
  searchPlaceholder?: string; // Placeholder per il campo di ricerca
  textEmpty?: string; // Testo da mostrare quando la lista è vuota
  close: () => void; // Funzione per chiudere il modale
  darkMode?: boolean; // Modalità scura
  modalStyle?: ModalStyle; // Stile personalizzato per il modale
  showCloseButton?: boolean; // Mostra il pulsante di chiusura
  showModalTitle?: boolean; // Mostra il titolo del modale
  renderItem?: (item: Item<T> | null) => ReactNode; // Funzione opzionale per renderizzare un item
  renderSectionItem?: (section: Section<T> | null) => ReactNode; // Funzione opzionale per renderizzare una sezione
  modalAnimation: UseDynamicAnimationState<StyleProp<ViewStyle>>; // Stato dell'animazione dinamica del modale
  selectedSection?: Section<T>; // Sezione attualmente selezionata
}

// Riferimento al componente PickerList per controlli programmatici
export interface PickerRef {
  open: () => void; // Metodo per aprire il picker
  close: () => void; // Metodo per chiudere il picker
}

// Props per il componente PickerList
export interface PickerProps<T = any> {
  pageStyle?: 'FullPage' | 'Modal'; // Tipo di visualizzazione
  sections?: Section<T>[]; // Liste delle sezioni da selezionare
  items?: Item<T>[]; // Lista degli item da selezionare
  onSelectItem?: (item: Item<T>) => void; // Callback per l'item selezionato
  darkMode?: boolean; // Modalità scura
  renderTrigger?: (item: Item<T> | null) => ReactNode; // Funzione opzionale per customizzare il trigger
  renderItem?: (item: Item<T> | null) => ReactNode; // Funzione opzionale per customizzare gli item
  renderSection?: (section: Section<T> | null) => ReactNode;
  disable?: boolean; // Disabilita il componente
  onOpen?: () => void; // Callback per apertura del picker
  onClose?: () => void; // Callback per chiusura del picker
  triggerStyle?: TriggerStyle; // Stile personalizzato per il trigger
  modalStyle?: ModalStyle; // Stile personalizzato per il modale
  title?: string; // Titolo del modale
  searchPlaceholder?: string; // Placeholder per il campo di ricerca
  textEmpty?: string; // Testo da mostrare quando la lista è vuota
  showCloseButton?: boolean; // Mostra il pulsante di chiusura
  showModalTitle?: boolean; // Mostra il titolo del modale
  selectedItem: Item<T> | null; // Item selezionato
  ref?: React.Ref<PickerRef>; // Riferimento per i controlli programmatici
}
