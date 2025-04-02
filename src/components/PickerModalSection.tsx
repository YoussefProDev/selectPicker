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
import { getPickerStyles } from '../styles';
import { FlashList } from '@shopify/flash-list';
import type { Item, Section, PickerModalSectionProps } from '../types';
import { getNestedKeys, type NestedKeys } from '../utility';

export const PickerModalSection: FC<PickerModalSectionProps> = ({
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
  selectedItem,
  close,
  modalAnimation,
  renderSectionItem,
}) => {
  const [search, setSearch] = useState('');
  // Definisci la sezione predefinita con "Empty Data"
  const defaultSection: Section<any> = {
    sectionName: 'Empty Data',
    items: [
      {
        key: 'empty',
        label: 'No items available',
        value: 'No items available',
      },
    ],
  };

  const [sectionSelect, setSectionSelect] = useState<Section>(
    sections.find((section) =>
      section.items.some((item) => item.key === selectedItem?.key)
    ) ??
      sections[0] ??
      defaultSection
  );
  const [itemsList, setItemsList] = useState<Item[]>(
    sectionSelect?.items ?? []
  );
  const [selectedSection, setSelectedSection] = useState<string>(
    sectionSelect.sectionName
  );

  const styles = useMemo(() => getPickerStyles(darkMode), [darkMode]);
  const sectionListRef = useRef<FlatList<Section>>(null);
  const flashListRef = useRef<FlashList<Item>>(null);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
      setSearch('');
    };
  }, []);

  const fuse = useMemo(() => {
    const keys = getNestedKeys(
      sections[0]?.items[0],
      'items'
    ) as NestedKeys<Item>[];

    const options: any = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['sectionName', ...keys.map((k) => `${k}`)],
      id: 'key',
    };

    return new Fuse<Section>(sections, options);
  }, [sections]); // Le dipendenze sono solo 'sections' perché 'options' dipende da 'keys' che sono calcolati dentro
  const itemFuse = useMemo(() => {
    const keys = getNestedKeys(sections[0]?.items[0]) as NestedKeys<Item>[];
    // console.log(...keys.map((k) => `${k}`));

    const options: any = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [...keys.map((k) => `${k}`)],
      id: 'key',
    };

    return new Fuse<Item>(
      sections.flatMap((section) => section.items),
      options
    );
  }, [sections]); // Le dipendenze sono solo 'sections' perché 'options' dipende da 'keys' che sono calcolati dentro

  const handleFilterChange = (value: string) => {
    setSearch(value);
    // Se la ricerca è vuota, mostra tutto
    if (value === '') {
      setSelectedSection(sectionSelect.sectionName);
      setItemsList(sectionSelect.items); // Reset degli items
      return;
    }

    // Esegui la ricerca con Fuse
    const searchResults = fuse.search(value);

    // Controlla se la ricerca ha trovato una sezione o un item
    const isSectionMatch = searchResults.some((result) =>
      result.item.sectionName.toLowerCase().includes(value.toLowerCase())
    );

    if (isSectionMatch) {
      // Se è una sezione che ha fatto match, mostra tutti gli item di quella sezione
      const matchedSection = searchResults.find((result) =>
        result.item.sectionName.toLowerCase().includes(value.toLowerCase())
      );
      if (matchedSection) {
        setSelectedSection(matchedSection.item.sectionName);
        setItemsList(matchedSection.item.items); // Mostra tutti gli item della sezione
      }
    } else {
      const filteredItems = itemFuse.search(value).map((result) => result.item);

      // Imposta lo stato con gli item da mostrare
      setItemsList(filteredItems);
    }

    // Reset della lista per scorrere in cima
    flashListRef.current?.scrollToOffset({ offset: 0 });
  };
  const onSelect = (item: Item) => {
    onSelectItem?.(item);
    close();
  };

  const handleSectionSelect = (item: Section) => {
    setSectionSelect(item);
    setItemsList(item.items);
    setSelectedSection(item.sectionName);
  };

  const renderSectionTemplate = ({ item }: { item: Section }) => (
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
    item: Item;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        index === itemsList.length - 1 && styles.lastItem,
        item.key === selectedItem?.key && styles.selectedItem,
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

  const emptyItem = () => (
    <View style={styles.listNullContainer}>
      <Text style={styles.txtEmpty}>{textEmpty}</Text>
    </View>
  );

  return (
    <AnimatePresence>
      <MotiView
        state={modalAnimation}
        transition={{ type: 'timing' }}
        style={[styles.container, modalStyle?.container, styles.modalBorders]}
      >
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

        <KeyboardAvoidingView
          behavior="padding"
          style={[styles.listContainer, modalStyle?.listStyle]}
        >
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
