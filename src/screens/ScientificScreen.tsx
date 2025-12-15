import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts/ThemeContext';
import { CalcButton } from '../components/CalcButton';
import { Display } from '../components/Display';

const { width } = Dimensions.get('window');

export const ScientificScreen: React.FC = () => {
  const { theme } = useTheme();
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [isRad, setIsRad] = useState(true);
  const [isInv, setIsInv] = useState(false);

  const handleNumber = useCallback((num: string) => {
    setExpression((prev) => prev + num);
  }, []);

  const handleOperator = useCallback((op: string) => {
    setExpression((prev) => {
      if (prev === '' && op !== '-') return prev;
      const lastChar = prev.slice(-1);
      if (['+', '-', '×', '÷', '^'].includes(lastChar)) {
        return prev.slice(0, -1) + op;
      }
      return prev + op;
    });
  }, []);

  const handleFunction = useCallback(
    (func: string) => {
      const toRad = (deg: number) => (deg * Math.PI) / 180;
      const toDeg = (rad: number) => (rad * 180) / Math.PI;

      try {
        let current = expression
          ? eval(expression.replace(/×/g, '*').replace(/÷/g, '/'))
          : 0;

        let newResult: number;

        switch (func) {
          case 'sin':
            newResult = isInv
              ? isRad
                ? Math.asin(current)
                : toDeg(Math.asin(current))
              : Math.sin(isRad ? current : toRad(current));
            break;
          case 'cos':
            newResult = isInv
              ? isRad
                ? Math.acos(current)
                : toDeg(Math.acos(current))
              : Math.cos(isRad ? current : toRad(current));
            break;
          case 'tan':
            newResult = isInv
              ? isRad
                ? Math.atan(current)
                : toDeg(Math.atan(current))
              : Math.tan(isRad ? current : toRad(current));
            break;
          case 'log':
            newResult = isInv ? Math.pow(10, current) : Math.log10(current);
            break;
          case 'ln':
            newResult = isInv ? Math.exp(current) : Math.log(current);
            break;
          case 'sqrt':
            newResult = isInv ? current * current : Math.sqrt(current);
            break;
          case 'cbrt':
            newResult = isInv
              ? Math.pow(current, 3)
              : Math.pow(current, 1 / 3);
            break;
          case 'fact':
            newResult = factorial(Math.floor(current));
            break;
          case 'abs':
            newResult = Math.abs(current);
            break;
          case 'floor':
            newResult = Math.floor(current);
            break;
          case 'ceil':
            newResult = Math.ceil(current);
            break;
          case 'round':
            newResult = Math.round(current);
            break;
          case 'exp':
            newResult = Math.exp(current);
            break;
          default:
            return;
        }

        const formatted = Number.isInteger(newResult)
          ? String(newResult)
          : parseFloat(newResult.toFixed(10)).toString();
        setExpression(formatted);
        setResult(formatted);
      } catch {
        setResult('Erreur');
      }
    },
    [expression, isRad, isInv]
  );

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const handleConstant = useCallback((constant: string) => {
    switch (constant) {
      case 'π':
        setExpression((prev) => prev + Math.PI.toString());
        break;
      case 'e':
        setExpression((prev) => prev + Math.E.toString());
        break;
    }
  }, []);

  const handleClear = useCallback(() => {
    setExpression('');
    setResult('0');
  }, []);

  const handleDelete = useCallback(() => {
    setExpression((prev) => prev.slice(0, -1));
  }, []);

  const handleEqual = useCallback(() => {
    try {
      const evalExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');
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
      const parts = prev.split(/[+\-×÷^]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) return prev;
      return prev + '.';
    });
  }, []);

  const handleParenthesis = useCallback((paren: string) => {
    setExpression((prev) => prev + paren);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style="light" />

      <View style={styles.displayContainer}>
        <Display expression={expression} result={result} />
      </View>

      <ScrollView style={styles.buttonScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.buttonContainer}>
          {/* Row 1 - Mode toggles */}
          <View style={styles.row}>
            <CalcButton
              label={isRad ? 'RAD' : 'DEG'}
              onPress={() => setIsRad(!isRad)}
              type="function"
              small
            />
            <CalcButton
              label={isInv ? 'INV' : 'inv'}
              onPress={() => setIsInv(!isInv)}
              type="function"
              small
            />
            <CalcButton label="(" onPress={() => handleParenthesis('(')} type="function" small />
            <CalcButton label=")" onPress={() => handleParenthesis(')')} type="function" small />
            <CalcButton label="⌫" onPress={handleDelete} type="function" small />
          </View>

          {/* Row 2 - Trig functions */}
          <View style={styles.row}>
            <CalcButton
              label={isInv ? 'sin⁻¹' : 'sin'}
              onPress={() => handleFunction('sin')}
              type="function"
              small
            />
            <CalcButton
              label={isInv ? 'cos⁻¹' : 'cos'}
              onPress={() => handleFunction('cos')}
              type="function"
              small
            />
            <CalcButton
              label={isInv ? 'tan⁻¹' : 'tan'}
              onPress={() => handleFunction('tan')}
              type="function"
              small
            />
            <CalcButton
              label={isInv ? '10ˣ' : 'log'}
              onPress={() => handleFunction('log')}
              type="function"
              small
            />
            <CalcButton
              label={isInv ? 'eˣ' : 'ln'}
              onPress={() => handleFunction('ln')}
              type="function"
              small
            />
          </View>

          {/* Row 3 - More functions */}
          <View style={styles.row}>
            <CalcButton
              label={isInv ? 'x²' : '√'}
              onPress={() => handleFunction('sqrt')}
              type="function"
              small
            />
            <CalcButton
              label={isInv ? 'x³' : '∛'}
              onPress={() => handleFunction('cbrt')}
              type="function"
              small
            />
            <CalcButton label="xʸ" onPress={() => handleOperator('^')} type="function" small />
            <CalcButton label="n!" onPress={() => handleFunction('fact')} type="function" small />
            <CalcButton label="|x|" onPress={() => handleFunction('abs')} type="function" small />
          </View>

          {/* Row 4 - Constants and AC */}
          <View style={styles.row}>
            <CalcButton label="π" onPress={() => handleConstant('π')} type="function" small />
            <CalcButton label="e" onPress={() => handleConstant('e')} type="function" small />
            <CalcButton label="AC" onPress={handleClear} type="function" small />
            <CalcButton label="%" onPress={() => handleOperator('%')} type="function" small />
            <CalcButton label="÷" onPress={() => handleOperator('÷')} type="operator" small />
          </View>

          {/* Row 5-8 - Standard calculator */}
          <View style={styles.row}>
            <CalcButton label="7" onPress={() => handleNumber('7')} small />
            <CalcButton label="8" onPress={() => handleNumber('8')} small />
            <CalcButton label="9" onPress={() => handleNumber('9')} small />
            <CalcButton label="×" onPress={() => handleOperator('×')} type="operator" small />
          </View>
          <View style={styles.row}>
            <CalcButton label="4" onPress={() => handleNumber('4')} small />
            <CalcButton label="5" onPress={() => handleNumber('5')} small />
            <CalcButton label="6" onPress={() => handleNumber('6')} small />
            <CalcButton label="-" onPress={() => handleOperator('-')} type="operator" small />
          </View>
          <View style={styles.row}>
            <CalcButton label="1" onPress={() => handleNumber('1')} small />
            <CalcButton label="2" onPress={() => handleNumber('2')} small />
            <CalcButton label="3" onPress={() => handleNumber('3')} small />
            <CalcButton label="+" onPress={() => handleOperator('+')} type="operator" small />
          </View>
          <View style={styles.row}>
            <CalcButton label="0" onPress={() => handleNumber('0')} small />
            <CalcButton label="." onPress={handleDecimal} small />
            <CalcButton label="=" onPress={handleEqual} type="equal" small />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonScroll: {
    flex: 1,
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
