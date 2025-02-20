"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsoluteDistPath = exports.getDistPath = exports.getEntryDirPath = exports.getEntryPath = exports.getPlatformName = exports.getAvailablePlatforms = exports.getPlatform = exports.addPlatform = void 0;
const path_1 = require("path");
const project_1 = require("./project");
const log_1 = require("./log");
const config_1 = require("./config");
const __1 = require("../");
const android_1 = __importDefault(require("../platforms/android"));
const ios_1 = __importDefault(require("../platforms/ios"));
const visionos_1 = __importDefault(require("../platforms/visionos"));
const platforms = {
    android: android_1.default,
    ios: ios_1.default,
    visionos: visionos_1.default,
};
/**
 * Utility to register a new supported platform.
 *
 * @param {string} name The name of the platform (eg. web, desktop)
 * @param platform A platform definition of the platform specifics
 */
function addPlatform(name, platform) {
    (0, log_1.info)(`Adding platform ${name}`, platform);
    platforms[name] = platform;
}
exports.addPlatform = addPlatform;
/**
 * Utility to get the currently targeted platform definition
 */
function getPlatform() {
    return platforms[getPlatformName()];
}
exports.getPlatform = getPlatform;
/**
 * Utility to get all registered/available platforms
 */
function getAvailablePlatforms() {
    return Object.keys(platforms);
}
exports.getAvailablePlatforms = getAvailablePlatforms;
/**
 * Utility to get the currently targeted platform name
 */
function getPlatformName() {
    if (__1.env === null || __1.env === void 0 ? void 0 : __1.env.android) {
        return 'android';
    }
    if (__1.env === null || __1.env === void 0 ? void 0 : __1.env.ios) {
        return 'ios';
    }
    if ((__1.env === null || __1.env === void 0 ? void 0 : __1.env.visionos) || (__1.env === null || __1.env === void 0 ? void 0 : __1.env.vision)) {
        return 'visionos';
    }
    // support custom platforms
    if (__1.env === null || __1.env === void 0 ? void 0 : __1.env.platform) {
        if (platforms[__1.env.platform]) {
            return __1.env.platform;
        }
        throw (0, log_1.error)(`
			Invalid platform: ${__1.env.platform}

			Valid platforms: ${getAvailablePlatforms().join(', ')}
		`);
    }
    (0, log_1.warnOnce)('getPlatformName', `
		You need to provide a target platform!

		Available platforms: ${Object.keys(platforms).join(', ')}

		Use --env.platform=<platform> or --env.android, --env.ios, --env.visionos to specify the target platform.

		Defaulting to "ios".
	`);
    return 'ios';
}
exports.getPlatformName = getPlatformName;
/**
 * Utility to get the entry file path for the currently targeted platform
 */
function getEntryPath() {
    const platform = getPlatform();
    // use platform specific entry path
    if (platform.getEntryPath) {
        return platform.getEntryPath();
    }
    // try main from nativescript.config.ts
    const main = (0, config_1.getValue)('main');
    if (main) {
        return (0, path_1.resolve)((0, project_1.getProjectRootPath)(), main);
    }
    // fallback to main field in package.json
    const packageJson = (0, project_1.getPackageJson)();
    return (0, path_1.resolve)((0, project_1.getProjectRootPath)(), packageJson.main);
}
exports.getEntryPath = getEntryPath;
/**
 * Utility to get the entry file directory path for the currently targeted platform
 */
function getEntryDirPath() {
    return (0, path_1.dirname)(getEntryPath());
}
exports.getEntryDirPath = getEntryDirPath;
/**
 * Utility to get the dist file path for the currently targeted platform
 */
function getDistPath() {
    var _a;
    const platform = getPlatform();
    // use platform specific entry path
    if (platform.getDistPath) {
        return platform.getDistPath();
    }
    // fallback to a generic platforms/<platform>/dist folder
    return `${(_a = __1.env.buildPath) !== null && _a !== void 0 ? _a : 'platforms'}/${getPlatformName()}/dist`;
}
exports.getDistPath = getDistPath;
/**
 * Utility to get the absolute dist file path for the currently targeted platform
 */
function getAbsoluteDistPath() {
    return (0, path_1.resolve)((0, project_1.getProjectRootPath)(), getDistPath());
}
exports.getAbsoluteDistPath = getAbsoluteDistPath;
//# sourceMappingURL=platform.js.map