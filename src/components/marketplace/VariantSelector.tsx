import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing } from '../../theme';
import { VariantGroup } from '../../data/types';

interface VariantSelectorProps {
  group: VariantGroup;
  selectedOptionId: string | undefined;
  onSelect: (optionId: string) => void;
}

export function VariantSelector({ group, selectedOptionId, onSelect }: VariantSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{group.name}</Text>
      <View style={styles.optionsRow}>
        {group.options.map((option) => {
          const isSelected = option.id === selectedOptionId;

          if (group.type === 'color') {
            return (
              <Pressable
                key={option.id}
                accessibilityRole="button"
                accessibilityLabel={option.label}
                accessibilityState={{ selected: isSelected }}
                onPress={() => onSelect(option.id)}
                style={styles.swatchTouchArea}
              >
                <View
                  style={[
                    styles.swatch,
                    { backgroundColor: option.colorHex },
                    isSelected && styles.swatchSelected,
                  ]}
                >
                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={14}
                      color={isLightColor(option.colorHex) ? colors.textPrimary : colors.textInverse}
                    />
                  )}
                </View>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={option.id}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelect(option.id)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>
                {option.label}
              </Text>
              {option.priceDelta > 0 && (
                <Text style={[styles.chipDelta, isSelected && styles.chipLabelSelected]}>
                  {' '}
                  +₹{option.priceDelta.toLocaleString('en-IN')}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function isLightColor(hex?: string): boolean {
  if (!hex) return false;
  const value = hex.replace('#', '');
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    minHeight: 40,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.surface,
  },
  chipSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  chipLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  chipDelta: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  chipLabelSelected: {
    color: colors.primary,
  },
  swatchTouchArea: {
    padding: 3,
  },
  swatch: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
