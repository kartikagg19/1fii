import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../../components/ui/Button';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { Badge } from '../../components/ui/Badge';
import { ProductImage, VariantSelector, EmiPlanSelector, SpecList } from '../../components/marketplace';
import { useAsyncData } from '../../hooks/useAsyncData';
import { marketplaceService } from '../../services/marketplaceService';
import { RootStackParamList } from '../../navigation/types';
import { colors, fontSize, fontWeight, spacing } from '../../theme';
import { formatCurrency } from '../../utils/currency';
import { getDefaultVariants, getDiscountPercent, getSelectedPrice } from '../../utils/productSelection';
import { calculateEmi } from '../../utils/emi';
import { SelectedVariants } from '../../data/types';

type Route = RouteProp<RootStackParamList, 'ProductDetails'>;
type Navigation = NativeStackNavigationProp<RootStackParamList, 'ProductDetails'>;

export function ProductDetailsScreen() {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Navigation>();

  const { data: product, loading, error, retry } = useAsyncData(
    () => marketplaceService.getProductById(params.productId),
    [params.productId]
  );

  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>({});
  const [selectedEmiPlanId, setSelectedEmiPlanId] = useState<string | undefined>();
  const [isContinuing, setIsContinuing] = useState(false);
  const [continueError, setContinueError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedVariants(getDefaultVariants(product));
      setSelectedEmiPlanId(product.emiPlans[0]?.id);
    }
  }, [product]);

  const price = useMemo(
    () => (product ? getSelectedPrice(product, selectedVariants) : 0),
    [product, selectedVariants]
  );

  const discountPercent = product ? getDiscountPercent(product) : null;
  const requiresEmiSelection = !!product && product.emiPlans.length > 0;
  const canContinue = !!product && (!requiresEmiSelection || !!selectedEmiPlanId);

  const handleSelectVariant = (groupId: string, optionId: string) => {
    setSelectedVariants((prev) => ({ ...prev, [groupId]: optionId }));
  };

  const handleContinue = async () => {
    if (!product || !canContinue) return;

    setContinueError(null);
    setIsContinuing(true);
    try {
      const emiPlan = product.emiPlans.find((plan) => plan.id === selectedEmiPlanId);
      const { referenceId } = await marketplaceService.continuePurchase({
        productId: product.id,
        selectedVariants,
        emiPlan: emiPlan!,
        totalPrice: price,
      });

      const variantSummary = product.variantGroups
        .map((group) => group.options.find((o) => o.id === selectedVariants[group.id])?.label)
        .filter(Boolean)
        .join(', ');

      const monthlyAmount = emiPlan
        ? calculateEmi({
            principal: price,
            tenureMonths: emiPlan.tenureMonths,
            interestRatePct: emiPlan.interestRatePct,
            processingFee: emiPlan.processingFee,
          }).monthlyAmount
        : price;

      navigation.navigate('MarketplaceConfirmation', {
        productName: product.name,
        variantSummary,
        tenureMonths: emiPlan?.tenureMonths ?? 0,
        monthlyAmount,
        referenceId,
      });
    } catch (err) {
      setContinueError(err instanceof Error ? err.message : 'Could not confirm your selection');
    } finally {
      setIsContinuing(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContent}>
          <Skeleton width={200} height={200} style={styles.centerSelf} />
          <Skeleton width="60%" height={14} style={styles.gapTop} />
          <Skeleton width="40%" height={22} style={styles.gapTop} />
          <Skeleton width="90%" height={60} style={styles.gapTop} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          message={error === 'Product not found' ? 'This product is no longer available.' : undefined}
          onRetry={retry}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ProductImage
          uri={product.imageUrl}
          category={product.category}
          size={220}
          style={styles.centerSelf}
        />

        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatCurrency(price)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>{formatCurrency(product.originalPrice)}</Text>
          )}
          {discountPercent && <Badge label={`${discountPercent}% off`} tone="accent" />}
        </View>

        <Text style={styles.description}>{product.description}</Text>

        {product.variantGroups.map((group) => (
          <VariantSelector
            key={group.id}
            group={group}
            selectedOptionId={selectedVariants[group.id]}
            onSelect={(optionId) => handleSelectVariant(group.id, optionId)}
          />
        ))}

        <Text style={styles.sectionTitle}>Specifications</Text>
        <SpecList specs={product.specs} />

        <Text style={[styles.sectionTitle, styles.gapTop]}>Choose EMI plan</Text>
        {requiresEmiSelection ? (
          <EmiPlanSelector
            plans={product.emiPlans}
            principal={price}
            selectedPlanId={selectedEmiPlanId}
            onSelect={setSelectedEmiPlanId}
          />
        ) : (
          <Text style={styles.noEmiText}>EMI is not available for this product.</Text>
        )}

        {continueError && (
          <View style={styles.gapTop}>
            <ErrorState message={continueError} onRetry={handleContinue} />
          </View>
        )}
      </ScrollView>

      <View style={styles.ctaBar}>
        <View>
          <Text style={styles.ctaPriceLabel}>Total price</Text>
          <Text style={styles.ctaPrice}>{formatCurrency(price)}</Text>
        </View>
        <Button
          label="Continue"
          onPress={handleContinue}
          disabled={!canContinue}
          loading={isContinuing}
          style={styles.ctaButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContent: {
    padding: spacing.lg,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  centerSelf: {
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  gapTop: {
    marginTop: spacing.md,
  },
  brand: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    fontWeight: fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  name: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  price: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  originalPrice: {
    fontSize: fontSize.base,
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  noEmiText: {
    fontSize: fontSize.sm,
    color: colors.textTertiary,
  },
  ctaBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  ctaPriceLabel: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
  },
  ctaPrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  ctaButton: {
    minWidth: 160,
  },
});
