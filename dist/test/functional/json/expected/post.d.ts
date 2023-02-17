import * as z from "zod";
import { CompleteUser } from "./index";
export declare const PostModel: z.ZodObject<{
    id: z.ZodNumber;
    authorId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    authorId: number;
}, {
    id: number;
    authorId: number;
}>;
export interface CompletePost extends z.infer<typeof PostModel> {
    author: CompleteUser;
}
/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const RelatedPostModel: z.ZodSchema<CompletePost>;
