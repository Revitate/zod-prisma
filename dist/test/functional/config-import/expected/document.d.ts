import * as z from "zod";
export declare const DocumentModel: z.ZodObject<{
    id: z.ZodString;
    filename: z.ZodString;
    author: z.ZodString;
    contents: z.ZodString;
    size: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, import("decimal.js").default, string | number>;
    created: z.ZodDate;
    updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    contents: string;
    id: string;
    filename: string;
    author: string;
    created: Date;
    updated: Date;
    size: import("decimal.js").default;
}, {
    contents: string;
    id: string;
    filename: string;
    author: string;
    created: Date;
    updated: Date;
    size: string | number;
}>;
