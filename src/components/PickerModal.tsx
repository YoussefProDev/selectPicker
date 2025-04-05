import { useEffect, useMemo, useRef, useState, type FC } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  TextInput,
  Text,
  KeyboardAvoidingView,
  View,
  Platform,
} from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import Fuse from 'fuse.js';
import { getPickerStyles } from '../styles';
import type { PickerModalProps, Item } from '../types';
import { getNestedKeys, type NestedKeys } from '../utility';
import { FlatList } from 'react-native-gesture-handler';

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
  pageStyle,
}) => {
  const [search, setSearch] = useState('');
  const [itemsList, setItemsList] = useState<Item[]>(items);

  const _flashListRef = useRef<FlatList<Item> | null>(null);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      setSearch('');
    };
  }, []);

  const styles = getPickerStyles(darkMode);

  const fuse = useMemo(() => {
    const keys = getNestedKeys(items[0]) as NestedKeys<Item>[];

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

    return new Fuse<Item>(items, options);
  }, [items]); // Le dipendenze sono solo 'sections' perché 'options' dipende da 'keys' che sono calcolati dentro

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
          <View style={[styles.item, modalStyle?.itemContainer]}>
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
          pageStyle === 'Modal' && styles.modalBorders,
          ,
          modalStyle?.container,
        ]}
        pointerEvents="box-none"
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
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.listContainer, modalStyle?.listStyle]}
        >
          <FlatList
            keyboardShouldPersistTaps="handled"
            ref={_flashListRef}
            data={itemsList}
            renderItem={renderItemTemplate}
            keyExtractor={(item) => item.key}
            ListEmptyComponent={emptyItem}

            // contentContainerStyle={{ paddingBottom: 60 }}
          />
        </KeyboardAvoidingView>
      </MotiView>
    </AnimatePresence>
  );
};
