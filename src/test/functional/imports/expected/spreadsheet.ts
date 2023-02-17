import * as z from "zod"
import { CompletePresentation, RelatedPresentationModel } from "./index"

// Helper schema for JSON fields
type JsonObject = { [Key in string]?: JsonValue }
type JsonArray = Array<JsonValue>
type JsonValue = string | number | boolean | JsonObject | JsonArray | null
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
const jsonSchema: z.ZodSchema<JsonValue> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const SpreadsheetModel = z.object({
  id: z.string(),
  filename: z.string(),
  author: z.string(),
  contents: jsonSchema,
  created: z.date(),
  updated: z.date(),
})

export interface CompleteSpreadsheet extends z.infer<typeof SpreadsheetModel> {
  presentations: CompletePresentation[]
}

/**
 * RelatedSpreadsheetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSpreadsheetModel: z.ZodSchema<CompleteSpreadsheet> = z.lazy(() => SpreadsheetModel.extend({
  presentations: RelatedPresentationModel.array(),
}))
