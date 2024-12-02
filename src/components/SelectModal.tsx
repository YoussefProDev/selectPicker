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
import type { SelectModalProps, ItemType } from '../types';
import { FlashList } from '@shopify/flash-list';

export const SelectModal: FC<SelectModalProps> = ({
  items,
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
}) => {
  const [search, setSearch] = useState('');
  const [itemsList, setItemsList] = useState<ItemType[]>(items);

  const _flashListRef = useRef<FlashList<ItemType> | null>(null);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      setSearch('');
    };
  }, []);

  const styles = getStyles(darkMode);

  const options: any = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32, // Aggiungi qui il valore
    minMatchCharLength: 1,
    keys: ['label', 'key', 'data'],
    id: 'key',
  };

  const fuse = new Fuse<ItemType>(items, options);

  const onSelect = (item: ItemType) => {
    setSearch('');
    handleFilterChange('');
    StatusBar.setHidden(true);
    if (onSelectItem) onSelectItem(item);
    close();
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

  const handleFilterChange = (value: string) => {
    setSearch(value);

    let listDataFilter: ItemType[] = [];

    if (value === '') {
      listDataFilter = items;
    } else {
      const filteredItems = fuse.search(value);
      if (_flashListRef.current) {
        _flashListRef.current.scrollToOffset({ offset: 0 });
      }
      filteredItems.map((result) => listDataFilter.push(result.item));
    }

    setItemsList(listDataFilter);
  };

  const emptyItem = () => (
    <View style={styles.listNullContainer}>
      <Text style={styles.txtEmpty}>{textEmpty}</Text>
    </View>
  );

  return (
    <AnimatePresence>
      <MotiView
        transition={{ type: 'timing' }}
        state={modalAnimation}
        style={[
          styles.container,
          styles.modalBorders, // Modifica qui per usare modalView
          modalStyle?.container,
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
              onPress={() => close()}
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
              placeholderTextColor={styles.textSearch.color}
              style={[styles.textSearch, styles.textInput]}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={[styles.listContainer, modalStyle?.listStyle]}
        >
          <FlashList
            keyboardShouldPersistTaps="handled"
            ref={_flashListRef}
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
