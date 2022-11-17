import * as z from "zod"

export const DocumentModel = z.object({
  id: z.string(),
  filename: z.string(),
  author: z.string(),
  contents: z.string(),
  status: z.enum(['draft', 'live', 'archived']),
  created: z.date(),
  updated: z.date(),
})
