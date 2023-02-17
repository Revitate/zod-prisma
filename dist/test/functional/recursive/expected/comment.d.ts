import * as z from "zod";
export declare const CommentModel: z.ZodObject<{
    id: z.ZodString;
    author: z.ZodString;
    contents: z.ZodString;
    parentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    contents: string;
    id: string;
    author: string;
    parentId: string;
}, {
    contents: string;
    id: string;
    author: string;
    parentId: string;
}>;
export interface CompleteComment extends z.infer<typeof CommentModel> {
    parent: CompleteComment;
    children: CompleteComment[];
}
/**
 * RelatedCommentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const RelatedCommentModel: z.ZodSchema<CompleteComment>;
