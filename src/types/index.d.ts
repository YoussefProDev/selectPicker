import { PickerList, PickerSectionList } from '../index';
import {
  ItemType,
  SelectModalProps,
  PickerListProps,
  PickerListRef,
  SelectTriggerProps,
  SectionType,
  ModalStyle,
  PickerSectionListProps,
  RenderItem,
  SelectModalSectionProps,
  TriggerStyle,
} from './types';
declare module 'select-picker' {
  // Esportazione della classe PickerListComponent
  // export class PickerList extends React.Component<PickerListProps> {}
  export {
    PickerList,
    PickerSectionList,
    ItemType,
    SelectModalProps,
    PickerListProps,
    PickerListRef,
    SelectTriggerProps,
    SectionType,
    ModalStyle,
    PickerSectionListProps,
    RenderItem,
    SelectModalSectionProps,
    TriggerStyle,
  };
}
