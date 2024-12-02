import type { UseDynamicAnimationState } from 'moti';
import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

// Tipo per i dati degli item, con un supporto flessibile per chiavi e valori
export interface ItemType {
  key: string; // Chiave univoca dell'item
  label: string; // Etichetta dell'item visibile
  value: string | Record<string, string>; // Valore dell'item, può essere una stringa o un oggetto con chiavi/valori
  data?: Record<string, unknown>; // Dati opzionali associati all'item
}

// Tipo per la sezione del picker, che contiene un nome e una lista di item
export interface SectionType {
  sectionName: string; // Nome della sezione
  items: ItemType[]; // Lista di item nella sezione
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
export type SelectTriggerProps = {
  open: () => void;
  selectItem: ItemType | null;
  triggerStyle?: TriggerStyle; // Usa TriggerStyle che ora include StyleProp
  renderTrigger?: (selectItem: ItemType | null) => ReactNode;
  disable?: boolean;
  darkMode?: boolean;
};

// Props per il componente SelectModal
export type SelectModalProps = {
  pageStyle: 'FullPage' | 'Modal'; // Tipo di visualizzazione (pagina intera o modale)
  items: ItemType[]; // Lista degli item da mostrare
  selectItem: ItemType | null; // Item attualmente selezionato
  onSelectItem: (item: ItemType) => void; // Callback per selezionare un item
  title?: string; // Titolo del modale
  searchPlaceholder?: string; // Placeholder per il campo di ricerca
  textEmpty?: string; // Testo da mostrare quando la lista è vuota
  close: () => void; // Funzione per chiudere il modale
  darkMode?: boolean; // Modalità scura
  modalStyle?: ModalStyle; // Stili personalizzati per il modale
  showCloseButton?: boolean; // Mostra il pulsante di chiusura
  showModalTitle?: boolean; // Mostra il titolo del modale
  renderItem?: (item: ItemType | null) => ReactNode; // Funzione per renderizzare un item
  modalAnimation: UseDynamicAnimationState<StyleProp<ViewStyle>>; // Stato dell'animazione dinamica del modale
};

// Props per il componente SelectModalSection
export type SelectModalSectionProps = {
  pageStyle: 'FullPage' | 'Modal'; // Tipo di visualizzazione (pagina intera o modale)
  sections: SectionType[]; // Lista delle sezioni da mostrare
  selectItem: ItemType; // Item attualmente selezionato
  onSelectItem: (item: ItemType) => void; // Callback per selezionare un item
  title?: string; // Titolo del modale
  searchPlaceholder?: string; // Placeholder per il campo di ricerca
  textEmpty?: string; // Testo da mostrare quando la lista è vuota
  close: () => void; // Funzione per chiudere il modale
  darkMode?: boolean; // Modalità scura
  modalStyle?: ModalStyle; // Stili personalizzati per il modale
  showCloseButton?: boolean; // Mostra il pulsante di chiusura
  showModalTitle?: boolean; // Mostra il titolo del modale
  renderItem?: (item: ItemType | null) => ReactNode; // Funzione per renderizzare un item
  renderSectionItem?: (section: SectionType | null) => ReactNode; // Funzione per renderizzare una sezione
  modalAnimation: UseDynamicAnimationState<StyleProp<ViewStyle>>; // Stato dell'animazione dinamica del modale
  selectedSection?: SectionType;
};

// Riferimento al componente PickerList per controlli programmatici
export type PickerListRef = {
  open: () => void; // Metodo per aprire il picker
  close: () => void; // Metodo per chiudere il picker
};

export type RenderItem = (item: ItemType | null) => ReactNode;
// Props per il componente PickerList
export type PickerListProps = {
  pageStyle?: 'FullPage' | 'Modal'; // Tipo di visualizzazione (pagina intera o modale)
  items: ItemType[]; // Lista degli item da selezionare
  onSelectItem?: (item: ItemType) => void; // Callback per l'item selezionato
  darkMode?: boolean; // Modalità scura
  renderTrigger?: RenderItem; // Funzione opzionale per customizzare il trigger
  renderItem?: RenderItem; // Funzione opzionale per customizzare gli item
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
  selectedItem?: ItemType;
};

// Props per il componente PickerSectionList
export type PickerSectionListProps = {
  pageStyle?: 'FullPage' | 'Modal'; // Tipo di visualizzazione (pagina intera o modale)
  sections: SectionType[]; // Liste delle sezioni da selezionare
  onSelectItem?: (item: ItemType) => void; // Callback per l'item selezionato
  darkMode?: boolean; // Modalità scura
  renderTrigger?: RenderItem; // Funzione opzionale per customizzare il trigger
  renderItem?: RenderItem; // Funzione opzionale per customizzare gli item
  renderSection?: RenderItem; // Funzione opzionale per customizzare gli item
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
  selectedItem: ItemType;
  selectedSection?: SectionType;
};
