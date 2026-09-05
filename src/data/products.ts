import { Product } from './types';

/**
 * Standard EMI ladder reused across most products: a no-cost short tenure
 * plus interest-bearing longer tenures. Individual products can still
 * override this where it doesn't make sense (e.g. low-ticket accessories).
 */
const standardEmiPlans: Product['emiPlans'] = [
  { id: 'emi-3', tenureMonths: 3, interestRatePct: 0, processingFee: 0, isNoCost: true },
  { id: 'emi-6', tenureMonths: 6, interestRatePct: 8, processingFee: 199 },
  { id: 'emi-9', tenureMonths: 9, interestRatePct: 10, processingFee: 199 },
  { id: 'emi-12', tenureMonths: 12, interestRatePct: 12, processingFee: 249 },
];

export const products: Product[] = [
  {
    id: 'sm-nova-13',
    name: 'Nova 13',
    brand: 'Nova',
    category: 'smartphone',
    imageUrl: 'https://picsum.photos/seed/nova13/600/600',
    basePrice: 59999,
    originalPrice: 64999,
    shortDescription: '6.1" OLED · 48MP dual camera · 5G',
    description:
      'The Nova 13 packs a bright 6.1" OLED display, a 48MP dual camera system, and all-day battery life into a compact aluminium frame. Comes with 2 years of software updates.',
    specs: [
      { label: 'Display', value: '6.1" OLED, 120Hz' },
      { label: 'Processor', value: 'Nova A17 chip' },
      { label: 'Camera', value: '48MP + 12MP dual rear' },
      { label: 'Battery', value: '3200 mAh, 30W fast charging' },
      { label: 'Connectivity', value: '5G, Wi-Fi 6, Bluetooth 5.3' },
    ],
    variantGroups: [
      {
        id: 'storage',
        name: 'Storage',
        type: 'storage',
        options: [
          { id: '128gb', label: '128 GB', priceDelta: 0 },
          { id: '256gb', label: '256 GB', priceDelta: 4000 },
          { id: '512gb', label: '512 GB', priceDelta: 9000 },
        ],
      },
      {
        id: 'color',
        name: 'Colour',
        type: 'color',
        options: [
          { id: 'midnight', label: 'Midnight Black', priceDelta: 0, colorHex: '#1C1C1E' },
          { id: 'ocean', label: 'Ocean Blue', priceDelta: 0, colorHex: '#2C4A6E' },
          { id: 'silver', label: 'Silver', priceDelta: 0, colorHex: '#C9CCD1' },
        ],
      },
    ],
    emiPlans: standardEmiPlans,
  },
  {
    id: 'lt-straton-air-14',
    name: 'Straton Air 14',
    brand: 'Straton',
    category: 'laptop',
    imageUrl: 'https://picsum.photos/seed/stratonair14/600/600',
    basePrice: 74999,
    shortDescription: '14" display · 16GB RAM · 18hr battery',
    description:
      'A slim 14-inch laptop built for everyday productivity — fast enough for heavy multitasking, light enough to carry all day, with a display tuned for long reading sessions.',
    specs: [
      { label: 'Display', value: '14" IPS, 1920×1200' },
      { label: 'Processor', value: 'Straton S2 chip' },
      { label: 'RAM', value: '16 GB unified memory' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Ports', value: '2× USB-C, 1× USB-A, headphone jack' },
    ],
    variantGroups: [
      {
        id: 'storage',
        name: 'Storage',
        type: 'storage',
        options: [
          { id: '256gb', label: '256 GB SSD', priceDelta: 0 },
          { id: '512gb', label: '512 GB SSD', priceDelta: 6000 },
          { id: '1tb', label: '1 TB SSD', priceDelta: 13000 },
        ],
      },
      {
        id: 'color',
        name: 'Colour',
        type: 'color',
        options: [
          { id: 'space-grey', label: 'Space Grey', priceDelta: 0, colorHex: '#5B5C60' },
          { id: 'silver', label: 'Silver', priceDelta: 0, colorHex: '#D9DBDF' },
        ],
      },
    ],
    emiPlans: standardEmiPlans,
  },
  {
    id: 'hp-echo-pro-anc',
    name: 'Echo Pro ANC',
    brand: 'Echo',
    category: 'headphones',
    imageUrl: 'https://picsum.photos/seed/echoproanc/600/600',
    basePrice: 12999,
    originalPrice: 15999,
    shortDescription: 'Active noise cancellation · 30hr battery',
    description:
      'Over-ear headphones with adaptive active noise cancellation and a 30-hour battery. Tuned for balanced sound with a slight bass lift, and foldable for travel.',
    specs: [
      { label: 'Type', value: 'Over-ear, wireless' },
      { label: 'Noise cancellation', value: 'Adaptive ANC' },
      { label: 'Battery', value: '30 hours (ANC on)' },
      { label: 'Connectivity', value: 'Bluetooth 5.3, 3.5mm wired' },
    ],
    variantGroups: [
      {
        id: 'color',
        name: 'Colour',
        type: 'color',
        options: [
          { id: 'black', label: 'Black', priceDelta: 0, colorHex: '#1C1C1E' },
          { id: 'white', label: 'White', priceDelta: 0, colorHex: '#F2F2F2' },
          { id: 'navy', label: 'Navy', priceDelta: 0, colorHex: '#28324A' },
        ],
      },
    ],
    emiPlans: [
      { id: 'emi-3', tenureMonths: 3, interestRatePct: 0, processingFee: 0, isNoCost: true },
      { id: 'emi-6', tenureMonths: 6, interestRatePct: 8, processingFee: 99 },
    ],
  },
  {
    id: 'sw-pulse-2',
    name: 'Pulse Watch 2',
    brand: 'Pulse',
    category: 'smartwatch',
    imageUrl: 'https://picsum.photos/seed/pulsewatch2/600/600',
    basePrice: 18999,
    shortDescription: 'AMOLED display · SpO2 · 7-day battery',
    description:
      'Track workouts, sleep and heart rate with a always-on AMOLED display and up to 7 days of battery life. Water resistant up to 50m.',
    specs: [
      { label: 'Display', value: '1.4" AMOLED, always-on' },
      { label: 'Sensors', value: 'Heart rate, SpO2, accelerometer' },
      { label: 'Battery', value: 'Up to 7 days' },
      { label: 'Water resistance', value: '5 ATM' },
    ],
    variantGroups: [
      {
        id: 'size',
        name: 'Case size',
        type: 'size',
        options: [
          { id: '42mm', label: '42 mm', priceDelta: 0 },
          { id: '46mm', label: '46 mm', priceDelta: 2000 },
        ],
      },
      {
        id: 'color',
        name: 'Colour',
        type: 'color',
        options: [
          { id: 'black', label: 'Black', priceDelta: 0, colorHex: '#1C1C1E' },
          { id: 'silver', label: 'Silver', priceDelta: 0, colorHex: '#C9CCD1' },
          { id: 'rose-gold', label: 'Rose Gold', priceDelta: 500, colorHex: '#B98B82' },
        ],
      },
    ],
    emiPlans: standardEmiPlans,
  },
  {
    id: 'tb-slate-11',
    name: 'Slate Tab 11',
    brand: 'Slate',
    category: 'tablet',
    imageUrl: 'https://picsum.photos/seed/slatetab11/600/600',
    basePrice: 32999,
    originalPrice: 35999,
    shortDescription: '11" display · Stylus support · 8GB RAM',
    description:
      'An 11-inch tablet for note-taking, streaming and light creative work, with stylus support sold separately and a battery that lasts a full day of mixed use.',
    specs: [
      { label: 'Display', value: '11" LCD, 2K resolution' },
      { label: 'RAM', value: '8 GB' },
      { label: 'Battery', value: 'Up to 10 hours mixed use' },
      { label: 'Stylus support', value: 'Yes (sold separately)' },
    ],
    variantGroups: [
      {
        id: 'storage',
        name: 'Storage',
        type: 'storage',
        options: [
          { id: '64gb', label: '64 GB', priceDelta: 0 },
          { id: '128gb', label: '128 GB', priceDelta: 3000 },
          { id: '256gb', label: '256 GB', priceDelta: 6500 },
        ],
      },
      {
        id: 'color',
        name: 'Colour',
        type: 'color',
        options: [
          { id: 'grey', label: 'Graphite Grey', priceDelta: 0, colorHex: '#4A4B4F' },
          { id: 'silver', label: 'Silver', priceDelta: 0, colorHex: '#D9DBDF' },
        ],
      },
    ],
    emiPlans: standardEmiPlans,
  },
];
