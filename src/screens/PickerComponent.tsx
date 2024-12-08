import {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useMemo,
} from 'react';
import { View, Modal, useWindowDimensions } from 'react-native';
import { useDynamicAnimation } from 'moti';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { PickerTrigger, PickerModal, PickerModalSection } from '../components'; // Corretto
import { getPickerStyles } from '../styles';
import type { PickerRef, PickerProps, Item } from '../types'; // Corretto

export const Picker = forwardRef<PickerRef, PickerProps>(
  (
    {
      items = [],
      sections = [],
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
      renderSection,
      selectedItem,
    },
    ref
  ) => {
    // Stili dinamici
    const styles = useMemo(() => getPickerStyles(darkMode), [darkMode]);

    // Dimensioni finestra
    const { height: windowHeight } = useWindowDimensions();

    // Animazione dinamica per il Modal
    const modalAnimation = useDynamicAnimation(() => ({
      translateY: windowHeight, // Partenza fuori dalla vista
    }));

    // Stato per il modal visibile
    const [isModalVisible, setModalVisible] = useState(false);

    // Funzione per aprire il picker
    const openPicker = useCallback(() => {
      setModalVisible(true);
      modalAnimation.animateTo((current) => {
        const targetTranslateY = pageStyle === 'Modal' ? windowHeight * 0.1 : 0;
        return { ...current, translateY: targetTranslateY };
      });
      onOpen?.();
    }, [modalAnimation, onOpen, windowHeight, pageStyle]);

    // Funzione per chiudere il picker
    const closePicker = useCallback(() => {
      modalAnimation.animateTo({ translateY: windowHeight });
      setModalVisible(false);
      onClose?.();
    }, [modalAnimation, onClose, windowHeight]);

    // Espone le funzioni open e close all'esterno tramite la ref
    useImperativeHandle(ref, () => ({ open: openPicker, close: closePicker }), [
      openPicker,
      closePicker,
    ]);
    if (selectedItem === null) {
      const defaultItem = {
        key: 'None',
        label: 'Empty Data',
        value: 'Empty Data',
      };

      // Check for the first item in `items` or `sections`
      selectedItem = items[0] || sections[0]?.items[0] || defaultItem;
    }

    // Gestione della selezione di un item
    const handleItemSelect = useCallback(
      (item: Item) => {
        onSelectItem?.(item); // Passa la selezione al genitore
        closePicker(); // Chiudi il modal dopo la selezione
      },
      [closePicker, onSelectItem]
    );

    // Configurazione della gesture per il Modal
    const gesture = Gesture.Fling()
      .direction(Directions.DOWN)
      .onEnd(() => closePicker())
      .runOnJS(true);

    const isSectioned = Array.isArray(sections) && sections.length > 0;

    return (
      <View>
        {/* Trigger per aprire il picker */}
        <PickerTrigger
          open={openPicker}
          selectedItem={selectedItem} // Mostra l'item selezionato
          triggerStyle={triggerStyle}
          renderTrigger={renderTrigger}
          disable={disable}
        />

        {/* Modal che contiene il picker */}
        <Modal
          visible={isModalVisible}
          onRequestClose={closePicker}
          animationType="slide"
          transparent
        >
          <GestureDetector gesture={gesture}>
            <View
              style={[
                pageStyle === 'Modal' ? styles.modalView : styles.fullPageView,
              ]}
              accessible
              accessibilityLabel="Picker modal"
            >
              {isSectioned ? (
                <PickerModalSection
                  selectedItem={selectedItem}
                  sections={sections}
                  onSelectItem={handleItemSelect}
                  close={closePicker}
                  title={title}
                  searchPlaceholder={searchPlaceholder}
                  textEmpty={textEmpty}
                  darkMode={darkMode}
                  modalStyle={modalStyle}
                  showCloseButton={showCloseButton}
                  showModalTitle={showModalTitle}
                  renderItem={renderItem}
                  pageStyle={pageStyle}
                  renderSectionItem={renderSection}
                  modalAnimation={modalAnimation}
                />
              ) : (
                <PickerModal
                  selectedItem={selectedItem}
                  items={items}
                  onSelectItem={handleItemSelect}
                  close={closePicker}
                  title={title}
                  searchPlaceholder={searchPlaceholder}
                  textEmpty={textEmpty}
                  darkMode={darkMode}
                  modalStyle={modalStyle}
                  showCloseButton={showCloseButton}
                  showModalTitle={showModalTitle}
                  renderItem={renderItem}
                  modalAnimation={modalAnimation}
                  pageStyle={pageStyle}
                />
              )}
            </View>
          </GestureDetector>
        </Modal>
      </View>
    );
  }
);
