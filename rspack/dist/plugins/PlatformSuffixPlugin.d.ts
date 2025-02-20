interface PlatformSuffixPluginOptions {
    extensions: Array<string>;
}
/**
 * The platform suffix plugin will try to resolve files with a platform specifier (suffix)
 * falling back to the non-platform-specific version.
 *
 * For example:
 *   import something from './something.js'
 *
 *   will first look for './something.<platform>.js'
 *   and if not found look for './something.js'
 *
 */
export declare class PlatformSuffixPlugin {
    private readonly extensions;
    constructor(options: PlatformSuffixPluginOptions);
    apply(compiler: any): void;
}
export {};
