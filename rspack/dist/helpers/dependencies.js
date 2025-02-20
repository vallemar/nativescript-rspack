"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDependencyVersion = exports.getDependencyPath = exports.hasDependency = exports.getAllDependencies = void 0;
const path_1 = __importDefault(require("path"));
const project_1 = require("./project");
// todo: memoize
/**
 * Utility to get all dependencies from the project package.json.
 * The result combines dependencies and devDependencies
 *
 * @returns string[] dependencies
 */
function getAllDependencies() {
    var _a, _b;
    const packageJSON = (0, project_1.getPackageJson)();
    return [
        ...Object.keys((_a = packageJSON.dependencies) !== null && _a !== void 0 ? _a : {}),
        ...Object.keys((_b = packageJSON.devDependencies) !== null && _b !== void 0 ? _b : {}),
    ];
}
exports.getAllDependencies = getAllDependencies;
// todo: memoize
/**
 * Utility to check if the project has a specific dependency
 * in either dependencies or devDependencies.
 *
 * @param {string} dependencyName
 * @returns boolean
 */
function hasDependency(dependencyName) {
    return getAllDependencies().includes(dependencyName);
}
exports.hasDependency = hasDependency;
// todo: memoize
/**
 * Utility to get the path (usually nested in node_modules) of a dependency.
 *
 * @param dependencyName
 */
function getDependencyPath(dependencyName) {
    try {
        const resolvedPath = require.resolve(`${dependencyName}/package.json`, {
            paths: [(0, project_1.getProjectRootPath)()],
        });
        return path_1.default.dirname(resolvedPath);
    }
    catch (err) {
        return null;
    }
}
exports.getDependencyPath = getDependencyPath;
/**
 * Utility to get the version of a dependency.
 *
 * @param dependencyName
 * @returns string | null - version of the dependency or null if not found
 */
function getDependencyVersion(dependencyName) {
    const dependencyPath = getDependencyPath(dependencyName);
    if (!dependencyPath) {
        return null;
    }
    try {
        return require(`${dependencyPath}/package.json`).version;
    }
    catch (err) {
        // ignore
    }
    return null;
}
exports.getDependencyVersion = getDependencyVersion;
//# sourceMappingURL=dependencies.js.map