export declare function getProjectRootPath(): string;
interface IPackageJson {
    main?: string;
    dependencies?: {
        [name: string]: string;
    };
    devDependencies?: {
        [name: string]: string;
    };
}
/**
 * Utility function to get the contents of the project package.json
 */
export declare function getPackageJson(): IPackageJson;
/**
 * Utility to get project files relative to the project root.
 * @param filePath path to get
 */
export declare function getProjectFilePath(filePath: string): string;
export declare function getProjectTSConfigPath(): string | undefined;
export {};
