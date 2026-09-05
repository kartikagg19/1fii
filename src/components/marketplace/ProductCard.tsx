import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { colors, fontSize, fontWeight, spacing } from '../../theme';
import { Product } from '../../data/types';
import { formatCurrency } from '../../utils/currency';
import { getDefaultVariants, getDiscountPercent, getSelectedPrice, getStartingMonthlyEmi } from '../../utils/productSelection';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  width?: number;
}

export function ProductCard({ product, onPress, width }: ProductCardProps) {
  const defaultVariants = getDefaultVariants(product);
  const price = getSelectedPrice(product, defaultVariants);
  const discountPercent = getDiscountPercent(product);
  const startingEmi = getStartingMonthlyEmi(product, price);
  const variantCount = product.variantGroups.find((group) => group.type !== 'color')?.options.length;

  return (
    <Card onPress={onPress} style={width ? { width } : styles.flexCard}>
      <View style={styles.content}>
        <ProductImage uri={product.imageUrl} category={product.category} size={width ? width - 24 : 96} style={styles.image} />

        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {product.shortDescription}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatCurrency(price)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>{formatCurrency(product.originalPrice)}</Text>
          )}
        </View>

        {discountPercent && <Badge label={`${discountPercent}% off`} tone="accent" />}

        {startingEmi && (
          <Text style={styles.emiText}>EMI from {formatCurrency(startingEmi)}/mo</Text>
        )}

        {variantCount && variantCount > 1 && (
          <Text style={styles.variantText}>{variantCount} storage options</Text>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  flexCard: {
    flex: 1,
  },
  content: {
    padding: spacing.sm,
    gap: 2,
  },
  image: {
    alignSelf: 'center',
    marginBottom: spacing.xs,
  },
  brand: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    fontWeight: fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  name: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    fontWeight: fontWeight.semibold,
  },
  description: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xxs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xxs,
  },
  price: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  originalPrice: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  emiText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: fontWeight.medium,
    marginTop: spacing.xxs,
  },
  variantText: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
  },
});
