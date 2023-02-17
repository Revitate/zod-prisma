import { DMMF } from '@prisma/generator-helper';
import type { CodeBlockWriter } from 'ts-morph';
import { Config } from './config';
export declare const writeArray: (writer: CodeBlockWriter, array: string[], newLine?: boolean) => void;
export declare const useModelNames: ({ modelCase, modelSuffix, relationModel }: Config) => {
    modelName: (name: string) => string;
    relatedModelName: (name: string | DMMF.SchemaEnum | DMMF.OutputType | DMMF.SchemaArg) => string;
};
export declare const needsRelatedModel: (model: DMMF.Model, config: Config) => boolean;
export declare const chunk: <T extends any[]>(input: T, size: number) => T[];
export declare const dotSlash: (input: string) => string;
