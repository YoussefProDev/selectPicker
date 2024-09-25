import { useState, useEffect, type FC, useMemo } from 'react';
import { View, Modal } from 'react-native';
import { SelectTrigger, SelectModal } from '../components';
import type { ItemType, SelectPickerProps } from '../types';

export const SelectPicker: FC<SelectPickerProps> = ({
  items,
  onSelectItem,
  darkMode = false,
  renderTrigger,
  renderItem,
  selectPickerRef,
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
}) => {
  const [selectItem, setSelectItem] = useState<ItemType | undefined>(items[0]);
  const [visible, setVisible] = useState(false);

  const pickerRef = useMemo(
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

  useEffect(() => {
    selectPickerRef?.(pickerRef);
  }, [selectPickerRef, pickerRef]);

  const onSelect = (item: ItemType) => {
    onSelectItem?.(item);
    setSelectItem(item);
  };

  return (
    <View>
      <SelectTrigger
        open={pickerRef.open}
        selectItem={selectItem}
        triggerStyle={triggerStyle}
        renderTrigger={renderTrigger}
        disable={disable}
      />

      <Modal visible={visible} onRequestClose={pickerRef.close}>
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
};
