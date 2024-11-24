import {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useMemo,
} from 'react';
import { View, Modal, useWindowDimensions } from 'react-native';

import type { ItemType, PickerListProps, PickerListRef } from '../types';
import { useDynamicAnimation } from 'moti';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { SelectModal, SelectTrigger } from '../components';
import { getStyles } from '../styles';

export const PickerListComponent = forwardRef<PickerListRef, PickerListProps>(
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
      pageStyle,
    },
    ref
  ) => {
    // Assicurati che selectItem non sia undefined
    const [selectItem, setSelectItem] = useState<ItemType | null>(
      items[0] ? items[0] : null // Imposta a null se items è vuoto
    );
    const styles = useMemo(() => getStyles(darkMode), [darkMode]);
    const window = useWindowDimensions();
    const modalAnimation = useDynamicAnimation(() => ({
      translateY: window.height,
      duration: 300, // Durata dell'animazione in millisecondi
    }));

    const [visible, setVisible] = useState(false);
    const open = useCallback(() => {
      setVisible(true);
      modalAnimation.animateTo({ translateY: 0 }); // Sposta sempre verso l'alto
      onOpen?.();
    }, [onOpen, modalAnimation]);

    const close = useCallback(() => {
      modalAnimation.animateTo({ translateY: window.height });
      setTimeout(() => {
        setVisible(false); // Nascondi il modal dopo l'animazione
      }, 400); // Tempo uguale alla durata dell'animazione
      onClose?.();
    }, [onClose, modalAnimation, window]);

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
      .onEnd(close)
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

        <Modal
          visible={visible}
          onRequestClose={close}
          style={[pageStyle === 'Modal' ? styles.modalView : {}]}
        >
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
              pageStyle={pageStyle ?? 'FullPage'}
            />
          </GestureDetector>
        </Modal>
      </View>
    );
  }
);
