import { type FC } from 'react';
import { SelectPicker } from './screens';
import { type SelectPickerProps } from './types';

const DEFAULT_OPTIONS = {
  onSelectCurrency: () => {},
  style: {},
  showFlag: true,
  showCurrencyName: true,
  darkMode: false,
};

export const SelectPickerComponent: FC<SelectPickerProps> = (
  props: SelectPickerProps
) => {
  const propsModel = {
    ...DEFAULT_OPTIONS,
    ...props,
  };

  return <SelectPicker {...propsModel} />;
};
