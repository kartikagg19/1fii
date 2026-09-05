import React, { useState } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../theme';
import { ProductCategory } from '../../data/types';
import { categoryIcon } from './categoryIcon';

interface ProductImageProps {
  uri: string;
  category: ProductCategory;
  size: number;
  style?: ViewStyle;
}

/**
 * Falls back to a category icon tile when the remote image fails to load
 * (e.g. no network), instead of leaving a blank or broken image.
 */
export function ProductImage({ uri, category, size, style }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {failed ? (
        <View style={styles.fallback}>
          <Ionicons name={categoryIcon[category]} size={size * 0.4} color={colors.textTertiary} />
        </View>
      ) : (
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
