import type { DMMF } from '@prisma/generator-helper';
export declare const getZodConstructor: (field: DMMF.Field, enums: EnumModel, getRelatedModelName?: (name: string | DMMF.SchemaEnum | DMMF.OutputType | DMMF.SchemaArg) => string) => string;
export interface EnumModel {
    [key: string]: DMMF.SchemaEnum;
}
