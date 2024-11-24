import { forwardRef } from 'react';

import {
  type PickerListProps,
  type PickerListRef,
  type PickerSectionListProps,
} from './types';
import { PickerListComponent, PickerSectionListComponent } from './screens';
const DEFAULT_OPTIONS = {
  onSelectItem: () => {},
  style: {},
  darkMode: false,
};

export const PickerList = forwardRef<PickerListRef, PickerListProps>(
  (props, ref) => {
    const propsModel = {
      ...DEFAULT_OPTIONS,
      ...props,
    };

    return <PickerListComponent ref={ref} {...propsModel} />;
  }
);

export const PickerSectionList = forwardRef<
  PickerListRef,
  PickerSectionListProps
>((props, ref) => {
  const propsModel = {
    ...DEFAULT_OPTIONS,
    ...props,
  };

  return <PickerSectionListComponent ref={ref} {...propsModel} />;
});
