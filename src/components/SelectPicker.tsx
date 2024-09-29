import { useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { View, Modal, useWindowDimensions } from 'react-native';
import { SelectModal } from './SelectModal';
import { SelectTrigger } from './SelectTrigger';
import type { ItemType, SelectPickerProps, SelectPickerRef } from '../types';
import { useDynamicAnimation } from 'moti';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

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
      modalAnimation.animateTo({ translateY: window.height });

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
    const gesture = Gesture.Fling()
      .direction(Directions.DOWN)
      .onStart(close)
      .runOnJS(true);

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
          <GestureDetector gesture={gesture}>
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
          </GestureDetector>
        </Modal>
      </View>
    );
  }
);
