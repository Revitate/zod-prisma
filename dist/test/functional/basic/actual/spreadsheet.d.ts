import * as z from "zod";
declare type Literal = boolean | number | string;
declare type Json = Literal | {
    [key: string]: Json;
} | Json[];
export declare const SpreadsheetModel: z.ZodObject<{
    id: z.ZodString;
    filename: z.ZodString;
    author: z.ZodString;
    contents: z.ZodType<Json, z.ZodTypeDef, Json>;
    created: z.ZodDate;
    updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    contents: Json;
    id: string;
    filename: string;
    author: string;
    created: Date;
    updated: Date;
}, {
    contents: Json;
    id: string;
    filename: string;
    author: string;
    created: Date;
    updated: Date;
}>;
export {};
