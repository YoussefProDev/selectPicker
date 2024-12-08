import { View, Text, TouchableOpacity } from 'react-native';
import { getPickerStyles } from '../styles';
import type { SelectTriggerProps } from '../types';
import { useMemo } from 'react';

export const PickerTrigger = ({
  open,
  selectedItem,
  triggerStyle,
  renderTrigger,
  disable,
  darkMode,
}: SelectTriggerProps) => {
  const styles = useMemo(() => getPickerStyles(darkMode), [darkMode]);

  return (
    <TouchableOpacity disabled={disable} onPress={open}>
      {renderTrigger ? (
        renderTrigger(selectedItem)
      ) : (
        <View style={[triggerStyle?.container, styles.justifyCenter]}>
          <Text style={[styles.itemLabel, triggerStyle?.itemLabel]}>
            {selectedItem?.label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
