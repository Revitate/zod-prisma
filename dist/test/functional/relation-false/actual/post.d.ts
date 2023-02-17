import * as z from "zod";
export declare const PostModel: z.ZodObject<{
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
