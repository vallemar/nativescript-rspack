import ts from 'typescript';
/**
 * A TypeScript transform that compiles classes marked with `@NativeClass` as es5
 */
export default function (ctx: ts.TransformationContext): (source: ts.SourceFile) => ts.SourceFile;
