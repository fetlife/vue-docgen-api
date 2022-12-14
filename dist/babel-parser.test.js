"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const babel_parser_1 = __importDefault(require("./babel-parser"));
describe('babel-parser', () => {
    let parser;
    beforeEach(() => {
        parser = (0, babel_parser_1.default)({ plugins: ['jsx'] });
    });
    it('should parse js with no trouble', () => {
        const src = `let bonjour = 'test'`;
        expect(() => {
            parser.parse(src);
        }).not.toThrow();
    });
    it('should parse jsx with no trouble', () => {
        const src = `let bonjour = (<a>test</a>)`;
        expect(() => {
            parser.parse(src);
        }).not.toThrow();
    });
    it('should parse complex jsx with no trouble', () => {
        const src = `export default {
        render() {
        const { sortKey, capitalize } = this
        return (
        <table class="grid">
            <thead>
            <tr>
                {columns.map(key => (
                <th onClick={() => sortBy(key)} class={{ active: sortKey == key }}>
                    {capitalize(key)}
                    <span class={'arrow ' + (sortOrders[key] > 0 ? 'asc' : 'dsc')} />
                </th>
                ))}
            </tr>
            </thead>
            <tbody>{filteredData.map(entry => columns.map(key => entry[key]))}</tbody>
        </table>
        )
    }
    }`;
        expect(() => {
            parser.parse(src);
        }).not.toThrow();
    });
});
