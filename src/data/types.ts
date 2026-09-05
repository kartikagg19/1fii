export type ProductCategory = 'smartphone' | 'laptop' | 'headphones' | 'smartwatch' | 'tablet';

export interface VariantOption {
  id: string;
  label: string;
  priceDelta: number;
  colorHex?: string;
}

export interface VariantGroup {
  id: string;
  name: string;
  type: 'storage' | 'color' | 'size';
  options: VariantOption[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface EmiPlan {
  id: string;
  tenureMonths: number;
  interestRatePct: number;
  processingFee: number;
  isNoCost?: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  basePrice: number;
  originalPrice?: number;
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  variantGroups: VariantGroup[];
  emiPlans: EmiPlan[];
}

export interface SelectedVariants {
  [groupId: string]: string;
}
