import { Project, SourceFile } from 'ts-morph'
import { writeArray } from './util'

let needJsonHelper = false
export const setNeedJsonHelper = (value: boolean) => (needJsonHelper = value)

export function createJsonHelperFile(project: Project, outputPath: string, indexFile: SourceFile) {
	if (!needJsonHelper) {
		return
	}

	const sourceFile = project.createSourceFile(
		`${outputPath}/utils/json.ts`,
		{},
		{ overwrite: true }
	)

	sourceFile.addStatements((writer) => {
		writer.newLine()
		writeArray(writer, [
			'// Helper schema for JSON fields',
			`export type JsonObject = { [Key in string]?: JsonValue }`,
			'export type JsonArray = Array<JsonValue>',
			'export type JsonValue = string | number | boolean | JsonObject | JsonArray | null',
			`export const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])`,
			'export const jsonSchema: z.ZodSchema<JsonValue> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))',
		])
	})

	indexFile.addExportDeclaration({
		moduleSpecifier: `./utils/json`,
	})
}
