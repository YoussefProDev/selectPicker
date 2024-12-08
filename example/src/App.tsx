import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PickerComponent, type Item, type Section } from 'select-picker';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          title="Toggle Dark Mode"
          onPress={() => setDarkMode(!darkMode)}
        />
        <Text style={{ marginVertical: 10 }}>
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
              style={{
                backgroundColor: darkMode ? 'white' : 'black',
                color: darkMode ? 'black' : 'white',
                padding: 10,
                borderRadius: 25,
              }}
            >
              {item ? item.label : 'Open Picker'}
            </Text>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
