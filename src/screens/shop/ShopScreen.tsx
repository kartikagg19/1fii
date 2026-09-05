import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../../theme';
import { TopBrandsSection } from './TopBrandsSection';
import { NearbyStoresSection } from './NearbyStoresSection';
import { MarketplacePreviewSection } from './MarketplacePreviewSection';

export function ShopScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Shop</Text>

        <View style={styles.section}>
          <TopBrandsSection />
        </View>
        <View style={styles.section}>
          <NearbyStoresSection />
        </View>
        <View style={styles.section}>
          <MarketplacePreviewSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
});
