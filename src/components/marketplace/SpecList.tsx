import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../../theme';
import { ProductSpec } from '../../data/types';

interface SpecListProps {
  specs: ProductSpec[];
}

export function SpecList({ specs }: SpecListProps) {
  return (
    <View style={styles.container}>
      {specs.map((spec, index) => (
        <View
          key={spec.label}
          style={[styles.row, index !== specs.length - 1 && styles.rowDivider]}
        >
          <Text style={styles.label}>{spec.label}</Text>
          <Text style={styles.value}>{spec.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    gap: spacing.md,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  value: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    fontWeight: fontWeight.medium,
    flex: 1,
    textAlign: 'right',
  },
});
