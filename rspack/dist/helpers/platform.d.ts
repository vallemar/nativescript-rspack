export interface INativeScriptPlatform {
    getEntryPath?(): string;
    getDistPath?(): string;
}
export type Platform = Extract<keyof typeof platforms, string>;
declare const platforms: {
    [name: string]: INativeScriptPlatform;
};
/**
 * Utility to register a new supported platform.
 *
 * @param {string} name The name of the platform (eg. web, desktop)
 * @param platform A platform definition of the platform specifics
 */
export declare function addPlatform(name: string, platform: INativeScriptPlatform): void;
/**
 * Utility to get the currently targeted platform definition
 */
export declare function getPlatform(): INativeScriptPlatform;
/**
 * Utility to get all registered/available platforms
 */
export declare function getAvailablePlatforms(): string[];
/**
 * Utility to get the currently targeted platform name
 */
export declare function getPlatformName(): Platform;
/**
 * Utility to get the entry file path for the currently targeted platform
 */
export declare function getEntryPath(): string;
/**
 * Utility to get the entry file directory path for the currently targeted platform
 */
export declare function getEntryDirPath(): string;
/**
 * Utility to get the dist file path for the currently targeted platform
 */
export declare function getDistPath(): string;
/**
 * Utility to get the absolute dist file path for the currently targeted platform
 */
export declare function getAbsoluteDistPath(): string;
export {};
