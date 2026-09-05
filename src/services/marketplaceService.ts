import { products } from '../data/products';
import { EmiPlan, Product, SelectedVariants } from '../data/types';

const NETWORK_DELAY_MS = 500;
const CONTINUE_FAILURE_RATE = 0.15;

function delay<T>(value: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export class MarketplaceError extends Error {}

export interface ContinuePurchaseInput {
  productId: string;
  selectedVariants: SelectedVariants;
  emiPlan: EmiPlan;
  totalPrice: number;
}

export interface ContinuePurchaseResult {
  referenceId: string;
}

/**
 * Mock marketplace API. Every method mirrors the shape a real
 * `marketplaceApi` client would have (async, can reject), so swapping this
 * out for real network calls later is a one-file change.
 */
export const marketplaceService = {
  async getProducts(): Promise<Product[]> {
    return delay([...products]);
  },

  async getProductById(id: string): Promise<Product> {
    const product = products.find((item) => item.id === id);
    await delay(null, 300);
    if (!product) {
      throw new MarketplaceError('Product not found');
    }
    return product;
  },

  async continuePurchase(input: ContinuePurchaseInput): Promise<ContinuePurchaseResult> {
    await delay(null, 900);
    if (Math.random() < CONTINUE_FAILURE_RATE) {
      throw new MarketplaceError('Could not confirm your selection');
    }
    return { referenceId: `1FI-${Date.now().toString(36).toUpperCase()}` };
  },
};
