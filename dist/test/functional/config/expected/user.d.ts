import * as z from "zod";
import { CompletePost } from "./index";
export declare const _userSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    email: string;
}, {
    id: string;
    name: string;
    email: string;
}>;
export interface CompleteUser extends z.infer<typeof _userSchema> {
    posts: CompletePost[];
}
/**
 * userSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const userSchema: z.ZodSchema<CompleteUser>;
