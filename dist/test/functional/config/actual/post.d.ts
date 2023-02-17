import * as z from "zod";
import { CompleteUser } from "./index";
export declare const _postSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    contents: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    contents: string;
    id: string;
    title: string;
    userId: string;
}, {
    contents: string;
    id: string;
    title: string;
    userId: string;
}>;
export interface CompletePost extends z.infer<typeof _postSchema> {
    author: CompleteUser;
}
/**
 * postSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const postSchema: z.ZodSchema<CompletePost>;
