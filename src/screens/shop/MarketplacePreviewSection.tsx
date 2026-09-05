import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProductCard, ProductCardSkeleton } from '../../components/marketplace';
import { useAsyncData } from '../../hooks/useAsyncData';
import { marketplaceService } from '../../services/marketplaceService';
import { RootStackParamList } from '../../navigation/types';
import { spacing } from '../../theme';

const PREVIEW_COUNT = 4;
const CARD_WIDTH = 148;

export function MarketplacePreviewSection() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: products, loading, error, retry } = useAsyncData(() => marketplaceService.getProducts());

  const openListing = () => navigation.navigate('MarketplaceListing');
  const openProduct = (productId: string) => navigation.navigate('ProductDetails', { productId });

  return (
    <View>
      <SectionHeader title="1Fi Marketplace" actionLabel="View all" onActionPress={openListing} />

      {loading && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Array.from({ length: PREVIEW_COUNT })}
          keyExtractor={(_, index) => `skeleton-${index}`}
          renderItem={() => <ProductCardSkeleton width={CARD_WIDTH} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      {!loading && error && <ErrorState onRetry={retry} />}

      {!loading && !error && products && products.length === 0 && (
        <EmptyState title="No products available right now" />
      )}

      {!loading && !error && products && products.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={products.slice(0, PREVIEW_COUNT)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard product={item} width={CARD_WIDTH} onPress={() => openProduct(item.id)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: spacing.sm,
  },
});
