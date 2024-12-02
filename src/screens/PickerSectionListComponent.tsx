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
  PickerListRef,
  PickerSectionListProps
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
      triggerStyle,
      modalStyle,
      title,
      searchPlaceholder,
      textEmpty,
      showCloseButton = true,
      showModalTitle = true,
      pageStyle = 'FullPage',
      // selectedSection,
      selectedItem: chosenItem,
    },
    ref
  ) => {
    // Stili dinamici
    const styles = useMemo(() => getStyles(darkMode), [darkMode]);

    // Dimensioni finestra
    const { height: windowHeight } = useWindowDimensions();

    // Animazione dinamica per il Modal
    const modalAnimation = useDynamicAnimation(() => ({
      translateY: windowHeight, // Partenza fuori dalla vista
    }));

    // Gestione dello stato per il modal visibile e l'elemento selezionato
    // const [selectedItem, setSelectedItem] = useState<ItemType>(chosenItem);
    // console.log('chose:', chosenItem);
    // console.log('select:', selectedItem);
    // const [selectedItem, setSelectedItem] = useState<ItemType | null>(
    //   selectedSection?.items[0] || choseditem || sections[0]?.items[0] || null
    // );
    const [isVisible, setIsVisible] = useState(false);

    // Funzione per aprire il picker
    const open = useCallback(() => {
      setIsVisible(true);
      modalAnimation.animateTo((current) => {
        const targetTranslateY = pageStyle === 'Modal' ? windowHeight * 0.1 : 0;
        return { ...current, translateY: targetTranslateY };
      });
      onOpen?.();
    }, [modalAnimation, onOpen, windowHeight, pageStyle]);

    // Funzione per chiudere il picker
    const close = useCallback(() => {
      modalAnimation.animateTo({ translateY: windowHeight });
      setIsVisible(false);
      onClose?.();
    }, [modalAnimation, onClose, windowHeight]);

    // Espone le funzioni open e close all'esterno tramite la ref
    useImperativeHandle(ref, () => ({ open, close }), [open, close]);

    // Gestione della selezione di un elemento
    const handleSelect = useCallback(
      (item: ItemType) => {
        // setSelectedItem(item); // Aggiorna il selectedItem localmente
        onSelectItem?.(item); // Passa la selezione al genitore
        close(); // Chiudi il modal dopo la selezione
      },
      [close, onSelectItem]
    );

    // Configurazione della gesture per il Modal
    const gesture = Gesture.Fling()
      .direction(Directions.DOWN)
      .onEnd(() => close())
      .runOnJS(true);

    return (
      <View>
        {/* Trigger per aprire il picker */}
        <SelectTrigger
          open={open}
          selectItem={chosenItem} // Mostra l'item selezionato
          triggerStyle={triggerStyle || {}}
          renderTrigger={renderTrigger}
          disable={disable}
        />

        {/* Modal che contiene il picker */}
        <Modal
          visible={isVisible}
          onRequestClose={close}
          animationType="slide"
          transparent
        >
          <GestureDetector gesture={gesture}>
            <View
              style={[
                pageStyle === 'Modal'
                  ? [styles.modalView]
                  : styles.fullPageView,
              ]}
              accessible
              accessibilityLabel="Picker modal"
            >
              <SelectModalSection
                selectItem={chosenItem} // Passa l'item selezionato al Modal
                sections={sections}
                onSelectItem={handleSelect} // Gestisce la selezione
                close={close}
                title={title}
                searchPlaceholder={searchPlaceholder}
                textEmpty={textEmpty}
                darkMode={darkMode}
                modalStyle={modalStyle}
                showCloseButton={showCloseButton}
                showModalTitle={showModalTitle}
                renderItem={renderItem}
                pageStyle={pageStyle}
                modalAnimation={modalAnimation}
              />
            </View>
          </GestureDetector>
        </Modal>
      </View>
    );
  }
);
