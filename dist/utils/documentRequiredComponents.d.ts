import { ImportedVariableSet } from './resolveRequired';
import { ParseOptions } from '../parse';
import Documentation from '../Documentation';
/**
 * Document all components in varToFilePath in documentation
 * Instead of giving it only one component file, here we give it a whole set of variable -> file
 *
 * @param documentation if omitted (undefined), it will return all docs in an array
 * @param varToFilePath variable of object to document
 * @param originObject to build the origin flag
 * @param opt parsing options
 */
export default function documentRequiredComponents(documentation: Documentation | undefined, varToFilePath: ImportedVariableSet, originObject: 'extends' | 'mixin' | undefined, opt: ParseOptions): Promise<Documentation[]>;
