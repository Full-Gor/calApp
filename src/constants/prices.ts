// ============================================
// COURS INTERNATIONAUX - Décembre 2024
// ============================================
// Sources: LBMA, COMEX, Kitco, LME
// Ces prix sont les cours SPOT internationaux
// Le prix en boutique varie selon le pays (+10% à +50%)
// ============================================

export interface MaterialPrice {
  id: string;
  name: string;
  category: 'precious_metal' | 'gemstone' | 'base_metal';
  priceUSD: number;
  unit: string;
  unitInGrams: number;
}

export const materialPrices: MaterialPrice[] = [
  // ============================================
  // MÉTAUX PRÉCIEUX - Cours SPOT (par once troy = 31.1035g)
  // Source: LBMA, COMEX - Décembre 2024
  // ============================================
  { id: 'gold_24k', name: 'Or 24K (999)', category: 'precious_metal', priceUSD: 2620, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_22k', name: 'Or 22K (916)', category: 'precious_metal', priceUSD: 2401, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_21k', name: 'Or 21K (875)', category: 'precious_metal', priceUSD: 2293, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_18k', name: 'Or 18K (750)', category: 'precious_metal', priceUSD: 1965, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_14k', name: 'Or 14K (585)', category: 'precious_metal', priceUSD: 1533, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_10k', name: 'Or 10K (417)', category: 'precious_metal', priceUSD: 1092, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_9k', name: 'Or 9K (375)', category: 'precious_metal', priceUSD: 983, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'silver', name: 'Argent (999)', category: 'precious_metal', priceUSD: 30.50, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'platinum', name: 'Platine', category: 'precious_metal', priceUSD: 940, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'palladium', name: 'Palladium', category: 'precious_metal', priceUSD: 970, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'rhodium', name: 'Rhodium', category: 'precious_metal', priceUSD: 4650, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'iridium', name: 'Iridium', category: 'precious_metal', priceUSD: 4800, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'ruthenium', name: 'Ruthénium', category: 'precious_metal', priceUSD: 475, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'osmium', name: 'Osmium', category: 'precious_metal', priceUSD: 400, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'rhenium', name: 'Rhénium', category: 'precious_metal', priceUSD: 1450, unit: 'oz t', unitInGrams: 31.1035 },

  // ============================================
  // PIERRES PRÉCIEUSES - Prix indicatifs par carat
  // Qualité moyenne-bonne, taille standard
  // ATTENTION: Prix très variables selon 4C (Cut, Color, Clarity, Carat)
  // ============================================

  // Diamants
  { id: 'diamond_d_if', name: 'Diamant D-IF (parfait)', category: 'gemstone', priceUSD: 25000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_d_vvs1', name: 'Diamant D-VVS1', category: 'gemstone', priceUSD: 15000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_g_vs1', name: 'Diamant G-VS1', category: 'gemstone', priceUSD: 7500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_h_vs2', name: 'Diamant H-VS2', category: 'gemstone', priceUSD: 5500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_i_si1', name: 'Diamant I-SI1', category: 'gemstone', priceUSD: 3500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_fancy_yellow', name: 'Diamant jaune fancy', category: 'gemstone', priceUSD: 8000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_fancy_pink', name: 'Diamant rose fancy', category: 'gemstone', priceUSD: 50000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_fancy_blue', name: 'Diamant bleu fancy', category: 'gemstone', priceUSD: 100000, unit: 'ct', unitInGrams: 0.2 },

  // Rubis
  { id: 'ruby_burma_aaa', name: 'Rubis Birmanie AAA', category: 'gemstone', priceUSD: 25000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ruby_burma_aa', name: 'Rubis Birmanie AA', category: 'gemstone', priceUSD: 12000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ruby_mozambique', name: 'Rubis Mozambique', category: 'gemstone', priceUSD: 4000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ruby_thailand', name: 'Rubis Thaïlande', category: 'gemstone', priceUSD: 2500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ruby_standard', name: 'Rubis standard', category: 'gemstone', priceUSD: 1500, unit: 'ct', unitInGrams: 0.2 },

  // Saphirs
  { id: 'sapphire_kashmir', name: 'Saphir Cachemire', category: 'gemstone', priceUSD: 50000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_burma_blue', name: 'Saphir Birmanie bleu', category: 'gemstone', priceUSD: 15000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_ceylon_blue', name: 'Saphir Ceylan bleu', category: 'gemstone', priceUSD: 8000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_blue_standard', name: 'Saphir bleu standard', category: 'gemstone', priceUSD: 2500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_padparadscha', name: 'Saphir Padparadscha', category: 'gemstone', priceUSD: 20000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_pink', name: 'Saphir rose', category: 'gemstone', priceUSD: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_yellow', name: 'Saphir jaune', category: 'gemstone', priceUSD: 1200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_orange', name: 'Saphir orange', category: 'gemstone', priceUSD: 1800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_green', name: 'Saphir vert', category: 'gemstone', priceUSD: 800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_star', name: 'Saphir étoilé', category: 'gemstone', priceUSD: 1500, unit: 'ct', unitInGrams: 0.2 },

  // Émeraudes
  { id: 'emerald_colombian_aaa', name: 'Émeraude Colombie AAA', category: 'gemstone', priceUSD: 30000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'emerald_colombian_aa', name: 'Émeraude Colombie AA', category: 'gemstone', priceUSD: 12000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'emerald_zambian', name: 'Émeraude Zambie', category: 'gemstone', priceUSD: 5000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'emerald_brazilian', name: 'Émeraude Brésil', category: 'gemstone', priceUSD: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'emerald_standard', name: 'Émeraude standard', category: 'gemstone', priceUSD: 1500, unit: 'ct', unitInGrams: 0.2 },

  // Autres pierres précieuses rares
  { id: 'alexandrite_russian', name: 'Alexandrite Russie', category: 'gemstone', priceUSD: 70000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'alexandrite_brazilian', name: 'Alexandrite Brésil', category: 'gemstone', priceUSD: 15000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'paraiba_brazilian', name: 'Tourmaline Paraïba Brésil', category: 'gemstone', priceUSD: 30000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'paraiba_african', name: 'Tourmaline Paraïba Afrique', category: 'gemstone', priceUSD: 5000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'red_beryl', name: 'Béryl rouge (Bixbite)', category: 'gemstone', priceUSD: 10000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'musgravite', name: 'Musgravite', category: 'gemstone', priceUSD: 35000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'painite', name: 'Painite', category: 'gemstone', priceUSD: 60000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'taaffeite', name: 'Taafféite', category: 'gemstone', priceUSD: 35000, unit: 'ct', unitInGrams: 0.2 },

  // Spinelles
  { id: 'spinel_red_burma', name: 'Spinelle rouge Birmanie', category: 'gemstone', priceUSD: 8000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'spinel_cobalt_blue', name: 'Spinelle cobalt bleu', category: 'gemstone', priceUSD: 5000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'spinel_pink', name: 'Spinelle rose', category: 'gemstone', priceUSD: 2000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'spinel_standard', name: 'Spinelle standard', category: 'gemstone', priceUSD: 500, unit: 'ct', unitInGrams: 0.2 },

  // Grenats
  { id: 'garnet_demantoid', name: 'Grenat démantoïde', category: 'gemstone', priceUSD: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_tsavorite', name: 'Grenat tsavorite', category: 'gemstone', priceUSD: 2500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_spessartine', name: 'Grenat spessartine', category: 'gemstone', priceUSD: 800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_rhodolite', name: 'Grenat rhodolite', category: 'gemstone', priceUSD: 200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_almandine', name: 'Grenat almandin', category: 'gemstone', priceUSD: 50, unit: 'ct', unitInGrams: 0.2 },

  // Tourmalines
  { id: 'tourmaline_chrome', name: 'Tourmaline chrome', category: 'gemstone', priceUSD: 1500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_indicolite', name: 'Tourmaline indicolite', category: 'gemstone', priceUSD: 800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_rubellite', name: 'Tourmaline rubellite', category: 'gemstone', priceUSD: 600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_watermelon', name: 'Tourmaline pastèque', category: 'gemstone', priceUSD: 500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_green', name: 'Tourmaline verte', category: 'gemstone', priceUSD: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_pink', name: 'Tourmaline rose', category: 'gemstone', priceUSD: 250, unit: 'ct', unitInGrams: 0.2 },

  // Béryls
  { id: 'aquamarine_santa_maria', name: 'Aigue-marine Santa Maria', category: 'gemstone', priceUSD: 1500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'aquamarine_standard', name: 'Aigue-marine standard', category: 'gemstone', priceUSD: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'morganite', name: 'Morganite', category: 'gemstone', priceUSD: 200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'heliodor', name: 'Héliodore', category: 'gemstone', priceUSD: 150, unit: 'ct', unitInGrams: 0.2 },
  { id: 'goshenite', name: 'Goshénite', category: 'gemstone', priceUSD: 50, unit: 'ct', unitInGrams: 0.2 },

  // Opales
  { id: 'opal_black_lightning', name: 'Opale noire Lightning Ridge', category: 'gemstone', priceUSD: 15000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_black_standard', name: 'Opale noire standard', category: 'gemstone', priceUSD: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_boulder', name: 'Opale boulder', category: 'gemstone', priceUSD: 500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_white', name: 'Opale blanche', category: 'gemstone', priceUSD: 150, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_fire_mexican', name: 'Opale de feu Mexique', category: 'gemstone', priceUSD: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_ethiopian', name: 'Opale Éthiopie', category: 'gemstone', priceUSD: 100, unit: 'ct', unitInGrams: 0.2 },

  // Jades
  { id: 'jade_imperial_burma', name: 'Jade impérial Birmanie', category: 'gemstone', priceUSD: 30000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'jade_jadeite_green', name: 'Jadéite verte', category: 'gemstone', priceUSD: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'jade_jadeite_lavender', name: 'Jadéite lavande', category: 'gemstone', priceUSD: 2000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'jade_nephrite', name: 'Jade néphrite', category: 'gemstone', priceUSD: 50, unit: 'ct', unitInGrams: 0.2 },

  // Tanzanite
  { id: 'tanzanite_aaa', name: 'Tanzanite AAA', category: 'gemstone', priceUSD: 1200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tanzanite_aa', name: 'Tanzanite AA', category: 'gemstone', priceUSD: 600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tanzanite_standard', name: 'Tanzanite standard', category: 'gemstone', priceUSD: 300, unit: 'ct', unitInGrams: 0.2 },

  // Topazes
  { id: 'topaz_imperial', name: 'Topaze impériale', category: 'gemstone', priceUSD: 1000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'topaz_pink', name: 'Topaze rose', category: 'gemstone', priceUSD: 500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'topaz_blue_swiss', name: 'Topaze Swiss Blue', category: 'gemstone', priceUSD: 30, unit: 'ct', unitInGrams: 0.2 },
  { id: 'topaz_blue_london', name: 'Topaze London Blue', category: 'gemstone', priceUSD: 25, unit: 'ct', unitInGrams: 0.2 },
  { id: 'topaz_white', name: 'Topaze blanche', category: 'gemstone', priceUSD: 10, unit: 'ct', unitInGrams: 0.2 },

  // Quartz
  { id: 'amethyst_deep', name: 'Améthyste profonde', category: 'gemstone', priceUSD: 50, unit: 'ct', unitInGrams: 0.2 },
  { id: 'amethyst_standard', name: 'Améthyste standard', category: 'gemstone', priceUSD: 15, unit: 'ct', unitInGrams: 0.2 },
  { id: 'citrine_natural', name: 'Citrine naturelle', category: 'gemstone', priceUSD: 30, unit: 'ct', unitInGrams: 0.2 },
  { id: 'citrine_heated', name: 'Citrine chauffée', category: 'gemstone', priceUSD: 10, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ametrine', name: 'Amétrine', category: 'gemstone', priceUSD: 25, unit: 'ct', unitInGrams: 0.2 },
  { id: 'rose_quartz', name: 'Quartz rose', category: 'gemstone', priceUSD: 5, unit: 'ct', unitInGrams: 0.2 },
  { id: 'smoky_quartz', name: 'Quartz fumé', category: 'gemstone', priceUSD: 5, unit: 'ct', unitInGrams: 0.2 },
  { id: 'prasiolite', name: 'Prasiolithe', category: 'gemstone', priceUSD: 10, unit: 'ct', unitInGrams: 0.2 },

  // Zircons
  { id: 'zircon_blue', name: 'Zircon bleu', category: 'gemstone', priceUSD: 200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'zircon_champagne', name: 'Zircon champagne', category: 'gemstone', priceUSD: 100, unit: 'ct', unitInGrams: 0.2 },
  { id: 'zircon_white', name: 'Zircon blanc', category: 'gemstone', priceUSD: 75, unit: 'ct', unitInGrams: 0.2 },

  // Péridot
  { id: 'peridot_pakistan', name: 'Péridot Pakistan', category: 'gemstone', priceUSD: 200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'peridot_standard', name: 'Péridot standard', category: 'gemstone', priceUSD: 80, unit: 'ct', unitInGrams: 0.2 },

  // Feldspaths
  { id: 'moonstone_rainbow', name: 'Pierre de lune arc-en-ciel', category: 'gemstone', priceUSD: 150, unit: 'ct', unitInGrams: 0.2 },
  { id: 'moonstone_blue', name: 'Pierre de lune bleue', category: 'gemstone', priceUSD: 80, unit: 'ct', unitInGrams: 0.2 },
  { id: 'moonstone_white', name: 'Pierre de lune blanche', category: 'gemstone', priceUSD: 30, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sunstone_oregon', name: 'Pierre de soleil Oregon', category: 'gemstone', priceUSD: 150, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sunstone_standard', name: 'Pierre de soleil standard', category: 'gemstone', priceUSD: 30, unit: 'ct', unitInGrams: 0.2 },
  { id: 'labradorite', name: 'Labradorite', category: 'gemstone', priceUSD: 20, unit: 'ct', unitInGrams: 0.2 },
  { id: 'amazonite', name: 'Amazonite', category: 'gemstone', priceUSD: 10, unit: 'ct', unitInGrams: 0.2 },

  // Autres pierres
  { id: 'chrysoberyl_cats_eye', name: 'Chrysobéryl oeil-de-chat', category: 'gemstone', priceUSD: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'chrysoberyl_standard', name: 'Chrysobéryl standard', category: 'gemstone', priceUSD: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'kornerupine', name: 'Kornérupine', category: 'gemstone', priceUSD: 500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sphene', name: 'Sphène (Titanite)', category: 'gemstone', priceUSD: 400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'kyanite', name: 'Cyanite', category: 'gemstone', priceUSD: 50, unit: 'ct', unitInGrams: 0.2 },
  { id: 'iolite', name: 'Iolite', category: 'gemstone', priceUSD: 60, unit: 'ct', unitInGrams: 0.2 },
  { id: 'kunzite', name: 'Kunzite', category: 'gemstone', priceUSD: 100, unit: 'ct', unitInGrams: 0.2 },
  { id: 'hiddenite', name: 'Hiddénite', category: 'gemstone', priceUSD: 500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diaspore', name: 'Diaspore (Zultanite)', category: 'gemstone', priceUSD: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'danburite', name: 'Danburite', category: 'gemstone', priceUSD: 50, unit: 'ct', unitInGrams: 0.2 },

  // Pierres semi-précieuses et ornementales
  { id: 'lapis_lazuli_afghan', name: 'Lapis-lazuli Afghanistan', category: 'gemstone', priceUSD: 30, unit: 'ct', unitInGrams: 0.2 },
  { id: 'lapis_lazuli_standard', name: 'Lapis-lazuli standard', category: 'gemstone', priceUSD: 10, unit: 'ct', unitInGrams: 0.2 },
  { id: 'turquoise_sleeping_beauty', name: 'Turquoise Sleeping Beauty', category: 'gemstone', priceUSD: 100, unit: 'ct', unitInGrams: 0.2 },
  { id: 'turquoise_persian', name: 'Turquoise persane', category: 'gemstone', priceUSD: 80, unit: 'ct', unitInGrams: 0.2 },
  { id: 'turquoise_standard', name: 'Turquoise standard', category: 'gemstone', priceUSD: 20, unit: 'ct', unitInGrams: 0.2 },
  { id: 'malachite', name: 'Malachite', category: 'gemstone', priceUSD: 10, unit: 'ct', unitInGrams: 0.2 },
  { id: 'azurite', name: 'Azurite', category: 'gemstone', priceUSD: 15, unit: 'ct', unitInGrams: 0.2 },
  { id: 'rhodochrosite', name: 'Rhodochrosite', category: 'gemstone', priceUSD: 30, unit: 'ct', unitInGrams: 0.2 },
  { id: 'charoite', name: 'Charoïte', category: 'gemstone', priceUSD: 20, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sugilite', name: 'Sugilite', category: 'gemstone', priceUSD: 50, unit: 'ct', unitInGrams: 0.2 },
  { id: 'larimar', name: 'Larimar', category: 'gemstone', priceUSD: 40, unit: 'ct', unitInGrams: 0.2 },

  // Corail
  { id: 'coral_oxblood', name: 'Corail sang de boeuf', category: 'gemstone', priceUSD: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'coral_red', name: 'Corail rouge', category: 'gemstone', priceUSD: 100, unit: 'ct', unitInGrams: 0.2 },
  { id: 'coral_pink', name: 'Corail rose (Peau d\'ange)', category: 'gemstone', priceUSD: 150, unit: 'ct', unitInGrams: 0.2 },

  // Perles (par carat ou par pièce selon taille)
  { id: 'pearl_south_sea_gold', name: 'Perle South Sea dorée', category: 'gemstone', priceUSD: 1500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_south_sea_white', name: 'Perle South Sea blanche', category: 'gemstone', priceUSD: 800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_tahitian', name: 'Perle de Tahiti', category: 'gemstone', priceUSD: 400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_akoya', name: 'Perle Akoya', category: 'gemstone', priceUSD: 150, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_freshwater', name: 'Perle d\'eau douce', category: 'gemstone', priceUSD: 20, unit: 'ct', unitInGrams: 0.2 },

  // Ambre
  { id: 'amber_dominican_blue', name: 'Ambre bleu Dominicain', category: 'gemstone', priceUSD: 200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'amber_baltic', name: 'Ambre baltique', category: 'gemstone', priceUSD: 30, unit: 'ct', unitInGrams: 0.2 },
  { id: 'amber_standard', name: 'Ambre standard', category: 'gemstone', priceUSD: 15, unit: 'ct', unitInGrams: 0.2 },

  // ============================================
  // MÉTAUX DE BASE - Cours LME (par kg)
  // Source: London Metal Exchange - Décembre 2024
  // ============================================
  { id: 'copper', name: 'Cuivre', category: 'base_metal', priceUSD: 9.20, unit: 'kg', unitInGrams: 1000 },
  { id: 'aluminum', name: 'Aluminium', category: 'base_metal', priceUSD: 2.55, unit: 'kg', unitInGrams: 1000 },
  { id: 'zinc', name: 'Zinc', category: 'base_metal', priceUSD: 3.10, unit: 'kg', unitInGrams: 1000 },
  { id: 'nickel', name: 'Nickel', category: 'base_metal', priceUSD: 17.50, unit: 'kg', unitInGrams: 1000 },
  { id: 'tin', name: 'Étain', category: 'base_metal', priceUSD: 29.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'lead', name: 'Plomb', category: 'base_metal', priceUSD: 2.05, unit: 'kg', unitInGrams: 1000 },
  { id: 'iron_ore', name: 'Minerai de fer', category: 'base_metal', priceUSD: 0.11, unit: 'kg', unitInGrams: 1000 },
  { id: 'steel_hrc', name: 'Acier HRC', category: 'base_metal', priceUSD: 0.75, unit: 'kg', unitInGrams: 1000 },
  { id: 'stainless_304', name: 'Inox 304', category: 'base_metal', priceUSD: 3.50, unit: 'kg', unitInGrams: 1000 },
  { id: 'stainless_316', name: 'Inox 316', category: 'base_metal', priceUSD: 4.80, unit: 'kg', unitInGrams: 1000 },
  { id: 'brass', name: 'Laiton', category: 'base_metal', priceUSD: 6.50, unit: 'kg', unitInGrams: 1000 },
  { id: 'bronze', name: 'Bronze', category: 'base_metal', priceUSD: 8.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'titanium', name: 'Titane', category: 'base_metal', priceUSD: 12.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'titanium_grade5', name: 'Titane Grade 5', category: 'base_metal', priceUSD: 35.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'tungsten', name: 'Tungstène', category: 'base_metal', priceUSD: 35.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'cobalt', name: 'Cobalt', category: 'base_metal', priceUSD: 28.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'molybdenum', name: 'Molybdène', category: 'base_metal', priceUSD: 55.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'chromium', name: 'Chrome', category: 'base_metal', priceUSD: 10.50, unit: 'kg', unitInGrams: 1000 },
  { id: 'manganese', name: 'Manganèse', category: 'base_metal', priceUSD: 2.20, unit: 'kg', unitInGrams: 1000 },
  { id: 'magnesium', name: 'Magnésium', category: 'base_metal', priceUSD: 3.20, unit: 'kg', unitInGrams: 1000 },
  { id: 'lithium_carbonate', name: 'Carbonate de lithium', category: 'base_metal', priceUSD: 15.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'silicon', name: 'Silicium', category: 'base_metal', priceUSD: 2.80, unit: 'kg', unitInGrams: 1000 },
  { id: 'vanadium', name: 'Vanadium', category: 'base_metal', priceUSD: 8.50, unit: 'kg', unitInGrams: 1000 },
  { id: 'antimony', name: 'Antimoine', category: 'base_metal', priceUSD: 12.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'bismuth', name: 'Bismuth', category: 'base_metal', priceUSD: 6.50, unit: 'kg', unitInGrams: 1000 },
  { id: 'cadmium', name: 'Cadmium', category: 'base_metal', priceUSD: 3.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'indium', name: 'Indium', category: 'base_metal', priceUSD: 250.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'gallium', name: 'Gallium', category: 'base_metal', priceUSD: 300.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'germanium', name: 'Germanium', category: 'base_metal', priceUSD: 1800.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'tellurium', name: 'Tellure', category: 'base_metal', priceUSD: 85.00, unit: 'kg', unitInGrams: 1000 },
  { id: 'selenium', name: 'Sélénium', category: 'base_metal', priceUSD: 25.00, unit: 'kg', unitInGrams: 1000 },
];

// Catégories pour l'affichage
export const priceCategories = [
  { id: 'precious_metal', name: 'Métaux précieux', icon: 'cube-outline' },
  { id: 'gemstone', name: 'Pierres précieuses', icon: 'diamond-outline' },
  { id: 'base_metal', name: 'Métaux courants', icon: 'hammer-outline' },
];

// Date de dernière mise à jour des cours
export const pricesLastUpdate = '2024-12-16';
