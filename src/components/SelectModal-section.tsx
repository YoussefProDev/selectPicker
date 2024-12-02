import { useEffect, useRef, useState, useMemo, type FC } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  TextInput,
  Text,
  KeyboardAvoidingView,
  View,
  FlatList,
} from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import Fuse from 'fuse.js';
import { getStyles } from '../styles';
import { FlashList } from '@shopify/flash-list';
import type { ItemType, SectionType, SelectModalSectionProps } from '../types';

export const SelectModalSection: FC<SelectModalSectionProps> = ({
  sections,
  renderItem,
  onSelectItem,
  title = 'Select',
  searchPlaceholder = 'Search',
  textEmpty = 'No data available',
  darkMode = false,
  modalStyle,
  showCloseButton = true,
  showModalTitle = true,
  selectItem,
  close,
  modalAnimation,
  renderSectionItem,
}) => {
  if (!sections[0]) return;
  // Stati iniziali
  const [search, setSearch] = useState('');
  const [sectionSelect, setSectionSelect] = useState<SectionType>(
    sections.find((section) =>
      section.items.some((item) => item.key === selectItem?.key)
    ) ?? sections[0]
  );
  const [itemsList, setItemsList] = useState<ItemType[]>(
    sectionSelect?.items ?? []
  );
  const [selectedSection, setSelectedSection] = useState<string>(
    sectionSelect.sectionName
  );

  const styles = useMemo(() => getStyles(darkMode), [darkMode]);
  const sectionListRef = useRef<FlatList<SectionType>>(null);
  const flashListRef = useRef<FlashList<ItemType>>(null);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
      setSearch('');
    };
  }, []);

  // Configurazione di Fuse.js per la ricerca
  const fuse = useMemo(
    () =>
      new Fuse<ItemType>(
        sections.flatMap((section) => section.items),
        {
          shouldSort: true,
          threshold: 0.6,
          keys: ['key', 'label', 'data'],
        }
      ),
    [sections]
  );

  // Filtraggio degli elementi
  const handleFilterChange = (value: string) => {
    setSearch(value);
    const filteredItems =
      value === ''
        ? sectionSelect.items
        : fuse.search(value).map((result) => result.item);
    setItemsList(filteredItems);
    flashListRef.current?.scrollToOffset({ offset: 0 });
  };

  // Selezione di un elemento
  const onSelect = (item: ItemType) => {
    onSelectItem?.(item);
    close();
  };

  // Selezione di una sezione
  const handleSectionSelect = (item: SectionType) => {
    setSectionSelect(item);
    setItemsList(item.items);
    setSelectedSection(item.sectionName);
  };

  // Componenti di rendering separati
  const renderSectionTemplate = ({ item }: { item: SectionType }) => (
    <TouchableOpacity
      style={[
        styles.section,
        item.sectionName === selectedSection && styles.selectedSectionItem,
      ]}
      onPress={() => handleSectionSelect(item)}
      accessibilityLabel={`Section ${item.sectionName}`}
      accessibilityHint="Tap to filter items by this section"
    >
      {renderSectionItem ? (
        renderSectionItem(item)
      ) : (
        <Text style={[styles.itemLabel, modalStyle?.itemStyle]}>
          {item.sectionName}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderItemTemplate = ({
    item,
    index,
  }: {
    item: ItemType;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        index === itemsList.length - 1 && styles.lastItem,
        item.key === selectItem?.key && styles.selectedItem,
      ]}
      onPress={() => onSelect(item)}
      accessibilityLabel={`Item ${item.label}`}
      accessibilityHint="Tap to select this item"
    >
      {renderItem ? (
        renderItem(item)
      ) : (
        <View style={[styles.item, modalStyle?.container]}>
          <Text style={[styles.itemLabel, modalStyle?.itemStyle]}>
            {item.label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Componente lista vuota
  const emptyItem = () => (
    <View style={styles.listNullContainer}>
      <Text style={styles.txtEmpty}>{textEmpty}</Text>
    </View>
  );

  // Componente principale
  return (
    <AnimatePresence>
      <MotiView
        state={modalAnimation}
        transition={{ type: 'timing' }}
        style={[styles.container, modalStyle?.container, styles.modalBorders]}
      >
        {/* Header */}
        <View style={styles.header}>
          {showModalTitle && (
            <Text style={[styles.titleModal, modalStyle?.titleStyle]}>
              {title}
            </Text>
          )}
          {showCloseButton && (
            <TouchableOpacity
              onPress={close}
              style={styles.searchClose}
              accessibilityLabel="Close"
            >
              <Text style={styles.btnClose}>✖️</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Search Bar */}
        <View style={styles.search}>
          <View style={[styles.textInputContainer, modalStyle?.searchStyle]}>
            <TextInput
              onChangeText={handleFilterChange}
              value={search}
              placeholder={searchPlaceholder}
              placeholderTextColor={styles.textSearch.color}
              style={[styles.textSearch, styles.textInput]}
            />
          </View>
        </View>

        {/* Lista Sezioni e Items */}
        <KeyboardAvoidingView
          behavior="padding"
          style={[styles.listContainer, modalStyle?.listStyle]}
        >
          {/* FlatList per Sezioni */}
          <View style={styles.selectedSectionContainer}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              ref={sectionListRef}
              renderItem={renderSectionTemplate}
              data={sections}
              keyExtractor={(section) => section.sectionName}
              ListEmptyComponent={emptyItem}
              horizontal
            />
          </View>

          {/* FlashList per Items */}
          <FlashList
            keyboardShouldPersistTaps="handled"
            ref={flashListRef}
            data={itemsList}
            renderItem={renderItemTemplate}
            keyExtractor={(item) => item.key}
            ListEmptyComponent={emptyItem}
            estimatedItemSize={50}
          />
        </KeyboardAvoidingView>
      </MotiView>
    </AnimatePresence>
  );
};
