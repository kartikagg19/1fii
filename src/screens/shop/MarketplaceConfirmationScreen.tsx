import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { RootStackParamList } from '../../navigation/types';
import { colors, fontSize, fontWeight, spacing } from '../../theme';
import { formatCurrency } from '../../utils/currency';

type Route = RouteProp<RootStackParamList, 'MarketplaceConfirmation'>;
type Navigation = NativeStackNavigationProp<RootStackParamList, 'MarketplaceConfirmation'>;

export function MarketplaceConfirmationScreen() {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Navigation>();

  const backToShop = () => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark-circle" size={48} color={colors.success} />
        </View>

        <Text style={styles.title}>Request submitted</Text>
        <Text style={styles.subtitle}>
          We've noted your selection. Our team will reach out to complete the EMI application.
        </Text>

        <Card style={styles.summaryCard}>
          <SummaryRow label="Product" value={params.productName} />
          {!!params.variantSummary && <SummaryRow label="Variant" value={params.variantSummary} />}
          <SummaryRow label="Tenure" value={`${params.tenureMonths} months`} />
          <SummaryRow label="Monthly EMI" value={`${formatCurrency(params.monthlyAmount)}/mo`} />
          <SummaryRow label="Reference ID" value={params.referenceId} />
        </Card>
      </View>

      <View style={styles.footer}>
        <Button label="Back to Shop" onPress={backToShop} fullWidth />
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  iconWrap: {
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  summaryCard: {
    width: '100%',
    padding: spacing.md,
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  summaryLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    flexShrink: 1,
    textAlign: 'right',
  },
  footer: {
    padding: spacing.lg,
  },
});
