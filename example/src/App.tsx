import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PickerComponent, type Item, type Section } from 'rn-select-picker';

const App = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const sections: Section[] = [
    {
      name: 'Fruits',
      items: [
        { key: 'apple', label: 'Apple', value: 'apple' },
        { key: 'banana', label: 'Banana', value: 'banana' },
      ],
    },
    {
      name: 'Vegetables',
      items: [
        { key: 'carrot', label: 'Carrot', value: 'carrot' },
        { key: 'broccoli', label: 'Broccoli', value: 'broccoli' },
      ],
    },
  ];

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <Button
          title="Toggle Dark Mode"
          onPress={() => setDarkMode(!darkMode)}
        />
        <Text style={styles.selectedItemText}>
          Selected Item: {selectedItem?.label || 'None'}
        </Text>
        <PickerComponent
          sections={sections}
          selectedItem={selectedItem}
          onSelectItem={(item) => setSelectedItem(item)}
          darkMode={darkMode}
          title="Select a Food Item"
          searchPlaceholder="Search Items"
          renderTrigger={(item) => (
            <Text
              style={[
                styles.trigger,
                darkMode ? styles.triggerDark : styles.triggerLight,
              ]}
            >
              {item ? item.label : 'Open Picker'}
            </Text>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItemText: {
    marginVertical: 10,
  },
  trigger: {
    padding: 10,
    borderRadius: 25,
  },
  triggerDark: {
    backgroundColor: 'white',
    color: 'black',
  },
  triggerLight: {
    backgroundColor: 'black',
    color: 'white',
  },
});

export default App;
