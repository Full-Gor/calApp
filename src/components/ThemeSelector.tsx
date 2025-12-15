import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { themes, themeNames } from '../constants/themes';
import { ThemeName } from '../types';

const { width } = Dimensions.get('window');

export const ThemeSelector: React.FC = () => {
  const { theme, themeName, setTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleThemeSelect = (name: ThemeName) => {
    setTheme(name);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { borderColor: theme.colors.border }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name="color-palette-outline"
          size={24}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Thème
            </Text>
            {themeNames.map((name) => (
              <TouchableOpacity
                key={name}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor:
                      name === themeName
                        ? theme.colors.surfaceSecondary
                        : 'transparent',
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => handleThemeSelect(name)}
              >
                <View
                  style={[
                    styles.themePreview,
                    { backgroundColor: themes[name].colors.primary },
                  ]}
                />
                <Text style={[styles.themeName, { color: theme.colors.text }]}>
                  {themes[name].name}
                </Text>
                {name === themeName && (
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
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.8,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  themePreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 15,
  },
  themeName: {
    fontSize: 16,
    flex: 1,
  },
});
