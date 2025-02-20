"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
/**
 * A TypeScript transform that compiles classes marked with `@NativeClass` as es5
 */
function default_1(ctx) {
    function isNativeClassExtension(node) {
        let decorators;
        if ('canHaveDecorators' in typescript_1.default && typescript_1.default.canHaveDecorators(node)) {
            // use the newer decorators API when using a newer typescript version
            decorators = typescript_1.default.getDecorators(node);
        }
        else {
            // fallback to old behavior on older typescript versions
            decorators = node.decorators;
        }
        return !!(decorators === null || decorators === void 0 ? void 0 : decorators.some((d) => {
            const fullText = d.getFullText().trim();
            return fullText.indexOf('@NativeClass') > -1;
        }));
    }
    function visitNode(node) {
        if (typescript_1.default.isClassDeclaration(node) && isNativeClassExtension(node)) {
            return createHelper(node);
        }
        return typescript_1.default.visitEachChild(node, visitNode, ctx);
    }
    function createHelper(node) {
        // we remove the decorator for now!
        return typescript_1.default.factory.createIdentifier(typescript_1.default
            .transpileModule(node.getText().replace(/@NativeClass(\((.|\n)*?\))?/gm, ''), {
            compilerOptions: {
                noEmitHelpers: true,
                module: typescript_1.default.ModuleKind.ESNext,
                target: typescript_1.default.ScriptTarget.ES5,
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
            },
        })
            .outputText.replace(/(Object\.defineProperty\(.*?{.*?)(enumerable:\s*false)(.*?}\))/gs, '$1enumerable: true$3'));
    }
    return (source) => typescript_1.default.factory.updateSourceFile(source, typescript_1.default.visitNodes(source.statements, visitNode));
}
exports.default = default_1;
//# sourceMappingURL=index.js.map