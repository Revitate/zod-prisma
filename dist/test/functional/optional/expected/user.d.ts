import * as z from "zod";
import { CompletePost } from "./index";
declare type Literal = boolean | number | string;
declare type Json = Literal | {
    [key: string]: Json;
} | Json[];
export declare const UserModel: z.ZodObject<{
    id: z.ZodNumber;
    meta: z.ZodType<Json, z.ZodTypeDef, Json>;
}, "strip", z.ZodTypeAny, {
    id: number;
    meta: Json;
}, {
    id: number;
    meta: Json;
}>;
export interface CompleteUser extends z.infer<typeof UserModel> {
    posts?: CompletePost | null;
}
/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const RelatedUserModel: z.ZodSchema<CompleteUser>;
export {};
