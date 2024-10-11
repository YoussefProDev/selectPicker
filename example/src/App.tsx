import { useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SelectPickerComponent, type SelectPickerRef } from 'select-picker';
import currency from './constants/CommonCurrency.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const selectRef = useRef<SelectPickerRef>(null); // Riferimento per controllare programmaticamente il picker
  const items = Object.values(currency).map(({ name, code, ...data }) => ({
    key: code,
    label: name,
    value: code,
    data: data,
  }));
  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <SelectPickerComponent
          items={items}
<<<<<<< Updated upstream
          onSelectItem={(item) => {
            console.log(item);
          }}
          // darkMode
=======
          onSelectItem={(item) => console.log('Item selezionato:', item)}
          // darkMode // Modalità scura abilitata
          pageStyle="Modal"
>>>>>>> Stashed changes
          ref={selectRef}
          searchPlaceholder="Cerca valuta" // Placeholder per il campo di ricerca
          title="Seleziona Valuta" // Titolo del modale
        />
        <Button
          title="Apri Picker"
          onPress={() => selectRef.current?.open()} // Apertura programmatica del picker
        />
        <Button
          title="Chiudi Picker"
          onPress={() => selectRef.current?.close()} // Chiusura programmatica del picker
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
