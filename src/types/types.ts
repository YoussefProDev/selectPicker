import type { TextStyle, ViewStyle } from 'react-native';

// Tipo per i dati della valuta, basato sui valori del JSON delle bandiere
export type ItemType = {
  key: string;
  label: string;
  value: string | Record<string, string>;
  data?: Record<any, any>;
};

// Tipi per gli stili degli item
type TriggerStyle = {
  container?: ViewStyle;
  itemLabel?: TextStyle;
};

// Tipi per gli stili del modale
type ModalStyle = {
  itemStyle?: TextStyle;
  container?: ViewStyle;
  searchStyle?: ViewStyle;
  titleStyle?: TextStyle;
  listStyle?: ViewStyle;
};
// Props per il componente SelectTrigger
export type SelectTriggerProps = {
  open?: () => void;
  selectItem: ItemType | undefined;
  triggerStyle?: TriggerStyle;
  renderTrigger?: (item: ItemType | undefined) => React.ReactNode;
  disable?: boolean;
  darkMode?: boolean;
};

// Props per il componente SelectModal
export type SelectModalProps = {
  items: ItemType[];
  onSelectItem: (item: ItemType) => void;
  title?: string;
  searchPlaceholder?: string;
  textEmpty?: string;
  setVisible: (visible: boolean) => void;
  darkMode?: boolean;
  modalStyle?: ModalStyle;
  showCloseButton?: boolean;
  showModalTitle?: boolean;
  renderItem?: (item: ItemType | undefined) => React.ReactNode;
};

// Riferimento al componente CurrencyPicker per il controllo programmatico
export type SelectPickerRef = {
  open: () => void;
  close: () => void;
};

// Props per il componente CurrencyPicker
export type SelectPickerProps = {
  items: ItemType[];
  onSelectItem?: (item: ItemType) => void;

  darkMode?: boolean;
  renderTrigger?: (item: ItemType | undefined) => React.ReactNode;
  renderItem?: (item: ItemType | undefined) => React.ReactNode;

  disable?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  triggerStyle?: TriggerStyle;
  modalStyle?: ModalStyle;

  title?: string;
  searchPlaceholder?: string;
  textEmpty?: string;
  showCloseButton?: boolean;
  showModalTitle?: boolean;
};
