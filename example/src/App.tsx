import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
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
    {
      key: '3',
      label: 'Carrot',
      value: {
        name: 'Carrot',
        details: {
          category: 'Vegetable',
          description: 'An orange root vegetable',
        },
      },
    },
    {
      key: '4',
      label: 'Broccoli',
      value: {
        name: 'Broccoli',
        details: {
          category: 'Vegetable',
          description: 'A green cruciferous vegetable',
        },
      },
    },
    {
      key: '5',
      label: 'Strawberry',
      value: {
        name: 'Strawberry',
        details: {
          category: 'Fruit',
          description: 'A small red fruit with seeds on the outside',
        },
      },
    },
    {
      key: '6',
      label: 'Potato',
      value: {
        name: 'Potato',
        details: { category: 'Vegetable', description: 'A starchy tuber' },
      },
    },
    {
      key: '7',
      label: 'Orange',
      value: {
        name: 'Orange',
        details: {
          category: 'Fruit',
          description: 'A citrus fruit with a tough orange rind',
        },
      },
    },
    {
      key: '8',
      label: 'Spinach',
      value: {
        name: 'Spinach',
        details: {
          category: 'Vegetable',
          description: 'A leafy green vegetable',
        },
      },
    },
    {
      key: '9',
      label: 'Blueberry',
      value: {
        name: 'Blueberry',
        details: { category: 'Fruit', description: 'A small blue fruit' },
      },
    },
    {
      key: '10',
      label: 'Cucumber',
      value: {
        name: 'Cucumber',
        details: {
          category: 'Vegetable',
          description: 'A long green vegetable',
        },
      },
    },
    {
      key: '11',
      label: 'Grape',
      value: {
        name: 'Grape',
        details: {
          category: 'Fruit',
          description: 'A small round fruit, often purple or green',
        },
      },
    },
    {
      key: '12',
      label: 'Lettuce',
      value: {
        name: 'Lettuce',
        details: {
          category: 'Vegetable',
          description: 'A leafy vegetable used in salads',
        },
      },
    },
    {
      key: '13',
      label: 'Pineapple',
      value: {
        name: 'Pineapple',
        details: {
          category: 'Fruit',
          description: 'A tropical fruit with spiky skin and sweet flesh',
        },
      },
    },
    {
      key: '14',
      label: 'Tomato',
      value: {
        name: 'Tomato',
        details: {
          category: 'Fruit',
          description: 'A red fruit often used in savory dishes',
        },
      },
    },
    {
      key: '15',
      label: 'Zucchini',
      value: {
        name: 'Zucchini',
        details: {
          category: 'Vegetable',
          description: 'A green summer squash',
        },
      },
    },
    {
      key: '16',
      label: 'Mango',
      value: {
        name: 'Mango',
        details: {
          category: 'Fruit',
          description: 'A tropical fruit with sweet orange flesh',
        },
      },
    },
    {
      key: '17',
      label: 'Peach',
      value: {
        name: 'Peach',
        details: {
          category: 'Fruit',
          description: 'A soft fruit with fuzzy skin',
        },
      },
    },
    {
      key: '18',
      label: 'Peas',
      value: {
        name: 'Peas',
        details: {
          category: 'Vegetable',
          description: 'Small green round vegetables',
        },
      },
    },
    {
      key: '19',
      label: 'Watermelon',
      value: {
        name: 'Watermelon',
        details: {
          category: 'Fruit',
          description: 'A large fruit with red flesh and green rind',
        },
      },
    },
    {
      key: '20',
      label: 'Celery',
      value: {
        name: 'Celery',
        details: {
          category: 'Vegetable',
          description: 'A crunchy green stalk vegetable',
        },
      },
    },
    {
      key: '21',
      label: 'Kiwi',
      value: {
        name: 'Kiwi',
        details: {
          category: 'Fruit',
          description: 'A small fruit with fuzzy skin and green flesh',
        },
      },
    },
    {
      key: '22',
      label: 'Radish',
      value: {
        name: 'Radish',
        details: {
          category: 'Vegetable',
          description: 'A small root vegetable with a peppery taste',
        },
      },
    },
    {
      key: '23',
      label: 'Cherry',
      value: {
        name: 'Cherry',
        details: {
          category: 'Fruit',
          description: 'A small red fruit with a pit',
        },
      },
    },
    {
      key: '24',
      label: 'Eggplant',
      value: {
        name: 'Eggplant',
        details: {
          category: 'Vegetable',
          description: 'A purple vegetable also known as aubergine',
        },
      },
    },
    {
      key: '25',
      label: 'Raspberry',
      value: {
        name: 'Raspberry',
        details: {
          category: 'Fruit',
          description: 'A red or black aggregate fruit',
        },
      },
    },
    {
      key: '26',
      label: 'Beetroot',
      value: {
        name: 'Beetroot',
        details: {
          category: 'Vegetable',
          description: 'A deep red root vegetable',
        },
      },
    },
    {
      key: '27',
      label: 'Papaya',
      value: {
        name: 'Papaya',
        details: {
          category: 'Fruit',
          description: 'A tropical fruit with orange flesh and black seeds',
        },
      },
    },
    {
      key: '28',
      label: 'Corn',
      value: {
        name: 'Corn',
        details: {
          category: 'Vegetable',
          description: 'A yellow vegetable made of kernels on a cob',
        },
      },
    },
    {
      key: '29',
      label: 'Avocado',
      value: {
        name: 'Avocado',
        details: {
          category: 'Fruit',
          description: 'A creamy green fruit with a large seed',
        },
      },
    },
    {
      key: '30',
      label: 'Garlic',
      value: {
        name: 'Garlic',
        details: {
          category: 'Vegetable',
          description: 'A pungent bulb used for flavoring',
        },
      },
    },
    {
      key: '31',
      label: 'Plum',
      value: {
        name: 'Plum',
        details: {
          category: 'Fruit',
          description: 'A small fruit with a smooth skin and a pit',
        },
      },
    },
    {
      key: '32',
      label: 'Onion',
      value: {
        name: 'Onion',
        details: {
          category: 'Vegetable',
          description: 'A bulb vegetable with layers and strong flavor',
        },
      },
    },
  ];
  const sections: Section[] = [
    {
      sectionName: 'Fruits',
      items: [
        { key: 'apple', label: 'Apple', value: 'apple' },
        { key: 'banana', label: 'Banana', value: 'banana' },
        { key: 'strawberry', label: 'Strawberry', value: 'strawberry' },
        { key: 'orange', label: 'Orange', value: 'orange' },
        { key: 'blueberry', label: 'Blueberry', value: 'blueberry' },
        { key: 'grape', label: 'Grape', value: 'grape' },
        { key: 'pineapple', label: 'Pineapple', value: 'pineapple' },
        { key: 'mango', label: 'Mango', value: 'mango' },
        { key: 'peach', label: 'Peach', value: 'peach' },
        { key: 'watermelon', label: 'Watermelon', value: 'watermelon' },
        { key: 'kiwi', label: 'Kiwi', value: 'kiwi' },
        { key: 'cherry', label: 'Cherry', value: 'cherry' },
        { key: 'raspberry', label: 'Raspberry', value: 'raspberry' },
        { key: 'papaya', label: 'Papaya', value: 'papaya' },
        { key: 'plum', label: 'Plum', value: 'plum' },
        { key: 'avocado', label: 'Avocado', value: 'avocado' },
      ],
    },
    {
      sectionName: 'Vegetables',
      items: [
        { key: 'carrot', label: 'Carrot', value: 'carrot' },
        { key: 'broccoli', label: 'Broccoli', value: 'broccoli' },
        { key: 'potato', label: 'Potato', value: 'potato' },
        { key: 'spinach', label: 'Spinach', value: 'spinach' },
        { key: 'cucumber', label: 'Cucumber', value: 'cucumber' },
        { key: 'lettuce', label: 'Lettuce', value: 'lettuce' },
        { key: 'tomato', label: 'Tomato', value: 'tomato' },
        { key: 'zucchini', label: 'Zucchini', value: 'zucchini' },
        { key: 'peas', label: 'Peas', value: 'peas' },
        { key: 'celery', label: 'Celery', value: 'celery' },
        { key: 'radish', label: 'Radish', value: 'radish' },
        { key: 'eggplant', label: 'Eggplant', value: 'eggplant' },
        { key: 'beetroot', label: 'Beetroot', value: 'beetroot' },
        { key: 'corn', label: 'Corn', value: 'corn' },
        { key: 'garlic', label: 'Garlic', value: 'garlic' },
        { key: 'onion', label: 'Onion', value: 'onion' },
      ],
    },
    {
      sectionName: 'Herbs',
      items: [
        { key: 'basil', label: 'Basil', value: 'basil' },
        { key: 'parsley', label: 'Parsley', value: 'parsley' },
        { key: 'mint', label: 'Mint', value: 'mint' },
        { key: 'oregano', label: 'Oregano', value: 'oregano' },
        { key: 'rosemary', label: 'Rosemary', value: 'rosemary' },
        { key: 'thyme', label: 'Thyme', value: 'thyme' },
      ],
    },
    {
      sectionName: 'Grains',
      items: [
        { key: 'rice', label: 'Rice', value: 'rice' },
        { key: 'wheat', label: 'Wheat', value: 'wheat' },
        { key: 'barley', label: 'Barley', value: 'barley' },
        { key: 'quinoa', label: 'Quinoa', value: 'quinoa' },
        { key: 'oats', label: 'Oats', value: 'oats' },
      ],
    },
    {
      sectionName: 'Legumes',
      items: [
        { key: 'lentils', label: 'Lentils', value: 'lentils' },
        { key: 'chickpeas', label: 'Chickpeas', value: 'chickpeas' },
        { key: 'blackbeans', label: 'Black Beans', value: 'blackbeans' },
        { key: 'kidneybeans', label: 'Kidney Beans', value: 'kidneybeans' },
        { key: 'soybeans', label: 'Soybeans', value: 'soybeans' },
      ],
    },
    {
      sectionName: 'Nuts',
      items: [
        { key: 'almond', label: 'Almond', value: 'almond' },
        { key: 'cashew', label: 'Cashew', value: 'cashew' },
        { key: 'walnut', label: 'Walnut', value: 'walnut' },
        { key: 'pecan', label: 'Pecan', value: 'pecan' },
        { key: 'hazelnut', label: 'Hazelnut', value: 'hazelnut' },
      ],
    },
    {
      sectionName: 'Spices',
      items: [
        { key: 'cinnamon', label: 'Cinnamon', value: 'cinnamon' },
        { key: 'clove', label: 'Clove', value: 'clove' },
        { key: 'turmeric', label: 'Turmeric', value: 'turmeric' },
        { key: 'cumin', label: 'Cumin', value: 'cumin' },
        { key: 'paprika', label: 'Paprika', value: 'paprika' },
      ],
    },
  ];
  const { height } = useWindowDimensions();
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
          modalStyle={{ modalHeight: height }}
          pageStyle="Modal"
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
          pageStyle="Modal"
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
