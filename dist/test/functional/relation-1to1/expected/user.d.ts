import * as z from "zod";
import { CompleteKeychain } from "./index";
export declare const UserModel: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export interface CompleteUser extends z.infer<typeof UserModel> {
    keychain?: CompleteKeychain | null;
}
/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const RelatedUserModel: z.ZodSchema<CompleteUser>;
