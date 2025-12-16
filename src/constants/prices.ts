// ============================================
// COURS INTERNATIONAUX - Décembre 2024
// ============================================
// Sources: LBMA, COMEX, Kitco, LME, Rapaport
//
// NIVEAUX DE PRIX:
// - Brut/Spot: Prix matière première brute
// - Usine/Taillé: Prix après transformation (+20-40%)
// - Boutique: Prix de détail final (+50-200%)
// ============================================

export interface MaterialPrice {
  id: string;
  name: string;
  category: 'precious_metal' | 'gemstone' | 'base_metal';
  priceSpot: number;      // Prix brut/spot international
  priceFactory: number;   // Prix usine/taillé
  priceRetail: number;    // Prix boutique/détail
  unit: string;
  unitInGrams: number;
}

export type PriceType = 'spot' | 'factory' | 'retail';

export const priceTypes = [
  { id: 'spot', name: 'Brut / Spot', description: 'Cours international' },
  { id: 'factory', name: 'Usine / Taillé', description: 'Grossiste / Après taille' },
  { id: 'retail', name: 'Boutique / Détail', description: 'Prix en magasin' },
];

export const materialPrices: MaterialPrice[] = [
  // ============================================
  // MÉTAUX PRÉCIEUX (par once troy = 31.1035g)
  // Spot: LBMA/COMEX | Usine: +10-15% | Boutique: +30-50%
  // ============================================
  { id: 'gold_24k', name: 'Or 24K (999)', category: 'precious_metal', priceSpot: 2620, priceFactory: 2880, priceRetail: 3400, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_22k', name: 'Or 22K (916)', category: 'precious_metal', priceSpot: 2401, priceFactory: 2640, priceRetail: 3120, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_21k', name: 'Or 21K (875)', category: 'precious_metal', priceSpot: 2293, priceFactory: 2520, priceRetail: 2980, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_18k', name: 'Or 18K (750)', category: 'precious_metal', priceSpot: 1965, priceFactory: 2160, priceRetail: 2550, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_14k', name: 'Or 14K (585)', category: 'precious_metal', priceSpot: 1533, priceFactory: 1690, priceRetail: 1990, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_10k', name: 'Or 10K (417)', category: 'precious_metal', priceSpot: 1092, priceFactory: 1200, priceRetail: 1420, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_9k', name: 'Or 9K (375)', category: 'precious_metal', priceSpot: 983, priceFactory: 1080, priceRetail: 1280, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'silver', name: 'Argent (999)', category: 'precious_metal', priceSpot: 30.50, priceFactory: 34, priceRetail: 45, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'platinum', name: 'Platine', category: 'precious_metal', priceSpot: 940, priceFactory: 1050, priceRetail: 1300, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'palladium', name: 'Palladium', category: 'precious_metal', priceSpot: 970, priceFactory: 1100, priceRetail: 1350, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'rhodium', name: 'Rhodium', category: 'precious_metal', priceSpot: 4650, priceFactory: 5200, priceRetail: 6500, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'iridium', name: 'Iridium', category: 'precious_metal', priceSpot: 4800, priceFactory: 5400, priceRetail: 6700, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'ruthenium', name: 'Ruthénium', category: 'precious_metal', priceSpot: 475, priceFactory: 530, priceRetail: 660, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'osmium', name: 'Osmium', category: 'precious_metal', priceSpot: 400, priceFactory: 450, priceRetail: 560, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'rhenium', name: 'Rhénium', category: 'precious_metal', priceSpot: 1450, priceFactory: 1620, priceRetail: 2000, unit: 'oz t', unitInGrams: 31.1035 },

  // ============================================
  // PIERRES PRÉCIEUSES (par carat)
  // Brut: Prix pierre brute | Taillé: Après taille (+50-100%) | Boutique: (+100-300%)
  // ============================================

  // Diamants - Brut vs Taillé vs Boutique
  { id: 'diamond_d_if', name: 'Diamant D-IF (parfait)', category: 'gemstone', priceSpot: 12000, priceFactory: 25000, priceRetail: 45000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_d_vvs1', name: 'Diamant D-VVS1', category: 'gemstone', priceSpot: 7500, priceFactory: 15000, priceRetail: 28000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_g_vs1', name: 'Diamant G-VS1', category: 'gemstone', priceSpot: 3800, priceFactory: 7500, priceRetail: 14000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_h_vs2', name: 'Diamant H-VS2', category: 'gemstone', priceSpot: 2800, priceFactory: 5500, priceRetail: 10000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_i_si1', name: 'Diamant I-SI1', category: 'gemstone', priceSpot: 1800, priceFactory: 3500, priceRetail: 6500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_j_si2', name: 'Diamant J-SI2', category: 'gemstone', priceSpot: 1200, priceFactory: 2400, priceRetail: 4500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_k_i1', name: 'Diamant K-I1', category: 'gemstone', priceSpot: 600, priceFactory: 1200, priceRetail: 2200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_fancy_yellow', name: 'Diamant jaune fancy', category: 'gemstone', priceSpot: 4000, priceFactory: 8000, priceRetail: 15000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_fancy_pink', name: 'Diamant rose fancy', category: 'gemstone', priceSpot: 25000, priceFactory: 50000, priceRetail: 100000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_fancy_blue', name: 'Diamant bleu fancy', category: 'gemstone', priceSpot: 50000, priceFactory: 100000, priceRetail: 200000, unit: 'ct', unitInGrams: 0.2 },

  // Rubis
  { id: 'ruby_burma_aaa', name: 'Rubis Birmanie AAA', category: 'gemstone', priceSpot: 12000, priceFactory: 25000, priceRetail: 50000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ruby_burma_aa', name: 'Rubis Birmanie AA', category: 'gemstone', priceSpot: 6000, priceFactory: 12000, priceRetail: 24000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ruby_mozambique', name: 'Rubis Mozambique', category: 'gemstone', priceSpot: 2000, priceFactory: 4000, priceRetail: 8000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ruby_thailand', name: 'Rubis Thaïlande', category: 'gemstone', priceSpot: 1200, priceFactory: 2500, priceRetail: 5000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ruby_standard', name: 'Rubis standard', category: 'gemstone', priceSpot: 700, priceFactory: 1500, priceRetail: 3000, unit: 'ct', unitInGrams: 0.2 },

  // Saphirs
  { id: 'sapphire_kashmir', name: 'Saphir Cachemire', category: 'gemstone', priceSpot: 25000, priceFactory: 50000, priceRetail: 100000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_burma_blue', name: 'Saphir Birmanie bleu', category: 'gemstone', priceSpot: 7500, priceFactory: 15000, priceRetail: 30000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_ceylon_blue', name: 'Saphir Ceylan bleu', category: 'gemstone', priceSpot: 4000, priceFactory: 8000, priceRetail: 16000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_blue_standard', name: 'Saphir bleu standard', category: 'gemstone', priceSpot: 1200, priceFactory: 2500, priceRetail: 5000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_padparadscha', name: 'Saphir Padparadscha', category: 'gemstone', priceSpot: 10000, priceFactory: 20000, priceRetail: 40000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_pink', name: 'Saphir rose', category: 'gemstone', priceSpot: 1500, priceFactory: 3000, priceRetail: 6000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_yellow', name: 'Saphir jaune', category: 'gemstone', priceSpot: 600, priceFactory: 1200, priceRetail: 2400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_orange', name: 'Saphir orange', category: 'gemstone', priceSpot: 900, priceFactory: 1800, priceRetail: 3600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_green', name: 'Saphir vert', category: 'gemstone', priceSpot: 400, priceFactory: 800, priceRetail: 1600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_star', name: 'Saphir étoilé', category: 'gemstone', priceSpot: 750, priceFactory: 1500, priceRetail: 3000, unit: 'ct', unitInGrams: 0.2 },

  // Émeraudes
  { id: 'emerald_colombian_aaa', name: 'Émeraude Colombie AAA', category: 'gemstone', priceSpot: 15000, priceFactory: 30000, priceRetail: 60000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'emerald_colombian_aa', name: 'Émeraude Colombie AA', category: 'gemstone', priceSpot: 6000, priceFactory: 12000, priceRetail: 24000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'emerald_zambian', name: 'Émeraude Zambie', category: 'gemstone', priceSpot: 2500, priceFactory: 5000, priceRetail: 10000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'emerald_brazilian', name: 'Émeraude Brésil', category: 'gemstone', priceSpot: 1500, priceFactory: 3000, priceRetail: 6000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'emerald_standard', name: 'Émeraude standard', category: 'gemstone', priceSpot: 750, priceFactory: 1500, priceRetail: 3000, unit: 'ct', unitInGrams: 0.2 },

  // Pierres rares
  { id: 'alexandrite_russian', name: 'Alexandrite Russie', category: 'gemstone', priceSpot: 35000, priceFactory: 70000, priceRetail: 140000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'alexandrite_brazilian', name: 'Alexandrite Brésil', category: 'gemstone', priceSpot: 7500, priceFactory: 15000, priceRetail: 30000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'paraiba_brazilian', name: 'Tourmaline Paraïba Brésil', category: 'gemstone', priceSpot: 15000, priceFactory: 30000, priceRetail: 60000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'paraiba_african', name: 'Tourmaline Paraïba Afrique', category: 'gemstone', priceSpot: 2500, priceFactory: 5000, priceRetail: 10000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'red_beryl', name: 'Béryl rouge (Bixbite)', category: 'gemstone', priceSpot: 5000, priceFactory: 10000, priceRetail: 20000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'musgravite', name: 'Musgravite', category: 'gemstone', priceSpot: 17500, priceFactory: 35000, priceRetail: 70000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'painite', name: 'Painite', category: 'gemstone', priceSpot: 30000, priceFactory: 60000, priceRetail: 120000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'taaffeite', name: 'Taafféite', category: 'gemstone', priceSpot: 17500, priceFactory: 35000, priceRetail: 70000, unit: 'ct', unitInGrams: 0.2 },

  // Spinelles
  { id: 'spinel_red_burma', name: 'Spinelle rouge Birmanie', category: 'gemstone', priceSpot: 4000, priceFactory: 8000, priceRetail: 16000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'spinel_cobalt_blue', name: 'Spinelle cobalt bleu', category: 'gemstone', priceSpot: 2500, priceFactory: 5000, priceRetail: 10000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'spinel_pink', name: 'Spinelle rose', category: 'gemstone', priceSpot: 1000, priceFactory: 2000, priceRetail: 4000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'spinel_standard', name: 'Spinelle standard', category: 'gemstone', priceSpot: 250, priceFactory: 500, priceRetail: 1000, unit: 'ct', unitInGrams: 0.2 },

  // Grenats
  { id: 'garnet_demantoid', name: 'Grenat démantoïde', category: 'gemstone', priceSpot: 1500, priceFactory: 3000, priceRetail: 6000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_tsavorite', name: 'Grenat tsavorite', category: 'gemstone', priceSpot: 1250, priceFactory: 2500, priceRetail: 5000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_spessartine', name: 'Grenat spessartine', category: 'gemstone', priceSpot: 400, priceFactory: 800, priceRetail: 1600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_rhodolite', name: 'Grenat rhodolite', category: 'gemstone', priceSpot: 100, priceFactory: 200, priceRetail: 400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_almandine', name: 'Grenat almandin', category: 'gemstone', priceSpot: 25, priceFactory: 50, priceRetail: 100, unit: 'ct', unitInGrams: 0.2 },

  // Tourmalines
  { id: 'tourmaline_chrome', name: 'Tourmaline chrome', category: 'gemstone', priceSpot: 750, priceFactory: 1500, priceRetail: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_indicolite', name: 'Tourmaline indicolite', category: 'gemstone', priceSpot: 400, priceFactory: 800, priceRetail: 1600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_rubellite', name: 'Tourmaline rubellite', category: 'gemstone', priceSpot: 300, priceFactory: 600, priceRetail: 1200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_watermelon', name: 'Tourmaline pastèque', category: 'gemstone', priceSpot: 250, priceFactory: 500, priceRetail: 1000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_green', name: 'Tourmaline verte', category: 'gemstone', priceSpot: 150, priceFactory: 300, priceRetail: 600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_pink', name: 'Tourmaline rose', category: 'gemstone', priceSpot: 125, priceFactory: 250, priceRetail: 500, unit: 'ct', unitInGrams: 0.2 },

  // Béryls
  { id: 'aquamarine_santa_maria', name: 'Aigue-marine Santa Maria', category: 'gemstone', priceSpot: 750, priceFactory: 1500, priceRetail: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'aquamarine_standard', name: 'Aigue-marine standard', category: 'gemstone', priceSpot: 150, priceFactory: 300, priceRetail: 600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'morganite', name: 'Morganite', category: 'gemstone', priceSpot: 100, priceFactory: 200, priceRetail: 400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'heliodor', name: 'Héliodore', category: 'gemstone', priceSpot: 75, priceFactory: 150, priceRetail: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'goshenite', name: 'Goshénite', category: 'gemstone', priceSpot: 25, priceFactory: 50, priceRetail: 100, unit: 'ct', unitInGrams: 0.2 },

  // Opales
  { id: 'opal_black_lightning', name: 'Opale noire Lightning Ridge', category: 'gemstone', priceSpot: 7500, priceFactory: 15000, priceRetail: 30000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_black_standard', name: 'Opale noire standard', category: 'gemstone', priceSpot: 1500, priceFactory: 3000, priceRetail: 6000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_boulder', name: 'Opale boulder', category: 'gemstone', priceSpot: 250, priceFactory: 500, priceRetail: 1000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_white', name: 'Opale blanche', category: 'gemstone', priceSpot: 75, priceFactory: 150, priceRetail: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_fire_mexican', name: 'Opale de feu Mexique', category: 'gemstone', priceSpot: 150, priceFactory: 300, priceRetail: 600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_ethiopian', name: 'Opale Éthiopie', category: 'gemstone', priceSpot: 50, priceFactory: 100, priceRetail: 200, unit: 'ct', unitInGrams: 0.2 },

  // Jades
  { id: 'jade_imperial_burma', name: 'Jade impérial Birmanie', category: 'gemstone', priceSpot: 15000, priceFactory: 30000, priceRetail: 60000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'jade_jadeite_green', name: 'Jadéite verte', category: 'gemstone', priceSpot: 1500, priceFactory: 3000, priceRetail: 6000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'jade_jadeite_lavender', name: 'Jadéite lavande', category: 'gemstone', priceSpot: 1000, priceFactory: 2000, priceRetail: 4000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'jade_nephrite', name: 'Jade néphrite', category: 'gemstone', priceSpot: 25, priceFactory: 50, priceRetail: 100, unit: 'ct', unitInGrams: 0.2 },

  // Tanzanite
  { id: 'tanzanite_aaa', name: 'Tanzanite AAA', category: 'gemstone', priceSpot: 600, priceFactory: 1200, priceRetail: 2400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tanzanite_aa', name: 'Tanzanite AA', category: 'gemstone', priceSpot: 300, priceFactory: 600, priceRetail: 1200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tanzanite_standard', name: 'Tanzanite standard', category: 'gemstone', priceSpot: 150, priceFactory: 300, priceRetail: 600, unit: 'ct', unitInGrams: 0.2 },

  // Topazes
  { id: 'topaz_imperial', name: 'Topaze impériale', category: 'gemstone', priceSpot: 500, priceFactory: 1000, priceRetail: 2000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'topaz_pink', name: 'Topaze rose', category: 'gemstone', priceSpot: 250, priceFactory: 500, priceRetail: 1000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'topaz_blue_swiss', name: 'Topaze Swiss Blue', category: 'gemstone', priceSpot: 15, priceFactory: 30, priceRetail: 60, unit: 'ct', unitInGrams: 0.2 },
  { id: 'topaz_blue_london', name: 'Topaze London Blue', category: 'gemstone', priceSpot: 12, priceFactory: 25, priceRetail: 50, unit: 'ct', unitInGrams: 0.2 },
  { id: 'topaz_white', name: 'Topaze blanche', category: 'gemstone', priceSpot: 5, priceFactory: 10, priceRetail: 20, unit: 'ct', unitInGrams: 0.2 },

  // Quartz
  { id: 'amethyst_deep', name: 'Améthyste profonde', category: 'gemstone', priceSpot: 25, priceFactory: 50, priceRetail: 100, unit: 'ct', unitInGrams: 0.2 },
  { id: 'amethyst_standard', name: 'Améthyste standard', category: 'gemstone', priceSpot: 8, priceFactory: 15, priceRetail: 30, unit: 'ct', unitInGrams: 0.2 },
  { id: 'citrine_natural', name: 'Citrine naturelle', category: 'gemstone', priceSpot: 15, priceFactory: 30, priceRetail: 60, unit: 'ct', unitInGrams: 0.2 },
  { id: 'citrine_heated', name: 'Citrine chauffée', category: 'gemstone', priceSpot: 5, priceFactory: 10, priceRetail: 20, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ametrine', name: 'Amétrine', category: 'gemstone', priceSpot: 12, priceFactory: 25, priceRetail: 50, unit: 'ct', unitInGrams: 0.2 },
  { id: 'rose_quartz', name: 'Quartz rose', category: 'gemstone', priceSpot: 2, priceFactory: 5, priceRetail: 10, unit: 'ct', unitInGrams: 0.2 },
  { id: 'smoky_quartz', name: 'Quartz fumé', category: 'gemstone', priceSpot: 2, priceFactory: 5, priceRetail: 10, unit: 'ct', unitInGrams: 0.2 },

  // Zircons
  { id: 'zircon_blue', name: 'Zircon bleu', category: 'gemstone', priceSpot: 100, priceFactory: 200, priceRetail: 400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'zircon_champagne', name: 'Zircon champagne', category: 'gemstone', priceSpot: 50, priceFactory: 100, priceRetail: 200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'zircon_white', name: 'Zircon blanc', category: 'gemstone', priceSpot: 35, priceFactory: 75, priceRetail: 150, unit: 'ct', unitInGrams: 0.2 },

  // Péridot
  { id: 'peridot_pakistan', name: 'Péridot Pakistan', category: 'gemstone', priceSpot: 100, priceFactory: 200, priceRetail: 400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'peridot_standard', name: 'Péridot standard', category: 'gemstone', priceSpot: 40, priceFactory: 80, priceRetail: 160, unit: 'ct', unitInGrams: 0.2 },

  // Feldspaths
  { id: 'moonstone_rainbow', name: 'Pierre de lune arc-en-ciel', category: 'gemstone', priceSpot: 75, priceFactory: 150, priceRetail: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'moonstone_blue', name: 'Pierre de lune bleue', category: 'gemstone', priceSpot: 40, priceFactory: 80, priceRetail: 160, unit: 'ct', unitInGrams: 0.2 },
  { id: 'moonstone_white', name: 'Pierre de lune blanche', category: 'gemstone', priceSpot: 15, priceFactory: 30, priceRetail: 60, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sunstone_oregon', name: 'Pierre de soleil Oregon', category: 'gemstone', priceSpot: 75, priceFactory: 150, priceRetail: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sunstone_standard', name: 'Pierre de soleil standard', category: 'gemstone', priceSpot: 15, priceFactory: 30, priceRetail: 60, unit: 'ct', unitInGrams: 0.2 },
  { id: 'labradorite', name: 'Labradorite', category: 'gemstone', priceSpot: 10, priceFactory: 20, priceRetail: 40, unit: 'ct', unitInGrams: 0.2 },
  { id: 'amazonite', name: 'Amazonite', category: 'gemstone', priceSpot: 5, priceFactory: 10, priceRetail: 20, unit: 'ct', unitInGrams: 0.2 },

  // Autres pierres
  { id: 'chrysoberyl_cats_eye', name: 'Chrysobéryl oeil-de-chat', category: 'gemstone', priceSpot: 1500, priceFactory: 3000, priceRetail: 6000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'chrysoberyl_standard', name: 'Chrysobéryl standard', category: 'gemstone', priceSpot: 150, priceFactory: 300, priceRetail: 600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sphene', name: 'Sphène (Titanite)', category: 'gemstone', priceSpot: 200, priceFactory: 400, priceRetail: 800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'kyanite', name: 'Cyanite', category: 'gemstone', priceSpot: 25, priceFactory: 50, priceRetail: 100, unit: 'ct', unitInGrams: 0.2 },
  { id: 'iolite', name: 'Iolite', category: 'gemstone', priceSpot: 30, priceFactory: 60, priceRetail: 120, unit: 'ct', unitInGrams: 0.2 },
  { id: 'kunzite', name: 'Kunzite', category: 'gemstone', priceSpot: 50, priceFactory: 100, priceRetail: 200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'hiddenite', name: 'Hiddénite', category: 'gemstone', priceSpot: 250, priceFactory: 500, priceRetail: 1000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diaspore', name: 'Diaspore (Zultanite)', category: 'gemstone', priceSpot: 150, priceFactory: 300, priceRetail: 600, unit: 'ct', unitInGrams: 0.2 },

  // Pierres ornementales
  { id: 'lapis_lazuli_afghan', name: 'Lapis-lazuli Afghanistan', category: 'gemstone', priceSpot: 15, priceFactory: 30, priceRetail: 60, unit: 'ct', unitInGrams: 0.2 },
  { id: 'lapis_lazuli_standard', name: 'Lapis-lazuli standard', category: 'gemstone', priceSpot: 5, priceFactory: 10, priceRetail: 20, unit: 'ct', unitInGrams: 0.2 },
  { id: 'turquoise_sleeping_beauty', name: 'Turquoise Sleeping Beauty', category: 'gemstone', priceSpot: 50, priceFactory: 100, priceRetail: 200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'turquoise_persian', name: 'Turquoise persane', category: 'gemstone', priceSpot: 40, priceFactory: 80, priceRetail: 160, unit: 'ct', unitInGrams: 0.2 },
  { id: 'turquoise_standard', name: 'Turquoise standard', category: 'gemstone', priceSpot: 10, priceFactory: 20, priceRetail: 40, unit: 'ct', unitInGrams: 0.2 },
  { id: 'malachite', name: 'Malachite', category: 'gemstone', priceSpot: 5, priceFactory: 10, priceRetail: 20, unit: 'ct', unitInGrams: 0.2 },
  { id: 'larimar', name: 'Larimar', category: 'gemstone', priceSpot: 20, priceFactory: 40, priceRetail: 80, unit: 'ct', unitInGrams: 0.2 },

  // Corail
  { id: 'coral_oxblood', name: 'Corail sang de boeuf', category: 'gemstone', priceSpot: 150, priceFactory: 300, priceRetail: 600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'coral_red', name: 'Corail rouge', category: 'gemstone', priceSpot: 50, priceFactory: 100, priceRetail: 200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'coral_pink', name: 'Corail rose (Peau d\'ange)', category: 'gemstone', priceSpot: 75, priceFactory: 150, priceRetail: 300, unit: 'ct', unitInGrams: 0.2 },

  // Perles
  { id: 'pearl_south_sea_gold', name: 'Perle South Sea dorée', category: 'gemstone', priceSpot: 750, priceFactory: 1500, priceRetail: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_south_sea_white', name: 'Perle South Sea blanche', category: 'gemstone', priceSpot: 400, priceFactory: 800, priceRetail: 1600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_tahitian', name: 'Perle de Tahiti', category: 'gemstone', priceSpot: 200, priceFactory: 400, priceRetail: 800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_akoya', name: 'Perle Akoya', category: 'gemstone', priceSpot: 75, priceFactory: 150, priceRetail: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_freshwater', name: 'Perle d\'eau douce', category: 'gemstone', priceSpot: 10, priceFactory: 20, priceRetail: 40, unit: 'ct', unitInGrams: 0.2 },

  // Ambre
  { id: 'amber_dominican_blue', name: 'Ambre bleu Dominicain', category: 'gemstone', priceSpot: 100, priceFactory: 200, priceRetail: 400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'amber_baltic', name: 'Ambre baltique', category: 'gemstone', priceSpot: 15, priceFactory: 30, priceRetail: 60, unit: 'ct', unitInGrams: 0.2 },
  { id: 'amber_standard', name: 'Ambre standard', category: 'gemstone', priceSpot: 8, priceFactory: 15, priceRetail: 30, unit: 'ct', unitInGrams: 0.2 },

  // ============================================
  // MÉTAUX DE BASE (par kg) - Source: LME
  // Spot: LME | Usine: +10-20% | Détail: +30-100%
  // ============================================
  { id: 'copper', name: 'Cuivre', category: 'base_metal', priceSpot: 9.20, priceFactory: 10.50, priceRetail: 15, unit: 'kg', unitInGrams: 1000 },
  { id: 'aluminum', name: 'Aluminium', category: 'base_metal', priceSpot: 2.55, priceFactory: 3.00, priceRetail: 5, unit: 'kg', unitInGrams: 1000 },
  { id: 'zinc', name: 'Zinc', category: 'base_metal', priceSpot: 3.10, priceFactory: 3.60, priceRetail: 6, unit: 'kg', unitInGrams: 1000 },
  { id: 'nickel', name: 'Nickel', category: 'base_metal', priceSpot: 17.50, priceFactory: 20, priceRetail: 30, unit: 'kg', unitInGrams: 1000 },
  { id: 'tin', name: 'Étain', category: 'base_metal', priceSpot: 29.00, priceFactory: 33, priceRetail: 50, unit: 'kg', unitInGrams: 1000 },
  { id: 'lead', name: 'Plomb', category: 'base_metal', priceSpot: 2.05, priceFactory: 2.40, priceRetail: 4, unit: 'kg', unitInGrams: 1000 },
  { id: 'iron_ore', name: 'Minerai de fer', category: 'base_metal', priceSpot: 0.11, priceFactory: 0.15, priceRetail: 0.30, unit: 'kg', unitInGrams: 1000 },
  { id: 'steel_hrc', name: 'Acier HRC', category: 'base_metal', priceSpot: 0.75, priceFactory: 0.90, priceRetail: 1.50, unit: 'kg', unitInGrams: 1000 },
  { id: 'stainless_304', name: 'Inox 304', category: 'base_metal', priceSpot: 3.50, priceFactory: 4.20, priceRetail: 7, unit: 'kg', unitInGrams: 1000 },
  { id: 'stainless_316', name: 'Inox 316', category: 'base_metal', priceSpot: 4.80, priceFactory: 5.80, priceRetail: 10, unit: 'kg', unitInGrams: 1000 },
  { id: 'brass', name: 'Laiton', category: 'base_metal', priceSpot: 6.50, priceFactory: 7.80, priceRetail: 12, unit: 'kg', unitInGrams: 1000 },
  { id: 'bronze', name: 'Bronze', category: 'base_metal', priceSpot: 8.00, priceFactory: 9.60, priceRetail: 15, unit: 'kg', unitInGrams: 1000 },
  { id: 'titanium', name: 'Titane', category: 'base_metal', priceSpot: 12.00, priceFactory: 15, priceRetail: 25, unit: 'kg', unitInGrams: 1000 },
  { id: 'titanium_grade5', name: 'Titane Grade 5', category: 'base_metal', priceSpot: 35.00, priceFactory: 45, priceRetail: 70, unit: 'kg', unitInGrams: 1000 },
  { id: 'tungsten', name: 'Tungstène', category: 'base_metal', priceSpot: 35.00, priceFactory: 42, priceRetail: 60, unit: 'kg', unitInGrams: 1000 },
  { id: 'cobalt', name: 'Cobalt', category: 'base_metal', priceSpot: 28.00, priceFactory: 34, priceRetail: 50, unit: 'kg', unitInGrams: 1000 },
  { id: 'molybdenum', name: 'Molybdène', category: 'base_metal', priceSpot: 55.00, priceFactory: 66, priceRetail: 90, unit: 'kg', unitInGrams: 1000 },
  { id: 'lithium_carbonate', name: 'Carbonate de lithium', category: 'base_metal', priceSpot: 15.00, priceFactory: 18, priceRetail: 30, unit: 'kg', unitInGrams: 1000 },
  { id: 'indium', name: 'Indium', category: 'base_metal', priceSpot: 250, priceFactory: 300, priceRetail: 450, unit: 'kg', unitInGrams: 1000 },
  { id: 'gallium', name: 'Gallium', category: 'base_metal', priceSpot: 300, priceFactory: 360, priceRetail: 550, unit: 'kg', unitInGrams: 1000 },
  { id: 'germanium', name: 'Germanium', category: 'base_metal', priceSpot: 1800, priceFactory: 2200, priceRetail: 3500, unit: 'kg', unitInGrams: 1000 },
];

// Catégories pour l'affichage
export const priceCategories = [
  { id: 'precious_metal', name: 'Métaux précieux', icon: 'cube-outline' },
  { id: 'gemstone', name: 'Pierres précieuses', icon: 'diamond-outline' },
  { id: 'base_metal', name: 'Métaux courants', icon: 'hammer-outline' },
];

// Date de dernière mise à jour des cours
export const pricesLastUpdate = '2024-12-16';
