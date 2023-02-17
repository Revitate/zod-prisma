import * as z from "zod";
export declare const DocumentModel: z.ZodObject<{
    id: z.ZodString;
    filename: z.ZodString;
    author: z.ZodString;
    contents: z.ZodString;
    created: z.ZodDate;
    updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    contents: string;
    id: string;
    filename: string;
    author: string;
    created: Date;
    updated: Date;
}, {
    contents: string;
    id: string;
    filename: string;
    author: string;
    created: Date;
    updated: Date;
}>;
