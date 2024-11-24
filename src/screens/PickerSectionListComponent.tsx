import {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useMemo,
} from 'react';
import { View, Modal, useWindowDimensions } from 'react-native';
import type { ItemType, PickerListRef, PickerSectionListProps } from '../types';
import { useDynamicAnimation } from 'moti';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { SelectTrigger } from '../components';
import { SelectModalSection } from '../components/SelectModal-section';
import { getStyles } from '../styles';

export const PickerSectionListComponent = forwardRef<
  PickerListRef, // Tipo del ref
  PickerSectionListProps // Tipo delle props
>(
  (
    {
      sections,
      onSelectItem,
      darkMode = false,
      renderTrigger,
      renderItem,
      disable = false,
      onOpen,
      onClose,
      triggerStyle, // TriggerStyle può essere undefined o un oggetto con le proprietà opzionali
      modalStyle,
      title,
      searchPlaceholder,
      textEmpty,
      showCloseButton = true,
      showModalTitle = true,
      pageStyle = 'FullPage', // Valore di default per pageStyle
    },
    ref
  ) => {
    const styles = useMemo(() => getStyles(darkMode), [darkMode]);
    const [selectItem, setSelectItem] = useState<ItemType | null>(
      sections[0]?.items[0] ?? null
    );
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
      [open, close]
    );

    const onSelect = (item: ItemType) => {
      onSelectItem?.(item);
      setSelectItem(item);
    };

    // Gestione del gesto per chiudere il modale con swipe
    const gesture = Gesture.Fling()
      .direction(Directions.DOWN)
      .onEnd(close)
      .runOnJS(true);

    return (
      <View>
        <SelectTrigger
          open={open}
          selectItem={selectItem}
          triggerStyle={triggerStyle || {}} // Assicurati che triggerStyle sia sempre un oggetto, anche se undefined
          renderTrigger={renderTrigger}
          disable={disable}
        />

        <Modal
          visible={visible}
          onRequestClose={close}
          style={[pageStyle === 'Modal' ? styles.modalView : {}]}
        >
          <GestureDetector gesture={gesture}>
            <SelectModalSection
              selectItem={selectItem}
              sections={sections}
              onSelectItem={onSelect}
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
              pageStyle={pageStyle} // Uso del valore di default se non specificato
            />
          </GestureDetector>
        </Modal>
      </View>
    );
  }
);
