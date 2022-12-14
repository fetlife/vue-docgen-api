import Documentation, { ComponentDoc, PropDescriptor, SlotDescriptor, EventDescriptor, MethodDescriptor, BlockTag, Param, Tag, ParamTag, ParamType } from './Documentation';
import { DocGenOptions, ParseOptions } from './parse';
import * as ScriptHandlers from './script-handlers';
import * as TemplateHandlers from './template-handlers';
export { ScriptHandlers };
export { TemplateHandlers };
export { TemplateParserOptions } from './parse-template';
export { ScriptHandler, TemplateHandler } from './parse';
export { ComponentDoc, DocGenOptions, ParseOptions, Documentation, BlockTag, PropDescriptor, SlotDescriptor, EventDescriptor, MethodDescriptor, Param, Tag, ParamTag, ParamType };
export { cleanName, getDefaultExample } from 'vue-inbrowser-compiler-independent-utils';
/**
 * Parse the component at filePath and return props, public methods, events and slots
 * @param filePath absolute path of the parsed file
 * @param opts
 */
export declare function parse(filePath: string, opts?: DocGenOptions | {
    [alias: string]: string;
}): Promise<ComponentDoc>;
/**
 * Parse all the components at filePath and returns an array of their
 * props, public methods, events and slot
 * @param filePath absolute path of the parsed file
 * @param opts
 */
export declare function parseMulti(filePath: string, opts?: DocGenOptions): Promise<ComponentDoc[]>;
/**
 * Parse the `source` assuming that it is located at `filePath` and return props, public methods, events and slots
 * @param source source code to be parsed
 * @param filePath absolute path of the parsed file
 * @param opts
 */
export declare function parseSource(source: string, filePath: string, opts?: DocGenOptions | {
    [alias: string]: string;
}): Promise<ComponentDoc>;
