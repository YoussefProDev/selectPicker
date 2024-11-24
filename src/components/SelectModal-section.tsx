import { useEffect, useRef, useState, type FC } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  TextInput,
  Text,
  KeyboardAvoidingView,
  View,
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
  textEmpty = 'Empty data',
  darkMode = false,
  modalStyle,
  showCloseButton = true,
  showModalTitle = true,
  selectItem,
  close,
  modalAnimation,
  pageStyle,
  renderSectionItem,
}) => {
  if (!sections[0]) return null;

  const [search, setSearch] = useState('');
  const [sectionSelect, setSectionSelect] = useState<SectionType>(sections[0]);
  const [itemsList, setItemsList] = useState<ItemType[]>([
    ...sectionSelect.items,
  ]);
  const [selectedSection, setSelectedSection] = useState<string>(
    sections[0]?.sectionName || ''
  );

  const styles = getStyles(darkMode);
  const sectionListRef = useRef<FlashList<SectionType> | null>(null);
  const flashListRef = useRef<FlashList<ItemType> | null>(null);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
      setSearch('');
    };
  }, []);

  const fuse = new Fuse<ItemType>(
    sections.flatMap((section) => section.items),
    {
      shouldSort: true,
      threshold: 0.6,
      keys: ['key', 'label', 'data'],
    }
  );

  const handleFilterChange = (value: string) => {
    setSearch(value);
    const filteredItems =
      value === ''
        ? [...sectionSelect.items]
        : fuse.search(value).map((result) => result.item);
    setItemsList(filteredItems);
    flashListRef.current?.scrollToOffset({ offset: 0 });
  };

  const onSelect = (item: ItemType) => {
    setSearch('');
    handleFilterChange('');
    onSelectItem?.(item);
    close();
  };

  const handleSectionSelect = (item: SectionType) => {
    setSectionSelect(item);
    setItemsList([...item.items]);
    setSelectedSection(item.sectionName);
  };

  const renderSectionTemplate = ({ item }: { item: SectionType }) => {
    return (
      <TouchableOpacity style={[]} onPress={() => handleSectionSelect(item)}>
        {renderSectionItem ? (
          renderSectionItem(item)
        ) : (
          // <View style={[styles.section, modalStyle?.container]}>
          <Text
            style={[
              styles.itemLabel,
              modalStyle?.itemStyle,
              item.sectionName === selectedSection &&
                styles.selectedSectionItem,
              ,
            ]}
          >
            {item.sectionName}
          </Text>
          // </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderItemTemplate = ({
    item,
    index,
  }: {
    item: ItemType;
    index: number;
  }) => {
    const isLastItem = index === itemsList.length - 1;
    return (
      <TouchableOpacity
        style={[
          isLastItem && styles.lastItem,
          item.key === selectItem?.key && styles.selectedItem,
        ]}
        onPress={() => onSelect(item)}
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
  };

  const emptyItem = () => (
    <View style={styles.listNullContainer}>
      <Text style={styles.txtEmpty}>{textEmpty}</Text>
    </View>
  );

  return (
    <AnimatePresence>
      <MotiView
        transition={{ duration: 500, type: 'timing' }}
        state={modalAnimation}
        style={[
          styles.container,
          modalStyle?.container,
          pageStyle === 'Modal' ? styles.modalView : null, // Modifica qui per usare modalView
        ]}
      >
        <View style={styles.header}>
          {showModalTitle && (
            <Text style={[styles.titleModal, modalStyle?.titleStyle]}>
              {title}
            </Text>
          )}
          {showCloseButton && (
            <TouchableOpacity
              onPress={() => {
                close();
                setSearch('');
                handleFilterChange('');
              }}
              style={styles.searchClose}
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
              placeholderTextColor={styles.fontDefault.color}
              style={[styles.textSearch, styles.textInput]}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={[styles.listContainer, modalStyle?.listStyle]}
        >
          <View style={{ marginBottom: 15 }}>
            <FlashList
              key={selectedSection}
              keyboardShouldPersistTaps="handled"
              ref={sectionListRef}
              renderItem={renderSectionTemplate}
              data={sections}
              keyExtractor={(section) => section.sectionName}
              ListEmptyComponent={emptyItem}
              estimatedItemSize={50}
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
