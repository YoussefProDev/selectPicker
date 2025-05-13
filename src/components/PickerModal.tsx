import { useEffect, useMemo, useRef, useState, type FC } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  TextInput,
  Text,
  View,
} from 'react-native';

import Fuse from 'fuse.js';
import { getPickerStyles } from '../styles';
import type { PickerModalProps, Item } from '../types';
import { getNestedKeys, type NestedKeys } from '../utility';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

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

  showSearch,
  CloseButton,
}) => {
  const [search, setSearch] = useState('');
  const [itemsList, setItemsList] = useState<Item[]>(items);

  const _flashListRef = useRef<KeyboardAwareFlatList | null>(null);

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
          isLastItem && [styles.lastItem, modalStyle?.lastitemStyle],
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
        _flashListRef.current.scrollToPosition(0, 0, true);
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
    <>
      <View style={styles.header}>
        {showModalTitle && (
          <Text style={[styles.titleModal, modalStyle?.titleStyle]}>
            {title}
          </Text>
        )}
        {showCloseButton && (
          <TouchableOpacity
            onPress={() => close()}
            style={
              CloseButton
                ? {}
                : [styles.searchClose, modalStyle?.closebuttonStyle]
            }
          >
            {CloseButton ? (
              CloseButton
            ) : (
              <Text style={styles.btnClose}>✖️</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
      {showSearch && (
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
      )}

      <KeyboardAwareFlatList
        keyboardShouldPersistTaps="handled"
        ref={_flashListRef}
        showsVerticalScrollIndicator={false}
        data={itemsList}
        renderItem={renderItemTemplate}
        keyExtractor={(item) => item.key}
        ListEmptyComponent={emptyItem}
        style={[styles.listContainer, modalStyle?.listStyle]}
        nestedScrollEnabled={true}
      />
    </>
  );
};
