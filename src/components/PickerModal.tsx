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
import { getPickerStyles } from '../styles';
import type { PickerModalProps, Item } from '../types';
import { FlashList } from '@shopify/flash-list';

export const PickerModal: FC<PickerModalProps> = ({
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
selectedItem,
  close,
  modalAnimation,
}) => {
  const [search, setSearch] = useState('');
  const [itemsList, setItemsList] = useState<Item[]>(items);

  const _flashListRef = useRef<FlashList<Item> | null>(null);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      setSearch('');
    };
  }, []);

  const styles = getPickerStyles(darkMode);

  const options: any = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['label', 'key', 'data'],
    id: 'key',
  };

  const fuse = new Fuse<Item>(items, options);

  const onSelect = (item: Item) => {
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
    item: Item;
    index: number;
  }) => {
    const isLastItem = index === itemsList.length - 1;
    return (
      <TouchableOpacity
        style={[
          isLastItem && styles.lastItem,
          item.key === selectedItem?.key && styles.selectedItem,
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

    let listDataFilter: Item[] = [];

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
          styles.modalBorders,
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
