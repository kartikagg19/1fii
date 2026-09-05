export type TabParamList = {
  Home: undefined;
  Shop: undefined;
  Portfolio: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  MarketplaceListing: undefined;
  ProductDetails: { productId: string };
  MarketplaceConfirmation: {
    productName: string;
    variantSummary: string;
    tenureMonths: number;
    monthlyAmount: number;
    referenceId: string;
  };
};
