import React from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProductCard, ProductCardSkeleton } from '../../components/marketplace';
import { useAsyncData } from '../../hooks/useAsyncData';
import { marketplaceService } from '../../services/marketplaceService';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

const COLUMNS = 2;
const SCREEN_PADDING = spacing.lg;
const GAP = spacing.sm;
const CARD_WIDTH = (Dimensions.get('window').width - SCREEN_PADDING * 2 - GAP) / COLUMNS;

export function MarketplaceListingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: products, loading, error, retry } = useAsyncData(() => marketplaceService.getProducts());

  const openProduct = (productId: string) => navigation.navigate('ProductDetails', { productId });

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading && (
        <FlatList
          data={Array.from({ length: 6 })}
          keyExtractor={(_, index) => `skeleton-${index}`}
          numColumns={COLUMNS}
          contentContainerStyle={styles.content}
          columnWrapperStyle={styles.row}
          renderItem={() => <ProductCardSkeleton width={CARD_WIDTH} />}
        />
      )}

      {!loading && error && <ErrorState onRetry={retry} />}

      {!loading && !error && products && products.length === 0 && (
        <EmptyState title="No products available right now" subtitle="Please check back later" />
      )}

      {!loading && !error && products && products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={COLUMNS}
          contentContainerStyle={styles.content}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <ProductCard product={item} width={CARD_WIDTH} onPress={() => openProduct(item.id)} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: SCREEN_PADDING,
    gap: GAP,
  },
  row: {
    gap: GAP,
  },
});
