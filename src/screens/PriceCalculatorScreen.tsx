import React, { useState, useMemo } from 'react';
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
import { useTheme } from '../contexts/ThemeContext';
import { materialPrices, priceCategories, MaterialPrice, priceTypes, PriceType } from '../constants/prices';
import { currencies } from '../constants/conversions';
import { Currency } from '../types';

const { width } = Dimensions.get('window');

type WeightUnit = 'g' | 'kg' | 'oz_troy' | 'ct';

const weightUnits = [
  { id: 'g', name: 'Grammes', symbol: 'g', toGrams: 1 },
  { id: 'kg', name: 'Kilogrammes', symbol: 'kg', toGrams: 1000 },
  { id: 'oz_troy', name: 'Once troy', symbol: 'oz t', toGrams: 31.1035 },
  { id: 'ct', name: 'Carats', symbol: 'ct', toGrams: 0.2 },
];

export const PriceCalculatorScreen: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(priceCategories[0]);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialPrice>(
    materialPrices.find((m) => m.category === 'precious_metal')!
  );
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[1]); // EUR
  const [weightValue, setWeightValue] = useState('1');
  const [weightUnit, setWeightUnit] = useState(weightUnits[0]); // grammes
  const [showMaterialPicker, setShowMaterialPicker] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [showWeightUnitPicker, setShowWeightUnitPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showPriceTypePicker, setShowPriceTypePicker] = useState(false);
  const [selectedPriceType, setSelectedPriceType] = useState<PriceType>('spot');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMaterials = useMemo(() => {
    return materialPrices.filter((m) => m.category === selectedCategory.id);
  }, [selectedCategory]);

  const searchedMaterials = useMemo(() => {
    if (!searchQuery) return filteredMaterials;
    const query = searchQuery.toLowerCase();
    return filteredMaterials.filter((m) => m.name.toLowerCase().includes(query));
  }, [filteredMaterials, searchQuery]);

  // Helper function to get price based on selected type
  const getMaterialPrice = (material: MaterialPrice, priceType: PriceType): number => {
    switch (priceType) {
      case 'spot':
        return material.priceSpot;
      case 'factory':
        return material.priceFactory;
      case 'retail':
        return material.priceRetail;
      default:
        return material.priceSpot;
    }
  };

  const selectedPriceTypeInfo = priceTypes.find((p) => p.id === selectedPriceType)!;

  const calculatedPrice = useMemo(() => {
    const weight = parseFloat(weightValue) || 0;
    const weightInGrams = weight * weightUnit.toGrams;

    // Prix selon le type sélectionné
    const materialPrice = getMaterialPrice(selectedMaterial, selectedPriceType);

    // Prix par gramme du matériau
    const pricePerGram = materialPrice / selectedMaterial.unitInGrams;

    // Prix total en USD
    const totalUSD = weightInGrams * pricePerGram;

    // Conversion dans la devise sélectionnée
    const totalInCurrency = totalUSD * selectedCurrency.rate;

    return {
      totalUSD,
      totalInCurrency,
      pricePerGram: pricePerGram * selectedCurrency.rate,
      pricePerUnit: materialPrice * selectedCurrency.rate,
      // Prix pour les trois niveaux
      priceSpot: selectedMaterial.priceSpot * selectedCurrency.rate,
      priceFactory: selectedMaterial.priceFactory * selectedCurrency.rate,
      priceRetail: selectedMaterial.priceRetail * selectedCurrency.rate,
    };
  }, [weightValue, weightUnit, selectedMaterial, selectedCurrency, selectedPriceType]);

  const handleCategorySelect = (category: typeof selectedCategory) => {
    setSelectedCategory(category);
    const firstMaterial = materialPrices.find((m) => m.category === category.id);
    if (firstMaterial) {
      setSelectedMaterial(firstMaterial);
      // Ajuster l'unité de poids selon la catégorie
      if (category.id === 'gemstone') {
        setWeightUnit(weightUnits.find((u) => u.id === 'ct')!);
      } else if (category.id === 'precious_metal') {
        setWeightUnit(weightUnits.find((u) => u.id === 'oz_troy')!);
      } else {
        setWeightUnit(weightUnits.find((u) => u.id === 'kg')!);
      }
    }
    setShowCategoryPicker(false);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return num.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
    } else if (num >= 1) {
      return num.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
    } else {
      return num.toLocaleString('fr-FR', { maximumFractionDigits: 4 });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Titre */}
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Calculateur de Prix
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Métaux et pierres précieuses
        </Text>

        {/* Sélection de catégorie */}
        <TouchableOpacity
          style={[styles.selector, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => setShowCategoryPicker(true)}
        >
          <Ionicons name={selectedCategory.icon as any} size={24} color={theme.colors.primary} />
          <Text style={[styles.selectorText, { color: theme.colors.text }]}>
            {selectedCategory.name}
          </Text>
          <Ionicons name="chevron-down-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        {/* Sélection du type de prix */}
        <TouchableOpacity
          style={[styles.selector, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => setShowPriceTypePicker(true)}
        >
          <Ionicons name="layers-outline" size={24} color={theme.colors.primary} />
          <View style={styles.selectorInfo}>
            <Text style={[styles.selectorText, { color: theme.colors.text }]}>
              {selectedPriceTypeInfo.name}
            </Text>
            <Text style={[styles.selectorSubtext, { color: theme.colors.textSecondary }]}>
              {selectedPriceTypeInfo.description}
            </Text>
          </View>
          <Ionicons name="chevron-down-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        {/* Sélection du matériau */}
        <TouchableOpacity
          style={[styles.selector, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => setShowMaterialPicker(true)}
        >
          <Ionicons name="pricetag-outline" size={24} color={theme.colors.primary} />
          <View style={styles.selectorInfo}>
            <Text style={[styles.selectorText, { color: theme.colors.text }]}>
              {selectedMaterial.name}
            </Text>
            <Text style={[styles.selectorSubtext, { color: theme.colors.textSecondary }]}>
              {formatNumber(getMaterialPrice(selectedMaterial, selectedPriceType) * selectedCurrency.rate)} {selectedCurrency.symbol}/{selectedMaterial.unit}
            </Text>
          </View>
          <Ionicons name="chevron-down-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        {/* Saisie du poids */}
        <View style={[styles.inputCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>POIDS</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.surfaceSecondary, color: theme.colors.text, borderColor: theme.colors.border }]}
              value={weightValue}
              onChangeText={setWeightValue}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={theme.colors.textSecondary}
            />
            <TouchableOpacity
              style={[styles.unitButton, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}
              onPress={() => setShowWeightUnitPicker(true)}
            >
              <Text style={[styles.unitButtonText, { color: theme.colors.primary }]}>
                {weightUnit.symbol}
              </Text>
              <Ionicons name="chevron-down-outline" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sélection de la devise */}
        <TouchableOpacity
          style={[styles.selector, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => setShowCurrencyPicker(true)}
        >
          <Ionicons name="cash-outline" size={24} color={theme.colors.primary} />
          <View style={styles.selectorInfo}>
            <Text style={[styles.selectorText, { color: theme.colors.text }]}>
              {selectedCurrency.name}
            </Text>
            <Text style={[styles.selectorSubtext, { color: theme.colors.textSecondary }]}>
              {selectedCurrency.code} ({selectedCurrency.symbol})
            </Text>
          </View>
          <Ionicons name="chevron-down-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        {/* Résultat */}
        <View style={[styles.resultCard, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.resultLabel, { color: theme.colors.equalText }]}>PRIX TOTAL</Text>
          <Text style={[styles.resultValue, { color: theme.colors.equalText }]}>
            {formatNumber(calculatedPrice.totalInCurrency)} {selectedCurrency.symbol}
          </Text>
          <Text style={[styles.resultSubtext, { color: theme.colors.equalText, opacity: 0.8 }]}>
            {formatNumber(calculatedPrice.totalUSD)} USD
          </Text>
        </View>

        {/* Détails */}
        <View style={[styles.detailsCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Prix par gramme</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {formatNumber(calculatedPrice.pricePerGram)} {selectedCurrency.symbol}/g
            </Text>
          </View>
          <View style={[styles.detailDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Prix par {selectedMaterial.unit}</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {formatNumber(calculatedPrice.pricePerUnit)} {selectedCurrency.symbol}
            </Text>
          </View>
        </View>

        {/* Comparaison des trois prix */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Comparaison des prix par {selectedMaterial.unit}
        </Text>
        <View style={[styles.detailsCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Brut / Spot</Text>
            <Text style={[styles.detailValue, { color: selectedPriceType === 'spot' ? theme.colors.primary : theme.colors.text }]}>
              {formatNumber(calculatedPrice.priceSpot)} {selectedCurrency.symbol}
            </Text>
          </View>
          <View style={[styles.detailDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Usine / Taillé</Text>
            <Text style={[styles.detailValue, { color: selectedPriceType === 'factory' ? theme.colors.primary : theme.colors.text }]}>
              {formatNumber(calculatedPrice.priceFactory)} {selectedCurrency.symbol}
            </Text>
          </View>
          <View style={[styles.detailDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Boutique / Détail</Text>
            <Text style={[styles.detailValue, { color: selectedPriceType === 'retail' ? theme.colors.primary : theme.colors.text }]}>
              {formatNumber(calculatedPrice.priceRetail)} {selectedCurrency.symbol}
            </Text>
          </View>
        </View>

        {/* Note */}
        <Text style={[styles.note, { color: theme.colors.textSecondary }]}>
          Les prix sont indicatifs et peuvent varier selon le marché, la qualité et la provenance.
        </Text>
      </ScrollView>

      {/* Modal catégorie */}
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
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Catégorie</Text>
            {priceCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.modalItem, { backgroundColor: category.id === selectedCategory.id ? theme.colors.surfaceSecondary : 'transparent', borderColor: theme.colors.border }]}
                onPress={() => handleCategorySelect(category)}
              >
                <Ionicons name={category.icon as any} size={24} color={theme.colors.primary} />
                <Text style={[styles.modalItemText, { color: theme.colors.text }]}>{category.name}</Text>
                {category.id === selectedCategory.id && (
                  <Ionicons name="checkmark-outline" size={20} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal type de prix */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showPriceTypePicker}
        onRequestClose={() => setShowPriceTypePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPriceTypePicker(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Type de prix</Text>
            {priceTypes.map((priceType) => (
              <TouchableOpacity
                key={priceType.id}
                style={[styles.modalItem, { backgroundColor: priceType.id === selectedPriceType ? theme.colors.surfaceSecondary : 'transparent', borderColor: theme.colors.border }]}
                onPress={() => {
                  setSelectedPriceType(priceType.id as PriceType);
                  setShowPriceTypePicker(false);
                }}
              >
                <Ionicons
                  name={priceType.id === 'spot' ? 'analytics-outline' : priceType.id === 'factory' ? 'construct-outline' : 'storefront-outline'}
                  size={24}
                  color={theme.colors.primary}
                />
                <View style={styles.modalItemInfo}>
                  <Text style={[styles.modalItemText, { color: theme.colors.text }]}>{priceType.name}</Text>
                  <Text style={[styles.modalItemSubtext, { color: theme.colors.textSecondary }]}>{priceType.description}</Text>
                </View>
                {priceType.id === selectedPriceType && (
                  <Ionicons name="checkmark-outline" size={20} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal matériau */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showMaterialPicker}
        onRequestClose={() => setShowMaterialPicker(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={[styles.modalContentBottom, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Matériau</Text>
              <TouchableOpacity onPress={() => setShowMaterialPicker(false)}>
                <Ionicons name="close-outline" size={28} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.searchInput, { backgroundColor: theme.colors.surfaceSecondary, color: theme.colors.text, borderColor: theme.colors.border }]}
              placeholder="Rechercher..."
              placeholderTextColor={theme.colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <FlatList
              data={searchedMaterials}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalItem, { backgroundColor: item.id === selectedMaterial.id ? theme.colors.surfaceSecondary : 'transparent', borderColor: theme.colors.border }]}
                  onPress={() => {
                    setSelectedMaterial(item);
                    setSearchQuery('');
                    setShowMaterialPicker(false);
                  }}
                >
                  <View style={styles.modalItemInfo}>
                    <Text style={[styles.modalItemText, { color: theme.colors.text }]}>{item.name}</Text>
                    <Text style={[styles.modalItemSubtext, { color: theme.colors.textSecondary }]}>
                      {formatNumber(getMaterialPrice(item, selectedPriceType) * selectedCurrency.rate)} {selectedCurrency.symbol}/{item.unit}
                    </Text>
                  </View>
                  {item.id === selectedMaterial.id && (
                    <Ionicons name="checkmark-outline" size={20} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Modal devise */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCurrencyPicker}
        onRequestClose={() => setShowCurrencyPicker(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={[styles.modalContentBottom, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Devise</Text>
              <TouchableOpacity onPress={() => setShowCurrencyPicker(false)}>
                <Ionicons name="close-outline" size={28} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={currencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalItem, { backgroundColor: item.code === selectedCurrency.code ? theme.colors.surfaceSecondary : 'transparent', borderColor: theme.colors.border }]}
                  onPress={() => {
                    setSelectedCurrency(item);
                    setShowCurrencyPicker(false);
                  }}
                >
                  <View style={styles.modalItemInfo}>
                    <Text style={[styles.modalItemText, { color: theme.colors.text }]}>{item.name}</Text>
                    <Text style={[styles.modalItemSubtext, { color: theme.colors.textSecondary }]}>
                      {item.code} ({item.symbol})
                    </Text>
                  </View>
                  {item.code === selectedCurrency.code && (
                    <Ionicons name="checkmark-outline" size={20} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Modal unité de poids */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showWeightUnitPicker}
        onRequestClose={() => setShowWeightUnitPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowWeightUnitPicker(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Unité de poids</Text>
            {weightUnits.map((unit) => (
              <TouchableOpacity
                key={unit.id}
                style={[styles.modalItem, { backgroundColor: unit.id === weightUnit.id ? theme.colors.surfaceSecondary : 'transparent', borderColor: theme.colors.border }]}
                onPress={() => {
                  setWeightUnit(unit);
                  setShowWeightUnitPicker(false);
                }}
              >
                <Text style={[styles.modalItemText, { color: theme.colors.text }]}>{unit.name}</Text>
                <Text style={[styles.modalItemSubtext, { color: theme.colors.textSecondary }]}>{unit.symbol}</Text>
                {unit.id === weightUnit.id && (
                  <Ionicons name="checkmark-outline" size={20} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    gap: 12,
  },
  selectorInfo: {
    flex: 1,
  },
  selectorText: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectorSubtext: {
    fontSize: 13,
    marginTop: 2,
  },
  inputCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 28,
    fontWeight: '300',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'right',
  },
  unitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
  },
  unitButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  resultCard: {
    padding: 24,
    borderRadius: 16,
    marginVertical: 16,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: '700',
  },
  resultSubtext: {
    fontSize: 16,
    marginTop: 4,
  },
  detailsCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailDivider: {
    height: 1,
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: width * 0.85,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  modalContentBottom: {
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
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    gap: 12,
  },
  modalItemInfo: {
    flex: 1,
  },
  modalItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalItemSubtext: {
    fontSize: 13,
    marginTop: 2,
  },
});
