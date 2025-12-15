import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface DisplayProps {
  expression: string;
  result: string;
}

const { width } = Dimensions.get('window');

export const Display: React.FC<DisplayProps> = ({ expression, result }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.displayBackground,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text
        style={[styles.expression, { color: theme.colors.textSecondary }]}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {expression || '0'}
      </Text>
      <Text
        style={[styles.result, { color: theme.colors.text }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {result}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    minHeight: 140,
    justifyContent: 'flex-end',
  },
  expression: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 10,
  },
  result: {
    fontSize: 48,
    fontWeight: '300',
    textAlign: 'right',
  },
});
