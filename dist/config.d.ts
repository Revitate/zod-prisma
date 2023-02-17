import { z } from 'zod';
export declare const configSchema: z.ZodObject<{
    relationModel: z.ZodUnion<[z.ZodDefault<z.ZodEffects<z.ZodEnum<["true", "false"]>, any, "true" | "false">>, z.ZodLiteral<"default">]>;
    modelSuffix: z.ZodDefault<z.ZodString>;
    modelCase: z.ZodDefault<z.ZodEnum<["PascalCase", "camelCase"]>>;
    useDecimalJs: z.ZodDefault<z.ZodEffects<z.ZodEnum<["true", "false"]>, any, "true" | "false">>;
    imports: z.ZodOptional<z.ZodString>;
    prismaJsonNullability: z.ZodDefault<z.ZodEffects<z.ZodEnum<["true", "false"]>, any, "true" | "false">>;
}, "strip", z.ZodTypeAny, {
    relationModel?: any;
    useDecimalJs?: any;
    imports?: string | undefined;
    prismaJsonNullability?: any;
    modelSuffix: string;
    modelCase: "PascalCase" | "camelCase";
}, {
    relationModel?: "true" | "false" | "default" | undefined;
    modelSuffix?: string | undefined;
    modelCase?: "PascalCase" | "camelCase" | undefined;
    useDecimalJs?: "true" | "false" | undefined;
    imports?: string | undefined;
    prismaJsonNullability?: "true" | "false" | undefined;
}>;
export declare type Config = z.infer<typeof configSchema>;
export declare type PrismaOptions = {
    schemaPath: string;
    outputPath: string;
    clientPath: string;
};
export declare type Names = {
    model: string;
    related: string;
};
