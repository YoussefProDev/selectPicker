import { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { View, Modal } from 'react-native';
import { SelectTrigger, SelectModal } from '../components';
import type { ItemType, SelectPickerProps, SelectPickerRef } from '../types';

export const SelectPicker = forwardRef<SelectPickerRef, SelectPickerProps>(
  (
    {
      items,
      onSelectItem,
      darkMode = false,
      renderTrigger,
      renderItem,
      disable = false,
      onOpen,
      onClose,

      triggerStyle,
      modalStyle,

      title,
      searchPlaceholder,
      textEmpty,
      showCloseButton = true,
      showModalTitle = true,
    },
    ref
  ) => {
    // const items = Object.values(dataCurrency);

    const [selectItem, setSelectItem] = useState<ItemType | undefined>(
      items[0]
    );
    const [visible, setVisible] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setVisible(true);

          onOpen?.();
        },
        close: () => {
          setVisible(false);

          onClose?.();
        },
      }),
      [onClose, onOpen]
    );
    const onSelect = (item: ItemType) => {
      onSelectItem?.(item);
      setSelectItem(item);
    };
    const selectRef = useRef<SelectPickerRef>(null);

    return (
      <View>
        <SelectTrigger
          open={selectRef.current?.open}
          selectItem={selectItem}
          triggerStyle={triggerStyle}
          renderTrigger={renderTrigger}
          disable={disable}
        />

        <Modal visible={visible} onRequestClose={selectRef.current?.close}>
          <SelectModal
            items={items}
            onSelectItem={(item: ItemType) => {
              onSelect(item);
            }}
            setVisible={(value: boolean) => {
              setVisible(value);
              onClose && onClose();
            }}
            title={title}
            searchPlaceholder={searchPlaceholder}
            textEmpty={textEmpty}
            darkMode={darkMode}
            modalStyle={modalStyle}
            showCloseButton={showCloseButton}
            showModalTitle={showModalTitle}
            renderItem={renderItem}
          />
        </Modal>
      </View>
    );
  }
);
