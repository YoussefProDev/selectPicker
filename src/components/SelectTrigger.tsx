import { View, Text, TouchableOpacity } from 'react-native';

import { Styles, getStyles } from '../styles';
import type { SelectTriggerProps } from '../types';
import { useMemo } from 'react';
export const SelectTrigger = ({
  open,
  selectItem,
  triggerStyle,
  renderTrigger,
  disable,
  darkMode,
}: SelectTriggerProps) => {
  const styles = useMemo(() => getStyles(darkMode), [darkMode]);
  return (
    <TouchableOpacity disabled={disable} onPress={open}>
      {renderTrigger ? (
        renderTrigger(selectItem)
      ) : (
        <View
          style={[
            Styles.justifyContent,
            triggerStyle?.container,
            Styles.justifyCenter,
          ]}
        >
          <Text style={[styles.itemLabel, triggerStyle?.itemLabel]}>
            {selectItem?.label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
