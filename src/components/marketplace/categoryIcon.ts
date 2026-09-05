import { Ionicons } from '@expo/vector-icons';
import { ProductCategory } from '../../data/types';

export const categoryIcon: Record<ProductCategory, keyof typeof Ionicons.glyphMap> = {
  smartphone: 'phone-portrait-outline',
  laptop: 'laptop-outline',
  headphones: 'headset-outline',
  smartwatch: 'watch-outline',
  tablet: 'tablet-portrait-outline',
};
