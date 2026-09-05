import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing } from '../../theme';
import { EmiPlan } from '../../data/types';
import { calculateEmi } from '../../utils/emi';
import { formatCurrency } from '../../utils/currency';
import { Badge } from '../ui/Badge';

interface EmiPlanSelectorProps {
  plans: EmiPlan[];
  principal: number;
  selectedPlanId: string | undefined;
  onSelect: (planId: string) => void;
}

export function EmiPlanSelector({ plans, principal, selectedPlanId, onSelect }: EmiPlanSelectorProps) {
  return (
    <View style={styles.list}>
      {plans.map((plan) => {
        const { monthlyAmount, totalPayable } = calculateEmi({
          principal,
          tenureMonths: plan.tenureMonths,
          interestRatePct: plan.interestRatePct,
          processingFee: plan.processingFee,
        });
        const isSelected = plan.id === selectedPlanId;

        return (
          <Pressable
            key={plan.id}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(plan.id)}
            style={[styles.row, isSelected && styles.rowSelected]}
          >
            <View style={styles.radioOuter}>
              {isSelected && <View style={styles.radioInner} />}
            </View>

            <View style={styles.details}>
              <View style={styles.tenureRow}>
                <Text style={styles.tenure}>{plan.tenureMonths} months</Text>
                {plan.isNoCost && <Badge label="No cost EMI" tone="success" />}
              </View>
              <Text style={styles.meta}>
                {plan.interestRatePct > 0 ? `${plan.interestRatePct}% p.a.` : 'No interest'}
                {plan.processingFee > 0 ? ` · ₹${plan.processingFee} processing fee` : ''}
              </Text>
            </View>

            <View style={styles.amounts}>
              <Text style={styles.monthly}>{formatCurrency(monthlyAmount)}/mo</Text>
              <Text style={styles.total}>Total {formatCurrency(totalPayable)}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  rowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  details: {
    flex: 1,
    gap: 2,
  },
  tenureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  tenure: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  meta: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  amounts: {
    alignItems: 'flex-end',
    gap: 2,
  },
  monthly: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  total: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
  },
});
