"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("@babel/parser");
const babelParserOptions = {
    sourceType: 'module',
    strictMode: false,
    tokens: true,
    plugins: [
        'decorators-legacy',
        'doExpressions',
        'objectRestSpread',
        'classProperties',
        'classPrivateProperties',
        'classPrivateMethods',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'asyncGenerators',
        'functionBind',
        'functionSent',
        'dynamicImport',
        'numericSeparator',
        'optionalChaining',
        'importMeta',
        'bigInt',
        'optionalCatchBinding',
        'throwExpressions',
        'nullishCoalescingOperator'
    ]
};
function buildParse(options = {}) {
    options = Object.assign(Object.assign(Object.assign({}, babelParserOptions), options), { plugins: [...(babelParserOptions.plugins || []), ...(options.plugins || [])] });
    return {
        parse(src) {
            return (0, parser_1.parse)(src, options);
        }
    };
}
exports.default = buildParse;
