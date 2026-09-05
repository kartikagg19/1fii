import { Product, SelectedVariants } from '../data/types';
import { calculateEmi } from './emi';

export function getDefaultVariants(product: Product): SelectedVariants {
  return product.variantGroups.reduce<SelectedVariants>((acc, group) => {
    acc[group.id] = group.options[0]?.id;
    return acc;
  }, {});
}

export function getSelectedPrice(product: Product, selectedVariants: SelectedVariants): number {
  const delta = product.variantGroups.reduce((sum, group) => {
    const selectedOptionId = selectedVariants[group.id];
    const option = group.options.find((item) => item.id === selectedOptionId);
    return sum + (option?.priceDelta ?? 0);
  }, 0);

  return product.basePrice + delta;
}

export function getDiscountPercent(product: Product): number | null {
  if (!product.originalPrice || product.originalPrice <= product.basePrice) {
    return null;
  }
  return Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100);
}

/** Cheapest monthly EMI across all available plans, for card-level "starting at" copy. */
export function getStartingMonthlyEmi(product: Product, price: number): number | null {
  if (product.emiPlans.length === 0) {
    return null;
  }

  const monthlyAmounts = product.emiPlans.map(
    (plan) =>
      calculateEmi({
        principal: price,
        tenureMonths: plan.tenureMonths,
        interestRatePct: plan.interestRatePct,
        processingFee: plan.processingFee,
      }).monthlyAmount
  );

  return Math.min(...monthlyAmounts);
}
