import { Button, StyleSheet, View } from 'react-native';
import { SelectPickerComponent } from 'select-picker';
import currency from './constants/CommonCurrency.json';
import { useRef } from 'react';
import type { SelectPickerRef } from '../../src/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
export default function App() {
  const selectRef = useRef<SelectPickerRef>(null);
  const items = Object.values(currency).map(({ name, code, ...data }) => {
    return {
      key: code,
      label: name,
      value: code,
      data: data,
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <SelectPickerComponent
          items={items}
          onSelectItem={(item) => {
            console.log(item);
          }}
          darkMode
          ref={selectRef}
        />
        <Button
          title="apri"
          onPress={() => {
            console.log('apri');

            selectRef.current?.open();
          }}
        />
        <Button
          title="chiudi"
          onPress={() => {
            console.log('chiudi');

            selectRef.current?.close();
          }}
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
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
