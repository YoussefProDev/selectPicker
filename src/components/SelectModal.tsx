import { type FC, useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import Fuse from 'fuse.js';
import { Colors, Styles, getStyles } from '../styles';
import type { SelectModalProps, ItemType } from '../types';
import { FlashList } from '@shopify/flash-list';
export const SelectModal: FC<SelectModalProps> = ({
  items,
  renderItem,
  onSelectItem,
  title = 'Select',
  searchPlaceholder = 'Search',
  textEmpty = 'Empty data',
  setVisible,
  darkMode = false,
  modalStyle,
  showCloseButton = true,
  showModalTitle = true,
}) => {
  const [search, setSearch] = useState('');
  const [itemsList, setItemsList] = useState<ItemType[]>(items);

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
    itemsList.map((item) => item),
    options
  );

  const onSelect = (item: ItemType) => {
    setSearch('');
    handleFilterChange('');
    StatusBar.setHidden(false);
    if (onSelectItem) onSelectItem(item);
    setVisible(false);
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
            <Text style={[styles.itemLabel, modalStyle?.itemStyle]}>
              {item.label}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // const renderItem = ({ item, index }: { item: ItemType; index: number }) => {
  //   const isLastItem = itemsList.length - 1 === index;
  //   return (
  //     <TouchableOpacity
  //       style={{ marginBottom: isLastItem ? 80 : 0 }}
  //       onPress={() => onSelect(item)}
  //     >
  //       {renderItem ? renderItem(item) : renderItemTemplate(item)}
  //     </TouchableOpacity>
  //   );
  // };

  const handleFilterChange = (value: string) => {
    setSearch(value);

    let listDataFilter: ItemType[] = [];
    if (value === '') {
      listDataFilter = itemsList;
    } else {
      const filteredItems = fuse.search(value);

      if (_flashListRef.current)
        _flashListRef.current.scrollToOffset({ offset: 0 });
      filteredItems.forEach((n) => {
        const item = itemsList.filter((i) => i.key === n.item.key);
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
    <View style={[styles.container, modalStyle?.container]}>
      <View style={styles.header}>
        {showModalTitle && (
          <Text style={[styles.titleModal, modalStyle?.titleStyle]}>
            {title}
          </Text>
        )}
        {showCloseButton && (
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
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
        style={[styles.listContainer, Styles.container, modalStyle?.listStyle]}
      >
        <FlashList
          keyboardShouldPersistTaps={'handled'}
          ref={(ref) => (_flashListRef.current = ref)}
          data={itemsList}
          renderItem={renderItemTemplate}
          keyExtractor={(item) => item.key}
          ListEmptyComponent={emptyItem}
          estimatedItemSize={17}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
