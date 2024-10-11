import { SelectPickerComponent } from '../index';
import {
  ItemType,
  SelectModalProps,
  SelectPickerProps,
  SelectPickerRef,
  SelectTriggerProps,
  Items,
  SectionType,
} from './types';
declare module 'select-picker' {
  // Esportazione della classe SelectPickerComponent
  // export class SelectPicker extends React.Component<SelectPickerProps> {}
  export {
    SelectPickerComponent,
    ItemType,
    SelectModalProps,
    SelectPickerProps,
    SelectPickerRef,
    SelectTriggerProps,
    Items,
    SectionType,
  };
}
