import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PickerSectionList, type ItemType, PickerList } from 'select-picker'; // Assicurati di aver importato il componente
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import currency from './constants/CommonCurrency.json';
export default function App() {
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const items = Object.values(currency).map(({ name, code, ...data }) => ({
    key: code,
    label: name,
    value: code,
    data: data,
  }));
  const sections = [
    {
      sectionName: 'Valute Europee',
      title: 'Sezione delle valute europee',
      items: [
        { key: 'EUR', label: 'Euro', value: 'EUR' },
        { key: 'GBP', label: 'Sterlina Inglese', value: 'GBP' },
        { key: 'CHF', label: 'Franco Svizzero', value: 'CHF', disabled: true },
      ],
    },
    {
      sectionName: 'Valute Americane',
      title: 'Sezione delle valute americane',
      items: [
        { key: 'USD', label: 'Dollaro Statunitense', value: 'USD' },
        { key: 'CAD', label: 'Dollaro Canadese', value: 'CAD' },
        { key: 'MXN', label: 'Peso Messicano', value: 'MXN' },
      ],
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text>{selectedItem?.label}</Text>
      <View>
        <PickerList items={items} pageStyle="FullPage" />
        <PickerSectionList
          sections={sections}
          pageStyle="FullPage"
          title="Seleziona una Valuta"
          searchPlaceholder="Cerca valuta..."
          textEmpty="Nessuna valuta trovata"
          showCloseButton={true}
          showModalTitle={true}
          // darkMode={true}
          // renderItem={(item) => (
          //   <Text style={styles.triggerText}>
          //     {item?.label ? item?.label : 'Seleziona una valuta'}
          //   </Text>
          // )}
          // renderTrigger={(item) => (
          //   <Text>Seleziona una valuta,{item?.label}</Text>
          // )}
          onSelectItem={(item) => {
            setSelectedItem(item);
            console.log(item);
          }}
          onOpen={() => console.log('Picker aperto')}
          onClose={() => console.log('Picker chiuso')}
          disable={false}
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
  customItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  customTrigger: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  triggerText: {
    fontSize: 18,
    color: '#fff',
  },
});
