import * as z from "zod"
import { CompletePost, RelatedPostModel } from "./index"

// Helper schema for JSON fields
export type JsonObject = { [Key in string]?: JsonValue }
export type JsonArray = Array<JsonValue>
export type JsonValue = string | number | boolean | JsonObject | JsonArray | null
export const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
export const jsonSchema: z.ZodSchema<JsonValue> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const UserModel = z.object({
  id: z.number().int(),
  meta: jsonSchema,
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  posts: CompletePost[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  posts: RelatedPostModel.array(),
}))
