import React, { useMemo, useEffect, useState, useCallback } from 'react';
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
import {
  PickerSectionList,
  type ItemType,
  type SectionType,
} from 'select-picker';
import configureMeasurements, { type Measure, type Unit } from 'convert-units';

import { defaultStyles } from './styles/styles';
import { Colors } from './styles/Colors';

// Funzione utility per generare le sezioni delle unità
const generateSections = (
  convert: typeof configureMeasurements
): SectionType[] =>
  useMemo(() => {
    const measures = convert().measures();
    return measures.map((measure) => {
      const units = convert().possibilities(measure);
      const items: ItemType[] = units.map((unit) => ({
        key: unit,
        label: convert().describe(unit).singular,
        value: unit,
        data: convert().describe(unit),
      }));
      return { sectionName: measure, items };
    });
  }, [convert]);

const UnitPage = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const convert = useMemo(() => configureMeasurements, []);
  const sections = generateSections(convert);

  const [valueFrom, setValueFrom] = useState<string>('');
  const [valueTo, setValueTo] = useState<string>('');

  const [unitFrom, setUnitFrom] = useState<ItemType>({
    data: {
      abbr: 'km',
      measure: 'length',
      plural: 'Kilometers',
      singular: 'Kilometer',
      system: 'metric',
    },
    key: 'km',
    label: 'Kilometer',
    value: 'km',
  });

  const [unitTo, setUnitTo] = useState<ItemType>({
    data: {
      abbr: 'm',
      measure: 'length',
      plural: 'Meters',
      singular: 'Meter',
      system: 'metric',
    },
    key: 'm',
    label: 'Meter',
    value: 'm',
  });

  // Funzione per rimuovere caratteri non numerici
  const cleanInput = (input: string): string => {
    return input.replace(/[^0-9.,]/g, ''); // Permette solo numeri, virgola e punto
  };

  const performConversion = useCallback(
    (amount: string, fromUnit: ItemType, toUnit: ItemType): string => {
      const parsedAmount = parseFloat(amount.replace(',', '.'));
      if (!isNaN(parsedAmount)) {
        try {
          return convert(parsedAmount)
            .from(fromUnit.value as Unit)
            .to(toUnit.value as Unit)
            .toFixed(4)
            .toString();
        } catch {
          return ''; // Conversione non valida
        }
      }
      return ''; // Input non valido
    },
    [convert]
  );

  useEffect(() => {
    if (valueFrom !== '') {
      setValueTo(performConversion(valueFrom, unitFrom, unitTo));
    }
  }, [valueFrom, unitFrom, unitTo, performConversion]);

  const handleUnitChange = (newUnit: ItemType, type: 'from' | 'to') => {
    if (type === 'from') {
      setUnitFrom(newUnit);
      if (newUnit.data.measure !== unitTo.data.measure) {
        const compatibleUnit = sections.find(
          (section) => section.sectionName === newUnit.data.measure
        )?.items[0];
        if (compatibleUnit) setUnitTo(compatibleUnit);
      }
    } else {
      setUnitTo(newUnit);
      if (newUnit.data.measure !== unitFrom.data.measure) {
        const compatibleUnit = sections.find(
          (section) => section.sectionName === newUnit.data.measure
        )?.items[0];
        if (compatibleUnit) setUnitFrom(compatibleUnit);
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[defaultStyles.container]}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputContainer}>
          <PickerSectionList
            sections={sections}
            onSelectItem={(item) => handleUnitChange(item, 'from')}
            darkMode={darkMode}
            title="Unit From"
            searchPlaceholder="Search"
            triggerStyle={{ container: styles.container }}
            selectedItem={unitFrom}
          />
          <TextInput
            onChangeText={(text) => setValueFrom(cleanInput(text))}
            style={styles.input}
            placeholder="From Value"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={valueFrom}
          />
        </View>

        <View style={styles.inputContainer}>
          <PickerSectionList
            sections={sections}
            onSelectItem={(item) => handleUnitChange(item, 'to')}
            darkMode={darkMode}
            title="Unit To"
            searchPlaceholder="Search"
            triggerStyle={{ container: styles.container }}
            selectedItem={unitTo}
          />
          <TextInput
            onChangeText={(text) => setValueTo(cleanInput(text))}
            style={styles.input}
            placeholder="To Value"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={valueTo}
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
    alignItems: 'center',
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
});

export default UnitPage;
