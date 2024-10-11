# rn-select-picker

Un **Modal Select Picker** moderno e altamente performante per **React Native**, alimentato da **React Native Reanimated** e **React Native Gesture Handler** per offrire animazioni fluide e un'esperienza utente migliorata. Presenta una ricerca rapida con **Fuse.js** e una gestione efficiente delle liste con **FlashList**. Questo componente è completamente personalizzabile e adattabile a qualsiasi esigenza di design.

## Caratteristiche Principali

- ✨ **Animazioni Fluide**: Sfrutta **React Native Reanimated** per animazioni reattive e fluide.
- 🎯 **Interazioni Basate su Gesti**: Integrato con **React Native Gesture Handler** per interazioni modali intuitive e reattive.
- 🚀 **Alta Performance**: Costruito con **@shopify/flash-list** per un rendering efficiente di liste grandi.
- 🔍 **Ricerca Fuzzy**: Implementa **Fuse.js** per funzionalità di ricerca rapide e flessibili.
- 🎨 **Completamente Personalizzabile**: Facilmente adattabile a qualsiasi design UI con numerose opzioni di personalizzazione.
- 🌍 **Supporto per Grandi Set di Dati**: Ideale per applicazioni che richiedono la selezione da numerosi elementi.

## Installazione

Per prima cosa, installa il pacchetto:

```sh
npm install @youssefprodev/rn-select-picker
```

oppure

```sh
yarn add @youssefprodev/rn-select-picker
```

### Dipendenze Necessarie

È necessario installare le seguenti dipendenze peer:

```sh
npm install react-native-reanimated react-native-gesture-handler
```

oppure

```sh
yarn add react-native-reanimated react-native-gesture-handler
```

**Nota:** Assicurati di seguire le istruzioni di installazione per [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/) e [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/).

## Demo

Guarda una demo live di `rn-select-picker` in azione:

> _[Inserisci qui la tua GIF o video demo per un coinvolgimento visivo]_

---

## Esempio di Utilizzo

Ecco un esempio migliorato che dimostra come implementare `SelectPickerComponent`:

```jsx
import React, { useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SelectPickerComponent } from '@youssefprodev/rn-select-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const selectPickerRef = useRef(null);

  // Array di dati di esempio
  const items = [
    {
      key: 'USD',
      label: 'Dollaro Statunitense',
      value: 'USD',
      data: { symbol: '$' },
    },
    { key: 'EUR', label: 'Euro', value: 'EUR', data: { symbol: '€' } },
    // ...altri elementi
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <SelectPickerComponent
          ref={selectPickerRef}
          items={items}
          onSelectItem={(item) => console.log('Elemento selezionato:', item)}
          darkMode={true}
          // Altri props e personalizzazioni
        />
        <Button
          title="Apri Picker"
          onPress={() => selectPickerRef.current?.open()}
        />
        <Button
          title="Chiudi Picker"
          onPress={() => selectPickerRef.current?.close()}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
```

**Nota:** Avvolgi il tuo componente radice con `GestureHandlerRootView` da `react-native-gesture-handler`.

## Tipi

Ecco i tipi TypeScript per le props e le strutture dati del componente:

```ts
import type { UseDynamicAnimationState } from 'moti';
import type { TextStyle, ViewStyle } from 'react-native';

export type ItemType = {
  key: string;
  label: string;
  value: string | Record<string, string>;
  data?: Record<string, any>;
};

type TriggerStyle = {
  container?: ViewStyle;
  itemLabel?: TextStyle;
};

type ModalStyle = {
  itemStyle?: TextStyle;
  container?: ViewStyle;
  searchStyle?: ViewStyle;
  titleStyle?: TextStyle;
  listStyle?: ViewStyle;
};

export type SelectTriggerProps = {
  open: () => void;
  selectItem?: ItemType;
  triggerStyle?: TriggerStyle;
  renderTrigger?: (item?: ItemType) => React.ReactNode;
  disable?: boolean;
  darkMode?: boolean;
};

export type SelectModalProps = {
  items: ItemType[];
  selectItem?: ItemType;
  onSelectItem: (item: ItemType) => void;
  title?: string;
  searchPlaceholder?: string;
  textEmpty?: string;
  close: () => void;
  darkMode?: boolean;
  modalStyle?: ModalStyle;
  showCloseButton?: boolean;
  showModalTitle?: boolean;
  renderItem?: (item: ItemType) => React.ReactNode;
  modalAnimation: UseDynamicAnimationState<ViewStyle>;
};

export type SelectPickerRef = {
  open: () => void;
  close: () => void;
};

export type SelectPickerProps = {
  items: ItemType[];
  onSelectItem?: (item: ItemType) => void;
  darkMode?: boolean;
  renderTrigger?: (item?: ItemType) => React.ReactNode;
  renderItem?: (item: ItemType) => React.ReactNode;
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
```

## Props

### SelectPickerComponent

| Prop                | Tipo                                   | Default                     | Descrizione                                                         |
| ------------------- | -------------------------------------- | --------------------------- | ------------------------------------------------------------------- |
| `items`             | `ItemType[]`                           | `[]`                        | Array di elementi da visualizzare nel picker.                       |
| `onSelectItem`      | `(item: ItemType) => void`             | `null`                      | Callback quando un elemento viene selezionato.                      |
| `darkMode`          | `boolean`                              | `false`                     | Abilita lo stile in modalità scura.                                 |
| `renderTrigger`     | `(item?: ItemType) => React.ReactNode` | `null`                      | Funzione di rendering personalizzata per il trigger del picker.     |
| `renderItem`        | `(item: ItemType) => React.ReactNode`  | `null`                      | Funzione di rendering personalizzata per ogni elemento della lista. |
| `disable`           | `boolean`                              | `false`                     | Disabilita il trigger del picker se impostato su `true`.            |
| `onOpen`            | `() => void`                           | `null`                      | Callback quando il modal del picker si apre.                        |
| `onClose`           | `() => void`                           | `null`                      | Callback quando il modal del picker si chiude.                      |
| `triggerStyle`      | `TriggerStyle`                         | `{}`                        | Stili personalizzati per il componente trigger.                     |
| `modalStyle`        | `ModalStyle`                           | `{}`                        | Stili personalizzati per il modal e i suoi contenuti.               |
| `title`             | `string`                               | `''`                        | Testo del titolo visualizzato nell'header del modal.                |
| `searchPlaceholder` | `string`                               | `'Cerca'`                   | Placeholder per l'input di ricerca.                                 |
| `textEmpty`         | `string`                               | `'Nessun elemento trovato'` | Testo mostrato quando nessun elemento corrisponde alla ricerca.     |
| `showCloseButton`   | `boolean`                              | `true`                      | Mostra un pulsante di chiusura nell'header del modal.               |
| `showModalTitle`    | `boolean`                              | `true`                      | Mostra il titolo nell'header del modal.                             |

## Personalizzazione

Puoi personalizzare completamente il componente per adattarlo al design della tua app:

- **Trigger Component**: Usa `renderTrigger` per personalizzare l'aspetto del trigger del picker.
- **Rendering degli Elementi**: Usa `renderItem` per personalizzare il rendering di ogni elemento nella lista.
- **Stili**: Personalizza gli stili utilizzando le props `triggerStyle` e `modalStyle`.

## Dipendenze Richieste

Assicurati di installare e configurare le seguenti dipendenze:

- [`react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/)
- [`react-native-gesture-handler`](https://docs.swmansion.com/react-native-gesture-handler/docs/)

Queste librerie sono essenziali per le animazioni e la gestione dei gesti nel picker.

## Contribuire

Le contribuzioni sono benvenute! Per favore, consulta la [guida per i contributori](CONTRIBUTING.md) per saperne di più.

## Licenza

Licenza MIT. Vedi il file [LICENSE](LICENSE) per maggiori informazioni.

---

Fatto con ❤️ e **React Native**.
