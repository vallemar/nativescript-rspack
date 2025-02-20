/**
 * Utility to get all dependencies from the project package.json.
 * The result combines dependencies and devDependencies
 *
 * @returns string[] dependencies
 */
export declare function getAllDependencies(): string[];
/**
 * Utility to check if the project has a specific dependency
 * in either dependencies or devDependencies.
 *
 * @param {string} dependencyName
 * @returns boolean
 */
export declare function hasDependency(dependencyName: string): boolean;
/**
 * Utility to get the path (usually nested in node_modules) of a dependency.
 *
 * @param dependencyName
 */
export declare function getDependencyPath(dependencyName: string): string | null;
/**
 * Utility to get the version of a dependency.
 *
 * @param dependencyName
 * @returns string | null - version of the dependency or null if not found
 */
export declare function getDependencyVersion(dependencyName: string): string | null;
