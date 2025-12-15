import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface CalcButtonProps {
  label: string;
  onPress: () => void;
  type?: 'number' | 'operator' | 'function' | 'equal';
  wide?: boolean;
  small?: boolean;
}

const { width } = Dimensions.get('window');
const BUTTON_SIZE = (width - 60) / 4;
const SMALL_BUTTON_SIZE = (width - 80) / 5;

export const CalcButton: React.FC<CalcButtonProps> = ({
  label,
  onPress,
  type = 'number',
  wide = false,
  small = false,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      width: small ? SMALL_BUTTON_SIZE : wide ? BUTTON_SIZE * 2 + 10 : BUTTON_SIZE,
      height: small ? SMALL_BUTTON_SIZE : BUTTON_SIZE,
      borderRadius: small ? SMALL_BUTTON_SIZE / 2 : BUTTON_SIZE / 2,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      borderWidth: 1.5,
    };

    switch (type) {
      case 'operator':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.operatorBackground,
          borderColor: theme.colors.operatorText,
        };
      case 'function':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.surfaceSecondary,
          borderColor: theme.colors.textSecondary,
        };
      case 'equal':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.equalBackground,
          borderColor: theme.colors.equalBackground,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: theme.colors.buttonBackground,
          borderColor: theme.colors.border,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: small ? 18 : 24,
      fontWeight: '500',
    };

    switch (type) {
      case 'operator':
        return { ...baseStyle, color: theme.colors.operatorText };
      case 'function':
        return { ...baseStyle, color: theme.colors.textSecondary };
      case 'equal':
        return { ...baseStyle, color: theme.colors.equalText };
      default:
        return { ...baseStyle, color: theme.colors.buttonText };
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{label}</Text>
    </TouchableOpacity>
  );
};
