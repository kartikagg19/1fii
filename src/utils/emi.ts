export interface EmiCalculationInput {
  principal: number;
  tenureMonths: number;
  interestRatePct: number;
  processingFee: number;
}

export interface EmiCalculationResult {
  monthlyAmount: number;
  totalInterest: number;
  totalPayable: number;
}

/**
 * Flat-rate EMI approximation (common on retail "EMI card" style checkouts):
 * interest = principal * rate% * (tenure in years). This is intentionally
 * simpler than a reducing-balance amortization schedule, which is standard
 * for point-of-sale EMI plans and matches how the rate/fee fields are meant
 * to be used here.
 */
export function calculateEmi({
  principal,
  tenureMonths,
  interestRatePct,
  processingFee,
}: EmiCalculationInput): EmiCalculationResult {
  const totalInterest = Math.round(principal * (interestRatePct / 100) * (tenureMonths / 12));
  const totalPayable = principal + totalInterest + processingFee;
  const monthlyAmount = Math.round(totalPayable / tenureMonths);

  return { monthlyAmount, totalInterest, totalPayable };
}
