import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { spacing } from '../../theme';

interface ProductCardSkeletonProps {
  width?: number;
}

export function ProductCardSkeleton({ width }: ProductCardSkeletonProps) {
  return (
    <Card style={width ? { width } : styles.flexCard}>
      <View style={styles.content}>
        <Skeleton width={width ? width - 24 : 96} height={width ? width - 24 : 96} style={styles.image} />
        <Skeleton width="50%" height={11} />
        <Skeleton width="80%" height={15} style={styles.gapTop} />
        <Skeleton width="60%" height={17} style={styles.gapTop} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  flexCard: {
    flex: 1,
  },
  content: {
    padding: spacing.sm,
    gap: 6,
  },
  image: {
    alignSelf: 'center',
    marginBottom: spacing.xs,
  },
  gapTop: {
    marginTop: 2,
  },
});
