import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { conversionCategories, currencies } from '../constants/conversions';
import { ConversionUnit, Currency } from '../types';

const { width } = Dimensions.get('window');

type ConversionMode = 'units' | 'currency';

export const ConversionScreen: React.FC = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<ConversionMode>('units');
  const [selectedCategory, setSelectedCategory] = useState(conversionCategories[0]);
  const [fromUnit, setFromUnit] = useState<ConversionUnit>(conversionCategories[0].units[0]);
  const [toUnit, setToUnit] = useState<ConversionUnit>(conversionCategories[0].units[1]);
  const [fromCurrency, setFromCurrency] = useState<Currency>(currencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(currencies[1]);
  const [inputValue, setInputValue] = useState('1');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const convertedValue = useMemo(() => {
    const num = parseFloat(inputValue) || 0;
    if (mode === 'units') {
      const baseValue = num * fromUnit.toBase;
      const result = baseValue / toUnit.toBase;
      return result.toFixed(6).replace(/\.?0+$/, '');
    } else {
      const usdValue = num / fromCurrency.rate;
      const result = usdValue * toCurrency.rate;
      return result.toFixed(4).replace(/\.?0+$/, '');
    }
  }, [inputValue, fromUnit, toUnit, fromCurrency, toCurrency, mode]);

  const handleCategorySelect = useCallback((category: typeof selectedCategory) => {
    setSelectedCategory(category);
    setFromUnit(category.units[0]);
    setToUnit(category.units[1]);
    setShowCategoryPicker(false);
  }, []);

  const handleSwap = useCallback(() => {
    if (mode === 'units') {
      const temp = fromUnit;
      setFromUnit(toUnit);
      setToUnit(temp);
    } else {
      const temp = fromCurrency;
      setFromCurrency(toCurrency);
      setToCurrency(temp);
    }
    setInputValue(convertedValue);
  }, [fromUnit, toUnit, fromCurrency, toCurrency, mode, convertedValue]);

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return currencies;
    const query = searchQuery.toLowerCase();
    return currencies.filter(
      (c) =>
        c.code.toLowerCase().includes(query) ||
        c.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const renderUnitItem = (
    item: ConversionUnit,
    isFrom: boolean,
    onClose: () => void
  ) => {
    const isSelected = item.id === (isFrom ? fromUnit.id : toUnit.id);
    return (
      <TouchableOpacity
        style={[
          styles.pickerItem,
          {
            backgroundColor: isSelected
              ? theme.colors.surfaceSecondary
              : 'transparent',
            borderColor: theme.colors.border,
          },
        ]}
        onPress={() => {
          if (isFrom) setFromUnit(item);
          else setToUnit(item);
          onClose();
        }}
      >
        <Text style={[styles.pickerItemText, { color: theme.colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.pickerItemSymbol, { color: theme.colors.textSecondary }]}>
          {item.symbol}
        </Text>
        {isSelected && (
          <Ionicons
            name="checkmark-outline"
            size={20}
            color={theme.colors.primary}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderCurrencyItem = (
    item: Currency,
    isFrom: boolean,
    onClose: () => void
  ) => {
    const isSelected = item.code === (isFrom ? fromCurrency.code : toCurrency.code);
    return (
      <TouchableOpacity
        style={[
          styles.pickerItem,
          {
            backgroundColor: isSelected
              ? theme.colors.surfaceSecondary
              : 'transparent',
            borderColor: theme.colors.border,
          },
        ]}
        onPress={() => {
          if (isFrom) setFromCurrency(item);
          else setToCurrency(item);
          setSearchQuery('');
          onClose();
        }}
      >
        <Text style={[styles.pickerItemText, { color: theme.colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.pickerItemSymbol, { color: theme.colors.textSecondary }]}>
          {`${item.code} (${item.symbol})`}
        </Text>
        {isSelected && (
          <Ionicons
            name="checkmark-outline"
            size={20}
            color={theme.colors.primary}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderUnitPicker = (
    isFrom: boolean,
    visible: boolean,
    onClose: () => void
  ) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              {isFrom ? 'De' : 'Vers'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close-outline"
                size={28}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
          {mode === 'units' ? (
            <FlatList
              data={selectedCategory.units}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderUnitItem(item, isFrom, onClose)}
            />
          ) : (
            <FlatList
              data={filteredCurrencies}
              keyExtractor={(item) => item.code}
              ListHeaderComponent={
                <TextInput
                  style={[
                    styles.searchInput,
                    {
                      backgroundColor: theme.colors.surfaceSecondary,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  placeholder="Rechercher..."
                  placeholderTextColor={theme.colors.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              }
              renderItem={({ item }) => renderCurrencyItem(item, isFrom, onClose)}
            />
          )}
        </View>
      </View>
    </Modal>
  );

  const renderCategoryPicker = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showCategoryPicker}
      onRequestClose={() => setShowCategoryPicker(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowCategoryPicker(false)}
      >
        <View
          style={[
            styles.categoryModalContent,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
            Catégorie
          </Text>
          {conversionCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                {
                  backgroundColor:
                    category.id === selectedCategory.id
                      ? theme.colors.surfaceSecondary
                      : 'transparent',
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Ionicons
                name={category.icon as any}
                size={24}
                color={theme.colors.primary}
              />
              <Text style={[styles.categoryItemText, { color: theme.colors.text }]}>
                {category.name}
              </Text>
              {category.id === selectedCategory.id && (
                <Ionicons
                  name="checkmark-outline"
                  size={20}
                  color={theme.colors.primary}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 10 }]}>
        {/* Mode Toggle */}
        <View style={[styles.modeToggle, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              mode === 'units' && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setMode('units')}
          >
            <Ionicons
              name="swap-horizontal-outline"
              size={20}
              color={mode === 'units' ? theme.colors.equalText : theme.colors.textSecondary}
            />
            <Text
              style={[
                styles.modeButtonText,
                { color: mode === 'units' ? theme.colors.equalText : theme.colors.textSecondary },
              ]}
            >
              Unités
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              mode === 'currency' && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setMode('currency')}
          >
            <Ionicons
              name="cash-outline"
              size={20}
              color={mode === 'currency' ? theme.colors.equalText : theme.colors.textSecondary}
            />
            <Text
              style={[
                styles.modeButtonText,
                { color: mode === 'currency' ? theme.colors.equalText : theme.colors.textSecondary },
              ]}
            >
              Devises
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category Selector (only for units) */}
        {mode === 'units' && (
          <TouchableOpacity
            style={[
              styles.categorySelector,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
            onPress={() => setShowCategoryPicker(true)}
          >
            <Ionicons
              name={selectedCategory.icon as any}
              size={24}
              color={theme.colors.primary}
            />
            <Text style={[styles.categorySelectorText, { color: theme.colors.text }]}>
              {selectedCategory.name}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}

        {/* From Unit/Currency */}
        <View
          style={[
            styles.conversionCard,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <TouchableOpacity
            style={styles.unitSelector}
            onPress={() => setShowFromPicker(true)}
          >
            <Text style={[styles.unitLabel, { color: theme.colors.textSecondary }]}>
              De
            </Text>
            <View style={styles.unitInfo}>
              <Text style={[styles.unitName, { color: theme.colors.text }]}>
                {mode === 'units' ? fromUnit.name : fromCurrency.name}
              </Text>
              <Text style={[styles.unitSymbol, { color: theme.colors.primary }]}>
                {mode === 'units' ? fromUnit.symbol : `${fromCurrency.code} (${fromCurrency.symbol})`}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
          <TextInput
            style={[
              styles.valueInput,
              {
                backgroundColor: theme.colors.surfaceSecondary,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        {/* Swap Button */}
        <TouchableOpacity
          style={[styles.swapButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleSwap}
        >
          <Ionicons
            name="swap-vertical-outline"
            size={28}
            color={theme.colors.equalText}
          />
        </TouchableOpacity>

        {/* To Unit/Currency */}
        <View
          style={[
            styles.conversionCard,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <TouchableOpacity
            style={styles.unitSelector}
            onPress={() => setShowToPicker(true)}
          >
            <Text style={[styles.unitLabel, { color: theme.colors.textSecondary }]}>
              Vers
            </Text>
            <View style={styles.unitInfo}>
              <Text style={[styles.unitName, { color: theme.colors.text }]}>
                {mode === 'units' ? toUnit.name : toCurrency.name}
              </Text>
              <Text style={[styles.unitSymbol, { color: theme.colors.primary }]}>
                {mode === 'units' ? toUnit.symbol : `${toCurrency.code} (${toCurrency.symbol})`}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
          <View
            style={[
              styles.resultDisplay,
              {
                backgroundColor: theme.colors.surfaceSecondary,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.resultText, { color: theme.colors.text }]}>
              {convertedValue}
            </Text>
            <Text style={[styles.resultSymbol, { color: theme.colors.primary }]}>
              {mode === 'units' ? toUnit.symbol : toCurrency.symbol}
            </Text>
          </View>
        </View>

        {/* Conversion Info */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
            1 {mode === 'units' ? fromUnit.symbol : fromCurrency.code} ={' '}
            {mode === 'units'
              ? (fromUnit.toBase / toUnit.toBase).toFixed(6).replace(/\.?0+$/, '')
              : (toCurrency.rate / fromCurrency.rate).toFixed(4).replace(/\.?0+$/, '')}{' '}
            {mode === 'units' ? toUnit.symbol : toCurrency.code}
          </Text>
        </View>
      </ScrollView>

      {/* Modals */}
      {renderUnitPicker(true, showFromPicker, () => setShowFromPicker(false))}
      {renderUnitPicker(false, showToPicker, () => setShowToPicker(false))}
      {renderCategoryPicker()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  modeToggle: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    gap: 12,
  },
  categorySelectorText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  conversionCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  unitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  unitLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginRight: 12,
  },
  unitInfo: {
    flex: 1,
  },
  unitName: {
    fontSize: 16,
    fontWeight: '600',
  },
  unitSymbol: {
    fontSize: 14,
    marginTop: 2,
  },
  valueInput: {
    fontSize: 32,
    fontWeight: '300',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    textAlign: 'right',
  },
  swapButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: -28,
    zIndex: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  resultDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  resultText: {
    fontSize: 32,
    fontWeight: '300',
    marginRight: 8,
  },
  resultSymbol: {
    fontSize: 18,
    fontWeight: '500',
  },
  infoCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '70%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchInput: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
  },
  pickerItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  pickerItemSymbol: {
    fontSize: 14,
    marginRight: 12,
  },
  categoryModalContent: {
    width: width * 0.85,
    borderRadius: 16,
    padding: 20,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderWidth: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
    gap: 16,
    borderWidth: 1,
  },
  categoryItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});
