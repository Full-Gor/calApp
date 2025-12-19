import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import {
  CalculatorScreen,
  ScientificScreen,
  ConversionScreen,
  PriceCalculatorScreen,
} from './src/screens';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Calculatrice':
              iconName = focused ? 'calculator' : 'calculator-outline';
              break;
            case 'Scientifique':
              iconName = focused ? 'flask' : 'flask-outline';
              break;
            case 'Conversion':
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
              break;
            case 'Prix':
              iconName = focused ? 'cash' : 'cash-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.tabBarActive,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 10),
          height: 60 + Math.max(insets.bottom, 10),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Calculatrice" component={CalculatorScreen} />
      <Tab.Screen name="Scientifique" component={ScientificScreen} />
      <Tab.Screen name="Conversion" component={ConversionScreen} />
      <Tab.Screen name="Prix" component={PriceCalculatorScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
