import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../../theme';

interface BadgeProps {
  label: string;
  tone?: 'success' | 'accent';
}

export function Badge({ label, tone = 'success' }: BadgeProps) {
  const isSuccess = tone === 'success';
  return (
    <View style={[styles.badge, { backgroundColor: isSuccess ? colors.successSoft : colors.accentSoft }]}>
      <Text style={[styles.label, { color: isSuccess ? colors.success : colors.accent }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xs,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
});
