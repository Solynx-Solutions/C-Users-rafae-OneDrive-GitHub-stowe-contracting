'use server';

import { submitEstimate, type EstimateType, type SubmitEstimateResult } from './submitEstimate';
import { type EstimateFormValues } from '@/lib/validations/estimateForm';

export async function submitEstimateAction(
  data: EstimateFormValues,
  estimateType: EstimateType,
  honeypotValue?: string
): Promise<SubmitEstimateResult> {
  return submitEstimate(data, estimateType, honeypotValue);
}
