"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bt = __importStar(require("@babel/types"));
const recast_1 = require("recast");
/**
 *
 * @param ast
 * @param varNameFilter
 */
function resolveRequired(ast, varNameFilter) {
    const varToFilePath = {};
    (0, recast_1.visit)(ast.program, {
        visitImportDeclaration(astPath) {
            const specifiers = astPath.get('specifiers');
            // if `import 'module'` without variable name cannot be a mixin
            specifiers.each((sp) => {
                const nodeSpecifier = sp.node;
                if (bt.isImportDefaultSpecifier(nodeSpecifier) || bt.isImportSpecifier(nodeSpecifier)) {
                    const localVariableName = nodeSpecifier.local.name;
                    const exportName = bt.isImportDefaultSpecifier(nodeSpecifier)
                        ? 'default'
                        : bt.isIdentifier(nodeSpecifier.imported)
                            ? nodeSpecifier.imported.name
                            : 'default';
                    if (!varNameFilter || varNameFilter.indexOf(localVariableName) > -1) {
                        const nodeSource = astPath.get('source').node;
                        if (bt.isStringLiteral(nodeSource)) {
                            const filePath = [nodeSource.value];
                            varToFilePath[localVariableName] = {
                                filePath,
                                exportName
                            };
                        }
                    }
                }
            });
            return false;
        },
        visitVariableDeclaration(astPath) {
            // only look at variable declarations
            if (!bt.isVariableDeclaration(astPath.node)) {
                return false;
            }
            astPath.node.declarations.forEach(nodeDeclaration => {
                let sourceNode;
                let source = '';
                const { init, exportName } = nodeDeclaration.init && bt.isMemberExpression(nodeDeclaration.init)
                    ? {
                        init: nodeDeclaration.init.object,
                        exportName: bt.isIdentifier(nodeDeclaration.init.property)
                            ? nodeDeclaration.init.property.name
                            : 'default'
                    }
                    : { init: nodeDeclaration.init, exportName: 'default' };
                if (!init) {
                    return;
                }
                if (bt.isCallExpression(init)) {
                    if (!bt.isIdentifier(init.callee) || init.callee.name !== 'require') {
                        return;
                    }
                    sourceNode = init.arguments[0];
                    if (!bt.isStringLiteral(sourceNode)) {
                        return;
                    }
                    source = sourceNode.value;
                }
                else {
                    return;
                }
                if (bt.isIdentifier(nodeDeclaration.id)) {
                    const varName = nodeDeclaration.id.name;
                    varToFilePath[varName] = { filePath: [source], exportName };
                }
                else if (bt.isObjectPattern(nodeDeclaration.id)) {
                    nodeDeclaration.id.properties.forEach((p) => {
                        if (bt.isIdentifier(p.key)) {
                            const varName = p.key.name;
                            varToFilePath[varName] = { filePath: [source], exportName };
                        }
                    });
                }
            });
            return false;
        }
    });
    return varToFilePath;
}
exports.default = resolveRequired;
