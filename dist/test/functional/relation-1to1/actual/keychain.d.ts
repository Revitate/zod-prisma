import * as z from "zod";
import { CompleteUser } from "./index";
export declare const KeychainModel: z.ZodObject<{
    userID: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userID: string;
}, {
    userID: string;
}>;
export interface CompleteKeychain extends z.infer<typeof KeychainModel> {
    owner: CompleteUser;
}
/**
 * RelatedKeychainModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const RelatedKeychainModel: z.ZodSchema<CompleteKeychain>;
