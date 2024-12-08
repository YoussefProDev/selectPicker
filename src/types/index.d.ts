import { PickerComponent } from '../index';
import {
  Item,
  ModalStyle,
  PickerModalProps,
  PickerModalSectionProps,
  PickerProps,
  PickerRef,
  Section,
  SelectTriggerProps,
  TriggerStyle,
} from './types';

declare module 'select-picker' {
  // Esportazione dei componenti e tipi dal modulo 'select-picker'
  export {
    PickerComponent,
    Item,
    ModalStyle,
    PickerModalProps,
    PickerModalSectionProps,
    PickerProps,
    PickerRef,
    Section,
    SelectTriggerProps,
    TriggerStyle,
  };
}
