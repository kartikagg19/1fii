import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, spacing } from '../theme';

interface PlaceholderScreenProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export function PlaceholderScreen({ title, subtitle, icon }: PlaceholderScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.body}>
        <Ionicons name={icon} size={32} color={colors.textTertiary} />
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textTertiary,
  },
});
