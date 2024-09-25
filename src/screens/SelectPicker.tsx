import { useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { View, Modal, useWindowDimensions } from 'react-native';
import { SelectTrigger, SelectModal } from '../components';
import type { ItemType, SelectPickerProps, SelectPickerRef } from '../types';
import { useDynamicAnimation } from 'moti';

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
    const [selectItem, setSelectItem] = useState<ItemType | undefined>(
      items[0]
    );
    const window = useWindowDimensions();
    const modalAnimation = useDynamicAnimation(() => ({
      translateY: window.height,
    }));
    // initial: { translateY: window.height },
    // open: { translateY: 0 },
    // close: { translateY: -window.height },
    const [visible, setVisible] = useState(false);
    const open = useCallback(() => {
      setVisible(true);
      modalAnimation.animateTo((current) => {
        if (current.translateY !== window.height) {
          return { translateY: window.height };
        } else {
          return { translateY: 0 };
        }
      });
      onOpen?.();
    }, [onOpen, setVisible, modalAnimation, window]);
    const close = useCallback(() => {
      setTimeout(() => {
        setVisible(false);
      }, 400);
      modalAnimation.animateTo((current) => {
        if (current.translateY !== 0) {
          return { translateY: 0 };
        } else {
          return { translateY: window.height };
        }
      });

      onClose?.();
    }, [onClose, setVisible, modalAnimation, window]);
    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
      }),
      [close, open]
    );
    const onSelect = (item: ItemType) => {
      onSelectItem?.(item);
      setSelectItem(item);
    };

    // const selectRef = useRef<SelectPickerRef>(ref);

    return (
      <View>
        <SelectTrigger
          open={open}
          selectItem={selectItem}
          triggerStyle={triggerStyle}
          renderTrigger={renderTrigger}
          disable={disable}
        />

        <Modal visible={visible} onRequestClose={close}>
          <SelectModal
            selectItem={selectItem}
            items={items}
            onSelectItem={(item: ItemType) => {
              onSelect(item);
            }}
            close={close}
            title={title}
            searchPlaceholder={searchPlaceholder}
            textEmpty={textEmpty}
            darkMode={darkMode}
            modalStyle={modalStyle}
            showCloseButton={showCloseButton}
            showModalTitle={showModalTitle}
            renderItem={renderItem}
            modalAnimation={modalAnimation}
          />
        </Modal>
      </View>
    );
  }
);
