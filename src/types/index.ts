export type ThemeName = 'dark' | 'neonGenesis' | 'cyberpunk2077' | 'cobalt2';

export interface Theme {
  name: string;
  colors: {
    background: string;
    surface: string;
    surfaceSecondary: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
    border: string;
    buttonBackground: string;
    buttonText: string;
    operatorBackground: string;
    operatorText: string;
    equalBackground: string;
    equalText: string;
    displayBackground: string;
    tabBar: string;
    tabBarActive: string;
    tabBarInactive: string;
  };
}

export interface ConversionCategory {
  id: string;
  name: string;
  icon: string;
  units: ConversionUnit[];
}

export interface ConversionUnit {
  id: string;
  name: string;
  symbol: string;
  toBase: number; // Multiplier to convert to base unit
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Rate relative to USD
}
