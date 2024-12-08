import { forwardRef } from "react";
import type { PickerProps, PickerRef } from "./types";
import { Picker } from "./screens";

const DEFAULT_OPTIONS:PickerProps = {
  onSelectItem: () => {},
  darkMode: false,
  selectedItem:{
    key:"None",
    label:"Empty Data",
    value:"Empty Data"
  }
  
};
export const PickerComponent = forwardRef<PickerRef, PickerProps>(
  (props, ref) => {
    const propsModel = {
      ...DEFAULT_OPTIONS,
      ...props,
    };

    return <Picker ref={ref} {...propsModel} />;
  }
);