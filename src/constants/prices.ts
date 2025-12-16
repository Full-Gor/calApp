// Prix approximatifs en USD par unité standard
// Métaux précieux: prix par once troy (31.1g)
// Pierres précieuses: prix par carat
// Métaux de base: prix par kg

export interface MaterialPrice {
  id: string;
  name: string;
  category: 'precious_metal' | 'gemstone' | 'base_metal';
  priceUSD: number;
  unit: string;
  unitInGrams: number; // Pour convertir
}

export const materialPrices: MaterialPrice[] = [
  // Métaux précieux (prix par once troy = 31.1035g)
  { id: 'gold_24k', name: 'Or 24K (pur)', category: 'precious_metal', priceUSD: 2650, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_22k', name: 'Or 22K', category: 'precious_metal', priceUSD: 2430, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_18k', name: 'Or 18K', category: 'precious_metal', priceUSD: 1988, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_14k', name: 'Or 14K', category: 'precious_metal', priceUSD: 1546, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'gold_10k', name: 'Or 10K', category: 'precious_metal', priceUSD: 1104, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'silver', name: 'Argent', category: 'precious_metal', priceUSD: 31, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'platinum', name: 'Platine', category: 'precious_metal', priceUSD: 1020, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'palladium', name: 'Palladium', category: 'precious_metal', priceUSD: 1150, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'rhodium', name: 'Rhodium', category: 'precious_metal', priceUSD: 4850, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'iridium', name: 'Iridium', category: 'precious_metal', priceUSD: 4700, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'ruthenium', name: 'Ruthénium', category: 'precious_metal', priceUSD: 450, unit: 'oz t', unitInGrams: 31.1035 },
  { id: 'osmium', name: 'Osmium', category: 'precious_metal', priceUSD: 400, unit: 'oz t', unitInGrams: 31.1035 },

  // Pierres précieuses (prix moyen par carat - varie beaucoup selon qualité)
  { id: 'diamond', name: 'Diamant (1ct, VS1, G)', category: 'gemstone', priceUSD: 5500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'diamond_fancy', name: 'Diamant fancy (coloré)', category: 'gemstone', priceUSD: 15000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ruby', name: 'Rubis (qualité fine)', category: 'gemstone', priceUSD: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'ruby_burma', name: 'Rubis de Birmanie', category: 'gemstone', priceUSD: 12000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_blue', name: 'Saphir bleu', category: 'gemstone', priceUSD: 2500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_kashmir', name: 'Saphir du Cachemire', category: 'gemstone', priceUSD: 8000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_pink', name: 'Saphir rose', category: 'gemstone', priceUSD: 1800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sapphire_yellow', name: 'Saphir jaune', category: 'gemstone', priceUSD: 800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'emerald', name: 'Émeraude (qualité fine)', category: 'gemstone', priceUSD: 3500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'emerald_colombian', name: 'Émeraude de Colombie', category: 'gemstone', priceUSD: 8000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'alexandrite', name: 'Alexandrite', category: 'gemstone', priceUSD: 12000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'paraiba', name: 'Tourmaline Paraïba', category: 'gemstone', priceUSD: 10000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tanzanite', name: 'Tanzanite', category: 'gemstone', priceUSD: 600, unit: 'ct', unitInGrams: 0.2 },
  { id: 'aquamarine', name: 'Aigue-marine', category: 'gemstone', priceUSD: 300, unit: 'ct', unitInGrams: 0.2 },
  { id: 'morganite', name: 'Morganite', category: 'gemstone', priceUSD: 150, unit: 'ct', unitInGrams: 0.2 },
  { id: 'topaz_imperial', name: 'Topaze impériale', category: 'gemstone', priceUSD: 1000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'topaz_blue', name: 'Topaze bleue', category: 'gemstone', priceUSD: 25, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_black', name: 'Opale noire', category: 'gemstone', priceUSD: 3500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_white', name: 'Opale blanche', category: 'gemstone', priceUSD: 150, unit: 'ct', unitInGrams: 0.2 },
  { id: 'opal_fire', name: 'Opale de feu', category: 'gemstone', priceUSD: 200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'jade_imperial', name: 'Jade impérial', category: 'gemstone', priceUSD: 3000, unit: 'ct', unitInGrams: 0.2 },
  { id: 'jade_nephrite', name: 'Jade néphrite', category: 'gemstone', priceUSD: 50, unit: 'ct', unitInGrams: 0.2 },
  { id: 'spinel_red', name: 'Spinelle rouge', category: 'gemstone', priceUSD: 800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'spinel_cobalt', name: 'Spinelle cobalt', category: 'gemstone', priceUSD: 2500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_demantoid', name: 'Grenat démantoïde', category: 'gemstone', priceUSD: 1500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_tsavorite', name: 'Grenat tsavorite', category: 'gemstone', priceUSD: 1200, unit: 'ct', unitInGrams: 0.2 },
  { id: 'garnet_rhodolite', name: 'Grenat rhodolite', category: 'gemstone', priceUSD: 100, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_green', name: 'Tourmaline verte', category: 'gemstone', priceUSD: 400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_pink', name: 'Tourmaline rose', category: 'gemstone', priceUSD: 350, unit: 'ct', unitInGrams: 0.2 },
  { id: 'tourmaline_watermelon', name: 'Tourmaline pastèque', category: 'gemstone', priceUSD: 500, unit: 'ct', unitInGrams: 0.2 },
  { id: 'peridot', name: 'Péridot', category: 'gemstone', priceUSD: 80, unit: 'ct', unitInGrams: 0.2 },
  { id: 'amethyst', name: 'Améthyste', category: 'gemstone', priceUSD: 20, unit: 'ct', unitInGrams: 0.2 },
  { id: 'citrine', name: 'Citrine', category: 'gemstone', priceUSD: 15, unit: 'ct', unitInGrams: 0.2 },
  { id: 'zircon_blue', name: 'Zircon bleu', category: 'gemstone', priceUSD: 150, unit: 'ct', unitInGrams: 0.2 },
  { id: 'moonstone', name: 'Pierre de lune', category: 'gemstone', priceUSD: 50, unit: 'ct', unitInGrams: 0.2 },
  { id: 'sunstone', name: 'Pierre de soleil', category: 'gemstone', priceUSD: 40, unit: 'ct', unitInGrams: 0.2 },
  { id: 'labradorite', name: 'Labradorite', category: 'gemstone', priceUSD: 25, unit: 'ct', unitInGrams: 0.2 },
  { id: 'lapis_lazuli', name: 'Lapis-lazuli', category: 'gemstone', priceUSD: 10, unit: 'ct', unitInGrams: 0.2 },
  { id: 'turquoise', name: 'Turquoise', category: 'gemstone', priceUSD: 30, unit: 'ct', unitInGrams: 0.2 },
  { id: 'coral_red', name: 'Corail rouge', category: 'gemstone', priceUSD: 100, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_south_sea', name: 'Perle des mers du Sud', category: 'gemstone', priceUSD: 800, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_tahitian', name: 'Perle de Tahiti', category: 'gemstone', priceUSD: 400, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_akoya', name: 'Perle Akoya', category: 'gemstone', priceUSD: 150, unit: 'ct', unitInGrams: 0.2 },
  { id: 'pearl_freshwater', name: 'Perle d\'eau douce', category: 'gemstone', priceUSD: 20, unit: 'ct', unitInGrams: 0.2 },
  { id: 'amber', name: 'Ambre', category: 'gemstone', priceUSD: 30, unit: 'ct', unitInGrams: 0.2 },

  // Métaux de base (prix par kg)
  { id: 'copper', name: 'Cuivre', category: 'base_metal', priceUSD: 8.5, unit: 'kg', unitInGrams: 1000 },
  { id: 'aluminum', name: 'Aluminium', category: 'base_metal', priceUSD: 2.3, unit: 'kg', unitInGrams: 1000 },
  { id: 'zinc', name: 'Zinc', category: 'base_metal', priceUSD: 2.6, unit: 'kg', unitInGrams: 1000 },
  { id: 'nickel', name: 'Nickel', category: 'base_metal', priceUSD: 16, unit: 'kg', unitInGrams: 1000 },
  { id: 'tin', name: 'Étain', category: 'base_metal', priceUSD: 25, unit: 'kg', unitInGrams: 1000 },
  { id: 'lead', name: 'Plomb', category: 'base_metal', priceUSD: 2.1, unit: 'kg', unitInGrams: 1000 },
  { id: 'iron', name: 'Fer', category: 'base_metal', priceUSD: 0.12, unit: 'kg', unitInGrams: 1000 },
  { id: 'steel', name: 'Acier', category: 'base_metal', priceUSD: 0.8, unit: 'kg', unitInGrams: 1000 },
  { id: 'stainless_steel', name: 'Acier inoxydable', category: 'base_metal', priceUSD: 2.5, unit: 'kg', unitInGrams: 1000 },
  { id: 'brass', name: 'Laiton', category: 'base_metal', priceUSD: 5.5, unit: 'kg', unitInGrams: 1000 },
  { id: 'bronze', name: 'Bronze', category: 'base_metal', priceUSD: 7, unit: 'kg', unitInGrams: 1000 },
  { id: 'titanium', name: 'Titane', category: 'base_metal', priceUSD: 35, unit: 'kg', unitInGrams: 1000 },
  { id: 'tungsten', name: 'Tungstène', category: 'base_metal', priceUSD: 25, unit: 'kg', unitInGrams: 1000 },
  { id: 'cobalt', name: 'Cobalt', category: 'base_metal', priceUSD: 33, unit: 'kg', unitInGrams: 1000 },
  { id: 'molybdenum', name: 'Molybdène', category: 'base_metal', priceUSD: 45, unit: 'kg', unitInGrams: 1000 },
  { id: 'chromium', name: 'Chrome', category: 'base_metal', priceUSD: 9, unit: 'kg', unitInGrams: 1000 },
  { id: 'manganese', name: 'Manganèse', category: 'base_metal', priceUSD: 2, unit: 'kg', unitInGrams: 1000 },
  { id: 'magnesium', name: 'Magnésium', category: 'base_metal', priceUSD: 3, unit: 'kg', unitInGrams: 1000 },
  { id: 'lithium', name: 'Lithium', category: 'base_metal', priceUSD: 20, unit: 'kg', unitInGrams: 1000 },
  { id: 'silicon', name: 'Silicium', category: 'base_metal', priceUSD: 2.5, unit: 'kg', unitInGrams: 1000 },
];

// Catégories pour l'affichage
export const priceCategories = [
  { id: 'precious_metal', name: 'Métaux précieux', icon: 'cube-outline' },
  { id: 'gemstone', name: 'Pierres précieuses', icon: 'diamond-outline' },
  { id: 'base_metal', name: 'Métaux courants', icon: 'hammer-outline' },
];
