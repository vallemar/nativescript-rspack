"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectTSConfigPath = exports.getProjectFilePath = exports.getPackageJson = exports.getProjectRootPath = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function getProjectRootPath() {
    return process.cwd();
}
exports.getProjectRootPath = getProjectRootPath;
/**
 * Utility function to get the contents of the project package.json
 */
function getPackageJson() {
    return require(getProjectFilePath('package.json'));
}
exports.getPackageJson = getPackageJson;
/**
 * Utility to get project files relative to the project root.
 * @param filePath path to get
 */
function getProjectFilePath(filePath) {
    return (0, path_1.resolve)(getProjectRootPath(), filePath);
}
exports.getProjectFilePath = getProjectFilePath;
function getProjectTSConfigPath() {
    return [
        getProjectFilePath('tsconfig.app.json'),
        getProjectFilePath('tsconfig.json'),
    ].find((path) => (0, fs_1.existsSync)(path));
}
exports.getProjectTSConfigPath = getProjectTSConfigPath;
// unused helper, but keeping it here as we may need it
// todo: remove if unused for next few releases
// function findFile(fileName, currentDir): string | null {
// 	// console.log(`findFile(${fileName}, ${currentDir})`)
// 	const path = resolve(currentDir, fileName);
//
// 	if (existsSync(path)) {
// 		return path;
// 	}
//
// 	// bail if we reached the root dir
// 	if (currentDir === resolve('/')) {
// 		return null;
// 	}
//
// 	// traverse to the parent folder
// 	return findFile(fileName, resolve(currentDir, '..'));
// }
//# sourceMappingURL=project.js.map