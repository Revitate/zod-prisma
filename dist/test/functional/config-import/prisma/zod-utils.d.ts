import { z } from 'zod';
import { Decimal } from 'decimal.js';
export declare const decimalSchema: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, Decimal, string | number>;
