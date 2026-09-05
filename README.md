# 1Fi Marketplace

SDE Intern assignment — adding a Marketplace section to the Shop page of the 1Fi app.

Built with React Native (Expo) + TypeScript.

## What's in the Shop page

The Shop tab has three sections:

- **Top Brands** — placeholder, not part of this assignment
- **Nearby Stores** — placeholder, not part of this assignment
- **1Fi Marketplace** — fully implemented

The Marketplace flow: browse products → open product details → pick a variant (storage/color/size) → pick an EMI plan → Continue → confirmation screen.

## Running it

```
npm install
npm start
```

Then press `a` for Android, `i` for iOS, or `w` for web (scan the QR code with Expo Go to run it on a phone).

## Project structure

```
src/
  data/            product + EMI plan types and mock data
  services/        marketplaceService (mock API — getProducts, getProductById, continuePurchase)
  hooks/           useAsyncData (shared loading/error state for the two async screens)
  utils/           EMI calculation, currency formatting, variant/price helpers
  components/
    ui/            generic building blocks (Button, Card, Skeleton, EmptyState, ErrorState, ...)
    marketplace/   ProductCard, VariantSelector, EmiPlanSelector, SpecList, ProductImage
  screens/
    shop/          ShopScreen + Marketplace listing / details / confirmation screens
  navigation/      tab navigator + root stack
  theme/           colors, spacing, typography tokens
```

Products and EMI plans come from `marketplaceService`, not from the UI — swapping the mock implementation for a real API later is a single-file change.

## Notes

- EMI amounts are calculated from tenure + interest rate + fee, not hardcoded per plan, so they update automatically when a variant changes the price.
- `continuePurchase` randomly fails about 15% of the time to exercise the error/retry state on the CTA — that's intentional, not a bug.
- Product images are loaded from picsum.photos as stand-ins; if an image fails to load, the card falls back to a category icon instead of breaking.
