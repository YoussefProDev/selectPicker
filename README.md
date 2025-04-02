# `select-picker`

**A highly customizable option selection component for React Native**

`select-picker` is an advanced React Native component designed for selecting options from a list. It includes powerful features such as search functionality, item organization in sections, dark mode support, and full customization options for the trigger, items, and modal. It supports complex objects as list items, making it an ideal choice for a wide range of applications, from simple selection to more advanced data-driven UIs.

---

## Key Features

- **Dark/Light Mode**: Supports automatic theme switching between dark and light modes to match your app's design.
- **Quick Search**: Built-in search field to quickly filter and find items within the list.
- **Sections**: Organize items into sections, ideal for long or categorized lists.
- **Programmatic Control**: Open, close, and manage the picker programmatically through the `ref` API.
- **Fully Customizable**: Complete flexibility to customize the trigger, items, sections, and modal styling.
- **Flexible Styling**: Override default styles for the trigger, modal, and items using style props.
- **Support for Complex Objects**: Items can be simple strings or complex objects with multiple properties, enabling more dynamic selection options.
- **Item Selection Callbacks**: Trigger custom behavior whenever an item is selected.
- **Modal Customization**: Adjust modal visibility, close behavior, title display, and button appearance.
- **Custom Section Rendering**: Customize how each section header is rendered using the `renderSection` prop.

---

## Installation

To install the package, use either npm or yarn:

```bash
npm install select-picker
```

Or with Yarn:

```bash
yarn add select-picker
```

### Required Dependencies

This component depends on two external libraries for handling gestures and animations:

1. **`react-native-gesture-handler`**: For managing touch gestures within React Native applications.
2. **`react-native-reanimated`**: For smooth animations and transitions.

Install the required dependencies:

```bash
npm install react-native-gesture-handler@^2.20.0 react-native-reanimated@~3.16.1
```

Or with Yarn:

```bash
yarn add react-native-gesture-handler@^2.20.0 react-native-reanimated@~3.16.1
```

### Configure `react-native-gesture-handler` and `react-native-reanimated`

Ensure that both libraries are configured correctly. Follow the official documentation for setup:

- [react-native-gesture-handler installation](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [react-native-reanimated installation](https://docs.swmansion.com/react-native-reanimated/docs/)

---

## Usage

### Basic Example

A simple example showcasing the `PickerComponent` for basic item selection:

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PickerComponent, Item } from 'select-picker';

const App = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const items: Item[] = [
    { key: '1', label: 'Option 1', value: 'opt1' },
    { key: '2', label: 'Option 2', value: 'opt2' },
    { key: '3', label: 'Option 3', value: 'opt3' },
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
        <Text style={{ marginBottom: 10 }}>
          Selected Item: {selectedItem?.label || 'None'}
        </Text>
        <PickerComponent
          items={items}
          selectedItem={selectedItem}
          onSelectItem={(item) => setSelectedItem(item)}
          title="Select an Option"
          searchPlaceholder="Search Options"
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
```

### Example with Sections, Dark Mode, and Custom Trigger

This example demonstrates advanced usage of sections, dark mode support, and custom trigger styling:

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PickerComponent, Item, Section } from 'select-picker';

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
            <Text style={{ color: darkMode ? 'gray' : 'black' }}>
              {item ? item.label : 'Open Picker'}
            </Text>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
```

---

## API and Props

### `PickerComponent` Props

The `PickerComponent` accepts the following props:

```ts
export interface PickerProps<T = any> {
  pageStyle?: 'FullPage' | 'Modal'; // Display type (Full page or modal window)
  sections?: Section<T>[]; // Sections of items (optional)
  items?: Item<T>[]; // List of items to display
  onSelectItem?: (item: Item<T>) => void; // Callback when an item is selected
  darkMode?: boolean; // Enable dark mode for the component
  renderTrigger?: (item: Item<T> | null) => ReactNode; // Custom trigger component
  renderItem?: (item: Item<T> | null) => ReactNode; // Custom item component
  renderSection?: (section: Section<T> | null) => ReactNode; // Custom section header
  disable?: boolean; // If true, disables the component
  onOpen?: () => void; // Callback when the picker is opened
  onClose?: () => void; // Callback when the picker is closed
  triggerStyle?: TriggerStyle; // Custom style for the trigger button
  modalStyle?: ModalStyle; // Custom style for the modal
  title?: string; // Title of the modal
  searchPlaceholder?: string; // Placeholder text for the search field
  textEmpty?: string; // Message displayed when the list is empty
  showCloseButton?: boolean; // Show the close button in the modal
  showModalTitle?: boolean; // Show the title in the modal window
  selectedItem: Item<T> | null; // The selected item
  ref?: React.Ref<PickerRef>; // Ref for programmatic control
}
```

### Prop Details

- **`pageStyle`**: `FullPage` for full-screen display, `Modal` for modal window.
- **`sections`**: An array of sections, each with a `sectionName` and `items`. Sections help organize the list and improve navigation.
- **`items`**: A list of items to be selected from. Each item can be a string, number, or an object with multiple properties.
- **`onSelectItem`**: A callback function that is triggered when an item is selected from the list.
- **`darkMode`**: If `true`, enables dark mode. The component will adapt its colors based on the current theme.
- **`renderTrigger`**: A function that allows you to provide a custom component for the picker trigger (e.g., button, text).
- **`renderItem`**: A function to customize how each item is rendered in the list.
- **`renderSection`**: A function to customize how each section header is rendered. You can use this to style or modify the section title and layout.
- **`disable`**: If `true`, the picker will be disabled and cannot be interacted with.
- **`onOpen`**: A callback triggered when the picker is opened.
- **`onClose`**: A callback triggered when the picker is closed.
- **`triggerStyle`**: Custom styles for the trigger component.
- **`modalStyle`**: Custom styles for the modal.
- **`title`**: The title of the modal.
- **`searchPlaceholder`**: The placeholder text for the search input field.
- **`textEmpty`**: A message to display when the list is empty.
- **`showCloseButton`**: If `true`, a close button will be shown in the modal.
- **`showModalTitle`**: If `true`, the title will be displayed in the modal.
- **`selectedItem`**: The currently selected item, or `null` if no item is selected.
- **`ref`**: A ref for programmatic control, such as opening or closing the picker from outside.

---

## Customization

### Customizing the Trigger

You can fully customize the trigger button that opens the picker. Here's an example of using a custom trigger component:

```tsx
const CustomTrigger = (item: Item<any> | null) => (
  <View style={{ backgroundColor: 'blue', padding: 10 }}>
    <Text style={{ color: 'white' }}>{item ? item.label : 'Select Item'}</Text>
  </View>
);
```

### Customizing the Items

Each item in the list can be customized using the `renderItem` prop. For example:

```tsx
const CustomItem = (item: Item<any> | null) => (
  <View style={{ padding: 10 }}>
    <Text style={{ fontSize: 16, color: 'green' }}>{item?.label}</Text>
  </View>
);
```

### Customizing the Sections

Use the `renderSection` prop to customize how each section header is displayed:

```tsx
const CustomSection = (section: Section<any> | null) => (
  <View style={{ padding: 10, backgroundColor: 'lightgray' }}>
    <Text style={{ fontWeight: 'bold' }}>{section?.SectionName}</Text>
  </View>
);
```

---

## Conclusion

`select-picker` is a robust, feature-rich, and fully customizable option selection component for React Native. It offers built-in support for dark mode, search, item sections, complex object handling, and now custom section rendering. With its extensive customization options, `select-picker` can seamlessly integrate into any project.
