import { forwardRef } from 'react';
import { SelectPicker } from './components';
import { type SelectPickerProps, type SelectPickerRef } from './types';
const DEFAULT_OPTIONS = {
  onSelectItem: () => {},
  style: {},
  darkMode: false,
};

export const SelectPickerComponent = forwardRef<
  SelectPickerRef,
  SelectPickerProps
>((props, ref) => {
  const propsModel = {
    ...DEFAULT_OPTIONS,
    ...props,
  };

  return <SelectPicker ref={ref} {...propsModel} />;
});
