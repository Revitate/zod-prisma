import * as z from "zod";
import { CompleteSpreadsheet } from "./index";
export declare const PresentationModel: z.ZodObject<{
    id: z.ZodString;
    filename: z.ZodString;
    author: z.ZodString;
    contents: z.ZodArray<z.ZodString, "many">;
    created: z.ZodDate;
    updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    contents: string[];
    id: string;
    filename: string;
    author: string;
    created: Date;
    updated: Date;
}, {
    contents: string[];
    id: string;
    filename: string;
    author: string;
    created: Date;
    updated: Date;
}>;
export interface CompletePresentation extends z.infer<typeof PresentationModel> {
    spreadsheets: CompleteSpreadsheet[];
}
/**
 * RelatedPresentationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const RelatedPresentationModel: z.ZodSchema<CompletePresentation>;
