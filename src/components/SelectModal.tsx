import { type FC, useEffect, useMemo, useRef, useState } from 'react';
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
import { Colors, Styles, getStyles } from '../styles';
import type { SelectModalProps, ItemType, Items, SectionType } from '../types';
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
  pageStyle,
}) => {
  const [search, setSearch] = useState('');
  const [itemsList, setItemsList] = useState<Items>(items);
  const isSection = useMemo(() => {
    if (items instanceof SectionType) return true;
    return false;
  });
  let _flashListRef = useRef<FlashList<ItemType> | null>();

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      setSearch('');
    };
  }, []);

  const styles = getStyles(darkMode);

  const options = Object.assign({
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['label', 'key', 'data'],
    id: 'key',
  });

  const fuse = new Fuse<ItemType>(
    items.map((item) => item),
    options
  );

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
    const isLastItem = itemsList.length - 1 === index;
    return (
      <TouchableOpacity
        style={isLastItem ? Styles.lastItem : null}
        onPress={() => onSelect(item)}
      >
        {renderItem ? (
          renderItem(item)
        ) : (
          <View style={[styles.item, modalStyle?.container]}>
            <Text
              style={[
                styles.itemLabel,
                modalStyle?.itemStyle,
                item.key === selectItem?.key ? styles.selectedItem : null,
              ]}
            >
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

      if (_flashListRef.current)
        _flashListRef.current.scrollToOffset({ offset: 0 });
      filteredItems.forEach((n) => {
        const item = items.filter((i) => i.key === n.item.key);
        if (item.length > 0 && item?.[0]) listDataFilter.push(item[0]);
      });
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
        transition={{ duration: 500, type: 'timing' }}
        state={modalAnimation}
        style={[
          styles.container,
          pageStyle === 'Modal' ? Styles.modalView : {},
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
              onPress={() => {
                close();
                setSearch('');
                handleFilterChange('');
                StatusBar.setHidden(false);
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
              onChangeText={(text) => handleFilterChange(text)}
              value={search}
              placeholder={searchPlaceholder}
              placeholderTextColor={Colors.textFieldColor}
              style={[styles.textSearch, styles.textInput]}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={[
            styles.listContainer,
            Styles.container,
            modalStyle?.listStyle,
          ]}
        >
          {isSection ? (
            <Text>Section</Text>
          ) : (
            <FlashList
              keyboardShouldPersistTaps={'handled'}
              ref={(ref) => (_flashListRef.current = ref)}
              data={itemsList}
              renderItem={renderItemTemplate}
              keyExtractor={(item) => item.key}
              ListEmptyComponent={emptyItem}
              estimatedItemSize={17}
            />
          )}
        </KeyboardAvoidingView>
      </MotiView>
    </AnimatePresence>
  );
};
