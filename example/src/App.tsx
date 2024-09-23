import { StyleSheet, View } from 'react-native';
import { CurrencyPickerComponent } from 'select-picker';
import currency from './constants/CommonCurrency.json';
export default function App() {
  const items = Object.values(currency).map(({ name, code, ...data }) => {
    return {
      key: code,
      label: name,
      value: code,
      data: data,
    };
  });

  return (
    <View style={styles.container}>
      <CurrencyPickerComponent
        items={items}
        onSelectItem={(item) => {
          console.log(item);
        }}
        darkMode={true}
      />
    </View>
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
