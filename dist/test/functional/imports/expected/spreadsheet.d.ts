import * as z from "zod";
import { CompletePresentation } from "./index";
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
export interface CompleteSpreadsheet extends z.infer<typeof SpreadsheetModel> {
    presentations: CompletePresentation[];
}
/**
 * RelatedSpreadsheetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const RelatedSpreadsheetModel: z.ZodSchema<CompleteSpreadsheet>;
export {};
