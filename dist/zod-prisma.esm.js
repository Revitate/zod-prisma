import { generatorHandler } from '@prisma/generator-helper';
import { StructureKind, VariableDeclarationKind, Project } from 'ts-morph';
import { SemicolonPreference } from 'typescript';
import { z } from 'zod';
import path from 'path';
import { parse, stringify } from 'parenthesis';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var version = "0.5.5";

var configBoolean = /*#__PURE__*/z["enum"](['true', 'false']).transform(function (arg) {
  return JSON.parse(arg);
});
var configSchema = /*#__PURE__*/z.object({
  relationModel: /*#__PURE__*/configBoolean["default"]('true').or( /*#__PURE__*/z.literal('default')),
  modelSuffix: /*#__PURE__*/z.string()["default"]('Model'),
  modelCase: /*#__PURE__*/z["enum"](['PascalCase', 'camelCase'])["default"]('PascalCase'),
  useDecimalJs: /*#__PURE__*/configBoolean["default"]('false'),
  imports: /*#__PURE__*/z.string().optional(),
  prismaJsonNullability: /*#__PURE__*/configBoolean["default"]('true')
});

var writeArray = function writeArray(writer, array, newLine) {
  if (newLine === void 0) {
    newLine = true;
  }

  return array.forEach(function (line) {
    return writer.write(line).conditionalNewLine(newLine);
  });
};
var useModelNames = function useModelNames(_ref) {
  var modelCase = _ref.modelCase,
      modelSuffix = _ref.modelSuffix,
      relationModel = _ref.relationModel;

  var formatModelName = function formatModelName(name, prefix) {
    if (prefix === void 0) {
      prefix = '';
    }

    if (modelCase === 'camelCase') {
      name = name.slice(0, 1).toLowerCase() + name.slice(1);
    }

    return "" + prefix + name + modelSuffix;
  };

  return {
    modelName: function modelName(name) {
      return formatModelName(name, relationModel === 'default' ? '_' : '');
    },
    relatedModelName: function relatedModelName(name) {
      return formatModelName(relationModel === 'default' ? name.toString() : "Related" + name.toString());
    }
  };
};
var needsRelatedModel = function needsRelatedModel(model, config) {
  return model.fields.some(function (field) {
    return field.kind === 'object';
  }) && config.relationModel !== false;
};
var chunk = function chunk(input, size) {
  return input.reduce(function (arr, item, idx) {
    return idx % size === 0 ? [].concat(arr, [[item]]) : [].concat(arr.slice(0, -1), [[].concat(arr.slice(-1)[0], [item])]);
  }, []);
};
var dotSlash = function dotSlash(input) {
  var converted = input.replace(/^\\\\\?\\/, '').replace(/\\/g, '/').replace(/\/\/+/g, '/');
  if (converted.includes("/node_modules/")) return converted.split("/node_modules/").slice(-1)[0];
  if (converted.startsWith("../")) return converted;
  return './' + converted;
};

var getJSDocs = function getJSDocs(docString) {
  var lines = [];

  if (docString) {
    var docLines = docString.split('\n').filter(function (dL) {
      return !dL.trimStart().startsWith('@zod');
    });

    if (docLines.length) {
      lines.push('/**');
      docLines.forEach(function (dL) {
        return lines.push(" * " + dL);
      });
      lines.push(' */');
    }
  }

  return lines;
};
var getZodDocElements = function getZodDocElements(docString) {
  return docString.split('\n').filter(function (line) {
    return line.trimStart().startsWith('@zod');
  }).map(function (line) {
    return line.trimStart().slice(4);
  }).flatMap(function (line) {
    return (// Array.from(line.matchAll(/\.([^().]+\(.*?\))/g), (m) => m.slice(1)).flat()
      chunk(parse(line), 2).slice(0, -1).map(function (_ref) {
        var each = _ref[0],
            contents = _ref[1];
        return each.replace(/\)?\./, '') + (stringify(contents) + ")");
      })
    );
  });
};
var computeCustomSchema = function computeCustomSchema(docString) {
  var _getZodDocElements$fi;

  return (_getZodDocElements$fi = getZodDocElements(docString).find(function (modifier) {
    return modifier.startsWith('custom(');
  })) == null ? void 0 : _getZodDocElements$fi.slice(7).slice(0, -1);
};
var computeModifiers = function computeModifiers(docString) {
  return getZodDocElements(docString).filter(function (each) {
    return !each.startsWith('custom(');
  });
};

var getZodConstructor = function getZodConstructor(field, enums, getRelatedModelName) {
  if (getRelatedModelName === void 0) {
    getRelatedModelName = function getRelatedModelName(name) {
      return name.toString();
    };
  }

  var zodType = 'z.unknown()';
  var extraModifiers = [''];

  if (field.kind === 'scalar') {
    switch (field.type) {
      case 'String':
        zodType = 'z.string()';
        break;

      case 'Int':
        zodType = 'z.number()';
        extraModifiers.push('int()');
        break;

      case 'BigInt':
        zodType = 'z.bigint()';
        break;

      case 'DateTime':
        zodType = 'z.date()';
        break;

      case 'Float':
        zodType = 'z.number()';
        break;

      case 'Decimal':
        zodType = 'z.number()';
        break;

      case 'Json':
        zodType = 'jsonSchema';
        break;

      case 'Boolean':
        zodType = 'z.boolean()';
        break;
      // TODO: Proper type for bytes fields

      case 'Bytes':
        zodType = 'z.unknown()';
        break;
    }
  } else if (field.kind === 'enum') {
    zodType = "z.enum([" + enums[field.type].values.map(function (value) {
      return "'" + value + "'";
    }).join(', ') + "])";
  } else if (field.kind === 'object') {
    zodType = getRelatedModelName(field.type);
  }

  if (field.isList) extraModifiers.push('array()');

  if (field.documentation) {
    var _computeCustomSchema;

    zodType = (_computeCustomSchema = computeCustomSchema(field.documentation)) != null ? _computeCustomSchema : zodType;
    extraModifiers.push.apply(extraModifiers, computeModifiers(field.documentation));
  }

  if (!field.isRequired && field.type !== 'Json') extraModifiers.push('nullish()'); // if (field.hasDefaultValue) extraModifiers.push('optional()')

  return "" + zodType + extraModifiers.join('.');
};

var writeImportsForModel = function writeImportsForModel(model, sourceFile, config, _ref) {
  var schemaPath = _ref.schemaPath,
      outputPath = _ref.outputPath;

  var _useModelNames = useModelNames(config),
      relatedModelName = _useModelNames.relatedModelName;

  var importList = [{
    kind: StructureKind.ImportDeclaration,
    namespaceImport: 'z',
    moduleSpecifier: 'zod'
  }];

  if (config.imports) {
    importList.push({
      kind: StructureKind.ImportDeclaration,
      namespaceImport: 'imports',
      moduleSpecifier: dotSlash(path.relative(outputPath, path.resolve(path.dirname(schemaPath), config.imports)))
    });
  }

  if (config.useDecimalJs && model.fields.some(function (f) {
    return f.type === 'Decimal';
  })) {
    importList.push({
      kind: StructureKind.ImportDeclaration,
      namedImports: ['Decimal'],
      moduleSpecifier: 'decimal.js'
    });
  }

  var relationFields = model.fields.filter(function (f) {
    return f.kind === 'object';
  });

  if (config.relationModel !== false && relationFields.length > 0) {
    var filteredFields = relationFields.filter(function (f) {
      return f.type !== model.name;
    });

    if (filteredFields.length > 0) {
      importList.push({
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './index',
        namedImports: Array.from(new Set(filteredFields.flatMap(function (f) {
          return ["Complete" + f.type, relatedModelName(f.type)];
        })))
      });
    }
  }

  sourceFile.addImportDeclarations(importList);
};
var writeTypeSpecificSchemas = function writeTypeSpecificSchemas(model, sourceFile, config, _prismaOptions) {
  if (model.fields.some(function (f) {
    return f.type === 'Json';
  })) {
    sourceFile.addStatements(function (writer) {
      writer.newLine();
      writeArray(writer, ['// Helper schema for JSON fields', "type JsonObject = { [Key in string]?: JsonValue }", 'type JsonArray = Array<JsonValue>', 'type JsonValue = string | number | boolean | JsonObject | JsonArray | null', "const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])", 'const jsonSchema: z.ZodSchema<JsonValue> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))']);
    });
  }

  if (config.useDecimalJs && model.fields.some(function (f) {
    return f.type === 'Decimal';
  })) {
    sourceFile.addStatements(function (writer) {
      writer.newLine();
      writeArray(writer, ['// Helper schema for Decimal fields', 'z', '.instanceof(Decimal)', '.or(z.string())', '.or(z.number())', '.refine((value) => {', '  try {', '    return new Decimal(value);', '  } catch (error) {', '    return false;', '  }', '})', '.transform((value) => new Decimal(value));']);
    });
  }
};
var generateSchemaForModel = function generateSchemaForModel(model, enums, sourceFile, config, _prismaOptions) {
  var _useModelNames2 = useModelNames(config),
      modelName = _useModelNames2.modelName;

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    leadingTrivia: function leadingTrivia(writer) {
      return writer.blankLineIfLastNot();
    },
    declarations: [{
      name: modelName(model.name),
      initializer: function initializer(writer) {
        writer.write('z.object(').inlineBlock(function () {
          model.fields.filter(function (f) {
            return f.kind !== 'object';
          }).forEach(function (field) {
            writeArray(writer, getJSDocs(field.documentation));
            writer.write(field.name + ": " + getZodConstructor(field, enums)).write(',').newLine();
          });
        }).write(')');
      }
    }]
  });
};
var generateRelatedSchemaForModel = function generateRelatedSchemaForModel(model, enums, sourceFile, config, _prismaOptions) {
  var _useModelNames3 = useModelNames(config),
      modelName = _useModelNames3.modelName,
      relatedModelName = _useModelNames3.relatedModelName;

  var relationFields = model.fields.filter(function (f) {
    return f.kind === 'object';
  });
  sourceFile.addInterface({
    name: "Complete" + model.name,
    isExported: true,
    "extends": ["z.infer<typeof " + modelName(model.name) + ">"],
    properties: relationFields.map(function (f) {
      return {
        hasQuestionToken: !f.isRequired,
        name: f.name,
        type: "Complete" + f.type + (f.isList ? '[]' : '') + (!f.isRequired ? ' | null' : '')
      };
    })
  });
  sourceFile.addStatements(function (writer) {
    return writeArray(writer, ['', '/**', " * " + relatedModelName(model.name) + " contains all relations on your model in addition to the scalars", ' *', ' * NOTE: Lazy required in case of potential circular dependencies within schema', ' */']);
  });
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [{
      name: relatedModelName(model.name),
      type: "z.ZodSchema<Complete" + model.name + ">",
      initializer: function initializer(writer) {
        writer.write("z.lazy(() => " + modelName(model.name) + ".extend(").inlineBlock(function () {
          relationFields.forEach(function (field) {
            writeArray(writer, getJSDocs(field.documentation));
            writer.write(field.name + ": " + getZodConstructor(field, enums, relatedModelName)).write(',').newLine();
          });
        }).write('))');
      }
    }]
  });
};
var populateModelFile = function populateModelFile(model, enums, sourceFile, config, prismaOptions) {
  writeImportsForModel(model, sourceFile, config, prismaOptions);
  writeTypeSpecificSchemas(model, sourceFile, config);
  generateSchemaForModel(model, enums, sourceFile, config);
  if (needsRelatedModel(model, config)) generateRelatedSchemaForModel(model, enums, sourceFile, config);
};
var generateBarrelFile = function generateBarrelFile(models, indexFile) {
  models.forEach(function (model) {
    return indexFile.addExportDeclaration({
      moduleSpecifier: "./" + model.name.toLowerCase()
    });
  });
};

generatorHandler({
  onManifest: function onManifest() {
    return {
      version: version,
      prettyName: 'Zod Schemas',
      defaultOutput: 'zod'
    };
  },
  onGenerate: function onGenerate(options) {
    var _options$dmmf$schema$, _options$dmmf$schema$2;

    var project = new Project();
    var models = options.dmmf.datamodel.models;
    var enums = (_options$dmmf$schema$ = (_options$dmmf$schema$2 = options.dmmf.schema.enumTypes.model) == null ? void 0 : _options$dmmf$schema$2.reduce(function (prev, enumModel) {
      var _extends2;

      return _extends({}, prev, (_extends2 = {}, _extends2[enumModel.name] = enumModel, _extends2));
    }, {})) != null ? _options$dmmf$schema$ : {};
    var schemaPath = options.schemaPath;
    var outputPath = options.generator.output.value;
    var clientPath = options.otherGenerators.find(function (each) {
      return each.provider.value === 'prisma-client-js';
    }).output.value;
    var results = configSchema.safeParse(options.generator.config);
    if (!results.success) throw new Error('Incorrect config provided. Please check the values you provided and try again.');
    var config = results.data;
    var prismaOptions = {
      clientPath: clientPath,
      outputPath: outputPath,
      schemaPath: schemaPath
    };
    var indexFile = project.createSourceFile(outputPath + "/index.ts", {}, {
      overwrite: true
    });
    generateBarrelFile(models, indexFile);
    indexFile.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      semicolons: SemicolonPreference.Remove
    });
    models.forEach(function (model) {
      var sourceFile = project.createSourceFile(outputPath + "/" + model.name.toLowerCase() + ".ts", {}, {
        overwrite: true
      });
      populateModelFile(model, enums, sourceFile, config, prismaOptions);
      sourceFile.formatText({
        indentSize: 2,
        convertTabsToSpaces: true,
        semicolons: SemicolonPreference.Remove
      });
    });
    return project.save();
  }
});
//# sourceMappingURL=zod-prisma.esm.js.map
