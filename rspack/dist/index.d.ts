import { merge } from 'webpack-merge';
import Config from 'webpack-chain';
import webpack from 'webpack';
import { determineProjectFlavor } from './helpers/flavor';
import { error, info } from './helpers/log';
export interface IWebpackEnv {
    [name: string]: any;
    env?: string;
    appPath?: string;
    appResourcesPath?: string;
    buildPath?: string;
    appComponents?: string[];
    nativescriptLibPath?: string | boolean;
    android?: boolean;
    ios?: boolean;
    platform?: string;
    sourceMap?: string | boolean;
    production?: boolean;
    report?: boolean;
    hmr?: boolean;
    verbose?: boolean;
    profile?: boolean;
    stats?: boolean;
    replace?: string[] | string;
    watchNodeModules?: boolean;
}
/**
 * The default flavor specific configs
 */
export declare const defaultConfigs: {
    base: typeof import("src/configuration/base").default;
    angular: typeof import("src/configuration/angular").default;
    javascript: typeof import("src/configuration/javascript").default;
    react: typeof import("src/configuration/react").default;
    svelte: typeof import("src/configuration/svelte").default;
    typescript: typeof import("src/configuration/typescript").default;
    vue: typeof import("src/configuration/vue").default;
};
/**
 * Utilities to simplify various tasks
 */
export declare const Utils: {
    merge: typeof merge;
    addCopyRule: typeof import("src/helpers/copyRules").addCopyRule;
    removeCopyRule: typeof import("src/helpers/copyRules").removeCopyRule;
    applyFileReplacements: typeof import("src/helpers/fileReplacements").applyFileReplacements;
    config: {
        getValue: typeof import("src/helpers/config").getValue;
    };
    dependencies: {
        getAllDependencies: typeof import("src/helpers/dependencies").getAllDependencies;
        hasDependency: typeof import("src/helpers/dependencies").hasDependency;
        getDependencyPath: typeof import("src/helpers/dependencies").getDependencyPath;
    };
    flavor: {
        determineProjectFlavor: typeof determineProjectFlavor;
    };
    host: {
        getIPS: typeof import("src/helpers/host").getIPS;
    };
    log: {
        error: typeof error;
        info: typeof info;
        warn: typeof import("./helpers/log").warn;
        warnOnce: typeof import("./helpers/log").warnOnce;
    };
    platform: {
        addPlatform: typeof import("src/helpers/platform").addPlatform;
        getAbsoluteDistPath: typeof import("src/helpers/platform").getAbsoluteDistPath;
        getDistPath: typeof import("src/helpers/platform").getDistPath;
        getEntryDirPath: typeof import("src/helpers/platform").getEntryDirPath;
        getEntryPath: typeof import("src/helpers/platform").getEntryPath;
        getPlatform: typeof import("src/helpers/platform").getPlatform;
        getPlatformName: typeof import("src/helpers/platform").getPlatformName;
    };
    project: {
        getProjectFilePath: typeof import("src/helpers/project").getProjectFilePath;
        getProjectRootPath: typeof import("src/helpers/project").getProjectRootPath;
        getPackageJson: typeof import("src/helpers/project").getPackageJson;
    };
    virtualModules: {
        addVirtualEntry: typeof import("src/helpers/virtualModules").addVirtualEntry;
        addVirtualModule: typeof import("src/helpers/virtualModules").addVirtualModule;
    };
    tsconfig: {
        readTsConfig: typeof import("src/helpers/typescript").readTsConfig;
    };
};
/**
 * webpack-merge exported for convenience. Useful for merging configuration objects
 */
export { merge };
/**
 * Initialize @nativescript/webpack with the webpack env.
 * Must be called first.
 *
 * @param _env The webpack env
 */
export declare function init(_env: IWebpackEnv): void;
/**
 * Explicitly specify the base config to use.
 * Calling this will opt-out from automatic flavor detection.
 *
 * Useful when the flavor cannot be detected due to the project structure
 * for example in a custom monorepo.
 *
 * @param config Name of the base config to use.
 */
export declare function useConfig(config: keyof typeof defaultConfigs | false): void;
/**
 * Add a new function to be called when building the internal config using webpack-chain.
 *
 * @param chainFn A function that accepts the internal chain config, and the current environment
 * @param options Optional options to control the order in which the chain function should be applied.
 */
export declare function chainWebpack(chainFn: (config: Config, env: IWebpackEnv) => any, options?: {
    order?: number;
}): void;
/**
 * Merge an object into the resolved chain config.
 *
 * @param mergeFn An object or a function that optionally returns an object (can mutate the object directly and return nothing)
 */
export declare function mergeWebpack(mergeFn: ((config: Partial<webpack.Configuration>, env: IWebpackEnv) => any) | Partial<webpack.Configuration>): void;
/**
 * Resolve a new instance of the internal chain config with all chain functions applied.
 */
export declare function resolveChainableConfig(): Config;
/**
 * Resolve a "final" configuration that has all chain functions and merges applied.
 *
 * @param chainableConfig Optional chain config to use.
 */
export declare function resolveConfig(chainableConfig?: Config): webpack.Configuration;
