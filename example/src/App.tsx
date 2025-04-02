import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PickerComponent, { type Item, type Section } from 'rn-select-picker';

const App = () => {
  const [selectedItem, setSelectedItem] = useState<Item>({
    key: '0',
    label: 'Open Picker',
    value: '',
  });
  const [selectedSectionItem, setSelectedSectionItem] = useState<Item>({
    key: '0',
    label: 'Open Sections Picker',
    value: '',
  });
  const [darkMode, setDarkMode] = useState(false);

  const items: Item<{
    name: string;
    details: { category: string; description: string };
  }>[] = [
    {
      key: '1',
      label: 'Apple',
      value: {
        name: 'Apple',
        details: { category: 'Fruit', description: 'A red fruit' },
      },
    },
    {
      key: '2',
      label: 'Banana',
      value: {
        name: 'Banana',
        details: { category: 'Fruit', description: 'A yellow fruit' },
      },
    },
  ];

  const sections: Section[] = [
    {
      sectionName: 'Fruits',
      items: [
        { key: 'apple', label: 'Apple', value: 'apple' },
        { key: 'banana', label: 'Banana', value: 'banana' },
      ],
    },
    {
      sectionName: 'Vegetables',
      items: [
        { key: 'carrot', label: 'Carrot', value: 'carrot' },
        { key: 'broccoli', label: 'Broccoli', value: 'broccoli' },
      ],
    },
  ];

  return (
    <GestureHandlerRootView style={styles.root}>
      <View
        style={[
          styles.container,
          darkMode ? styles.containerDark : styles.containerLight,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.toggleButton,
            darkMode ? styles.toggleButtonDark : styles.toggleButtonLight,
          ]}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              darkMode
                ? styles.toggleButtonTextDark
                : styles.toggleButtonTextLight,
            ]}
          >
            Toggle Dark Mode
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.selectedItemText,
            darkMode
              ? styles.selectedItemTextDark
              : styles.selectedItemTextLight,
          ]}
        >
          Selected Item: {selectedItem?.label || 'None'}
        </Text>

        <Text
          style={[
            styles.selectedItemText,
            darkMode
              ? styles.selectedItemTextDark
              : styles.selectedItemTextLight,
          ]}
        >
          Selected Section Item: {selectedSectionItem?.label || 'None'}
        </Text>

        <PickerComponent
          items={items}
          selectedItem={selectedItem}
          onSelectItem={(item) => setSelectedItem(item)}
          darkMode={darkMode}
          triggerStyle={{ container: { marginTop: 20 } }}
          renderTrigger={(item) => (
            <Text
              style={[
                styles.trigger,
                darkMode ? styles.triggerDark : styles.triggerLight,
              ]}
            >
              {item ? item.label : 'Open Item Picker'}
            </Text>
          )}
        />
        <PickerComponent
          sections={sections}
          selectedItem={selectedSectionItem}
          onSelectItem={(item) => setSelectedSectionItem(item)}
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
              {item ? item.label : 'Open Sections Picker'}
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
  containerLight: {
    backgroundColor: '#f0f0f0',
  },
  containerDark: {
    backgroundColor: '#1c1c1c',
  },
  selectedItemText: {
    marginVertical: 10,
    fontSize: 16,
  },
  selectedItemTextLight: {
    color: '#000',
  },
  selectedItemTextDark: {
    color: '#fff',
  },
  trigger: {
    padding: 15,
    borderRadius: 30,
    fontSize: 16,
    margin: 10,
  },
  triggerLight: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  triggerDark: {
    backgroundColor: '#333',
    color: '#4CAF50',
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  toggleButtonLight: {
    backgroundColor: '#4CAF50',
  },
  toggleButtonDark: {
    backgroundColor: '#1c1c1c',
  },
  toggleButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  toggleButtonTextLight: {
    color: '#fff',
  },
  toggleButtonTextDark: {
    color: '#fff',
  },
});

export default App;
