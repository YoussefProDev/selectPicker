import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Text } from 'react-native';
import {
  GestureHandlerRootView,
  TextInput,
} from 'react-native-gesture-handler';
import { PickerList, type ItemType } from 'select-picker';
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
  const [valueFrom, setValueFrom] = React.useState<string>('');
  const [valueTo, setValueTo] = React.useState<string>('');
  const [canCalc, setCanCalc] = React.useState<boolean>(false);
  const items = Object.values(currency).map(({ name, code, ...data }) => ({
    key: code,
    label: name,
    value: code,
    data: { name, code, ...data },
  }));
  const [currencyFrom, setCurrencyFrom] = React.useState<Currency>({
    symbol: '€',
    name: 'Euro',
    symbol_native: '€',
    decimal_digits: 2,
    rounding: 0,
    code: 'EUR',
    name_plural: 'euros',
    flag_emoji: '🇪🇺',
  });
  const [currencyTo, setCurrencyTo] = React.useState<Currency>({
    symbol: '$',
    name: 'US Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'USD',
    name_plural: 'US dollars',
    flag_emoji: '🇺🇸',
  });

  const getCurrencyRate = async (selectedCurrency: Currency) => {
    try {
      setCanCalc(false);
      const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedCurrency.code.toLowerCase()}.json`;
      const response = await fetch(url);
      const data = await response.json();

      const { date, ...rates } = data;
      setLastUpdate(date);
      setCurrencyRate(rates);
    } catch (error) {
      console.error('Error fetching currency rates: ', error);
    } finally {
      setCanCalc(true);
    }
  };

  React.useEffect(() => {
    getCurrencyRate(currencyFrom);
  }, [currencyFrom]);

  const calc = (type: 'from' | 'to', value: number) => {
    const rate = currencyRate[currencyTo.code.toLowerCase()];
    if (!rate) return;

    if (type === 'from') {
      const convertedValue = value * rate;
      setValueTo(
        convertedValue.toFixed(2) === '0.00' ? '' : convertedValue.toFixed(2)
      );
    } else {
      const convertedValue = value / rate;
      setValueFrom(
        convertedValue.toFixed(2) === '0.00' ? '' : convertedValue.toFixed(2)
      );
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[defaultStyles.container]}
        behavior="height"
        keyboardVerticalOffset={80}
      >
        <View style={[styles.inputContainer]}>
          <PickerList
            items={items}
            onSelectItem={(data: ItemType) => {
              setCurrencyFrom(data.data as Currency);
              setValueFrom('');
              setValueTo('');
            }}
            darkMode={darkMode}
            title="Currency From"
            searchPlaceholder="Search"
            triggerStyle={{ container: styles.container }}
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
        <View style={styles.inputContainer}>
          <PickerList
            items={items}
            onSelectItem={(data: ItemType) => {
              setCurrencyTo(data.data as Currency);
              setValueFrom('');
              setValueTo('');
            }}
            darkMode={darkMode}
            title="Currency From"
            searchPlaceholder="Search"
            triggerStyle={{ container: styles.container }}
          />
          <TextInput
            onChangeText={(text: string) => {
              setValueTo(text);
              calc('to', +text);
            }}
            style={[styles.input, canCalc ? styles.enabled : styles.disabled]}
            placeholder="To Value"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={valueTo}
          />
        </View>
        <Text style={styles.lastUpdate}>Last Update: {lastUpdate}</Text>
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
    flex: 1,
    height: 70,
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
    marginTop: 'auto',
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default CurrencyPage;
