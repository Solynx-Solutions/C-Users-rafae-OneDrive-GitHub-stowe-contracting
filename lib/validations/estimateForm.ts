import { z } from 'zod';

export const estimateFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number is required')
    .refine(
      (val) => /^\+?[\d\s\-().]{7,20}$/.test(val),
      'Please enter a valid phone number'
    ),
  address: z.string().optional(),
  serviceType: z.string().min(1, 'Please select a service type'),
  projectDescription: z
    .string()
    .min(20, 'Please provide at least 20 characters describing your project')
    .max(3000, 'Description must be less than 3000 characters'),
  timeline: z.string().optional(),
  budget: z.string().optional(),
});

export type EstimateFormValues = z.infer<typeof estimateFormSchema>;
