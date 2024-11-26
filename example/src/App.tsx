import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  GestureHandlerRootView,
  TextInput,
} from 'react-native-gesture-handler';
import { PickerList, PickerSectionList, type ItemType } from 'select-picker';
import currency from './constants/CommonCurrency.json';
export type Currency = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  flag_emoji: string;
};

import { defaultStyles } from './styles/styles';
import { Colors } from './styles/Colors';

const CurrencyPage = () => {
  const [currencyRate, setCurrencyRate] = React.useState<
    Record<string, number>
  >({});
  const [lastUpdate, setLastUpdate] = React.useState<string | undefined>(
    new Date().toISOString().split('T')[0]
  );
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const items = Object.values(currency).map(
    ({ name, code, flag_emoji, ...data }) => ({
      key: code,
      label: `${flag_emoji}  ${name}`,
      value: flag_emoji,
      data: { name, flag_emoji, code, ...data },
    })
  );

  const getCurrencyRate = async (selectedCurrency: Currency) => {
    try {
      setCanCalc(false);
      const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedCurrency.code.toLowerCase()}.json`;

      const response = await fetch(url);
      const data = await response.json();

      const { date, ...rates } = data;

      setLastUpdate(date);
      setCurrencyRate(rates[selectedCurrency.code.toLowerCase()]);
      return rates[selectedCurrency.code.toLowerCase()];
    } catch (error) {
      console.error('Error fetching currency rates: ', error);
    } finally {
      setCanCalc(true);
    }
  };

  React.useEffect(() => {
    getCurrencyRate(currencyFrom);
  }, [currencyFrom]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[defaultStyles.container]}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <View style={[styles.inputContainer]}>
          <PickerSectionList
            sections={items}
            onSelectItem={(data: ItemType) => {
              setCurrencyFrom(data.data as Currency);
              setValueFrom('');
              setValueTo('');
            }}
            darkMode={darkMode}
            title="Currency From"
            searchPlaceholder="Search"
            triggerStyle={{ container: styles.container }}
            selectedItem={{
              key: currencyFrom.code,
              label: `${currencyFrom.flag_emoji}  ${currencyFrom.name}`,
              value: currencyFrom.code,
              data: currencyFrom,
            }}
          />
          <TextInput
            onChangeText={(text: string) => {
              setValueFrom(text);
              calc('from', +text);
            }}
            style={[styles.input, canCalc ? styles.enabled : styles.disabled]}
            placeholder="From Value"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={valueFrom}
          />
        </View>

        <TouchableOpacity onPress={() => setDarkMode((prev) => !prev)}>
          <Text>Change DarkMode</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
    height: 70,
    flex: 1,
  },
  container: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    marginRight: 10,
    height: 70,
  },
  enabled: {
    backgroundColor: Colors.lightGray,
  },
  disabled: {
    backgroundColor: Colors.lightGray,
    opacity: 0.5,
  },
  lastUpdate: {
    fontSize: 18,
    color: Colors.gray,
    // flex: 1,
    // justifyContent: 'flex-end',
    // marginTop: 'auto',
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default CurrencyPage;
