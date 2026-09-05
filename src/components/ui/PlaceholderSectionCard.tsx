import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { SectionHeader } from './SectionHeader';
import { colors, fontSize, spacing } from '../../theme';

interface PlaceholderSectionCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  message: string;
}

export function PlaceholderSectionCard({ title, icon, message }: PlaceholderSectionCardProps) {
  return (
    <View>
      <SectionHeader title={title} />
      <Card>
        <View style={styles.row}>
          <Ionicons name={icon} size={20} color={colors.textTertiary} />
          <Text style={styles.text}>{message}</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.md,
  },
  text: {
    fontSize: fontSize.sm,
    color: colors.textTertiary,
  },
});
