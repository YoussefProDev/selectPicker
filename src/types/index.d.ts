import { SelectPickerComponent } from '../index';
import * as types from './types';
declare module 'select-picker' {
  export { types };
  // Esportazione della classe SelectPickerComponent
  // export class CurrencyPicker extends React.Component<SelectPickerProps> {}
  export { SelectPickerComponent };
}
