import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts/ThemeContext';
import { CalcButton } from '../components/CalcButton';
import { Display } from '../components/Display';
import { ThemeSelector } from '../components/ThemeSelector';

export const CalculatorScreen: React.FC = () => {
  const { theme } = useTheme();
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');

  const handleNumber = useCallback((num: string) => {
    setExpression((prev) => prev + num);
  }, []);

  const handleOperator = useCallback((op: string) => {
    setExpression((prev) => {
      if (prev === '' && op !== '-') return prev;
      const lastChar = prev.slice(-1);
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        return prev.slice(0, -1) + op;
      }
      return prev + op;
    });
  }, []);

  const handleClear = useCallback(() => {
    setExpression('');
    setResult('0');
  }, []);

  const handleDelete = useCallback(() => {
    setExpression((prev) => prev.slice(0, -1));
  }, []);

  const handlePercent = useCallback(() => {
    try {
      const currentResult = eval(
        expression.replace(/×/g, '*').replace(/÷/g, '/')
      );
      setExpression(String(currentResult / 100));
      setResult(String(currentResult / 100));
    } catch {
      setResult('Erreur');
    }
  }, [expression]);

  const handleEqual = useCallback(() => {
    try {
      const evalExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
      const evalResult = eval(evalExpression);
      const formattedResult = Number.isInteger(evalResult)
        ? String(evalResult)
        : parseFloat(evalResult.toFixed(10)).toString();
      setResult(formattedResult);
    } catch {
      setResult('Erreur');
    }
  }, [expression]);

  const handleDecimal = useCallback(() => {
    setExpression((prev) => {
      const parts = prev.split(/[+\-×÷]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) return prev;
      return prev + '.';
    });
  }, []);

  const handleToggleSign = useCallback(() => {
    setExpression((prev) => {
      if (prev === '') return '-';
      if (prev.startsWith('-')) return prev.slice(1);
      return '-' + prev;
    });
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style="light" />

      <View style={styles.header}>
        <ThemeSelector />
      </View>

      <View style={styles.displayContainer}>
        <Display expression={expression} result={result} />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <CalcButton label="AC" onPress={handleClear} type="function" />
          <CalcButton label="±" onPress={handleToggleSign} type="function" />
          <CalcButton label="%" onPress={handlePercent} type="function" />
          <CalcButton label="÷" onPress={() => handleOperator('÷')} type="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton label="7" onPress={() => handleNumber('7')} />
          <CalcButton label="8" onPress={() => handleNumber('8')} />
          <CalcButton label="9" onPress={() => handleNumber('9')} />
          <CalcButton label="×" onPress={() => handleOperator('×')} type="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton label="4" onPress={() => handleNumber('4')} />
          <CalcButton label="5" onPress={() => handleNumber('5')} />
          <CalcButton label="6" onPress={() => handleNumber('6')} />
          <CalcButton label="-" onPress={() => handleOperator('-')} type="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton label="1" onPress={() => handleNumber('1')} />
          <CalcButton label="2" onPress={() => handleNumber('2')} />
          <CalcButton label="3" onPress={() => handleNumber('3')} />
          <CalcButton label="+" onPress={() => handleOperator('+')} type="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton label="0" onPress={() => handleNumber('0')} wide />
          <CalcButton label="." onPress={handleDecimal} />
          <CalcButton label="=" onPress={handleEqual} type="equal" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
