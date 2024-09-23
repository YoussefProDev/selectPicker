import { type FC } from 'react';
import { CurrencyPicker } from './screens';
import { type SelectPickerProps } from './types';

const DEFAULT_OPTIONS = {
  onSelectCurrency: () => {},
  style: {},
  showFlag: true,
  showCurrencyName: true,
  darkMode: false,
};

export const CurrencyPickerComponent: FC<SelectPickerProps> = (
  props: SelectPickerProps
) => {
  const propsModel = {
    ...DEFAULT_OPTIONS,
    ...props,
  };

  return <CurrencyPicker {...propsModel} />;
};
