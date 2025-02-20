"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_merge_1 = require("webpack-merge");
const project_1 = require("./project");
const virtualModules_1 = require("./virtualModules");
const fileReplacements_1 = require("./fileReplacements");
const copyRules_1 = require("./copyRules");
const log_1 = require("./log");
const flavor_1 = require("./flavor");
const typescript_1 = require("./typescript");
const config_1 = require("./config");
const host_1 = require("./host");
const dependencies_1 = require("./dependencies");
const platform_1 = require("./platform");
// intentionally populated manually
// as this generates nicer typings
// that show all the utils inline
// rather than imports to types
// todo: maybe use api-extractor instead
exports.default = {
    merge: webpack_merge_1.merge,
    addCopyRule: copyRules_1.addCopyRule,
    removeCopyRule: copyRules_1.removeCopyRule,
    applyFileReplacements: fileReplacements_1.applyFileReplacements,
    config: {
        getValue: config_1.getValue,
    },
    dependencies: {
        getAllDependencies: dependencies_1.getAllDependencies,
        hasDependency: dependencies_1.hasDependency,
        getDependencyPath: dependencies_1.getDependencyPath,
    },
    flavor: {
        determineProjectFlavor: flavor_1.determineProjectFlavor,
    },
    host: {
        getIPS: host_1.getIPS,
    },
    log: {
        error: log_1.error,
        info: log_1.info,
        warn: log_1.warn,
        warnOnce: log_1.warnOnce,
    },
    platform: {
        addPlatform: platform_1.addPlatform,
        getAbsoluteDistPath: platform_1.getAbsoluteDistPath,
        getDistPath: platform_1.getDistPath,
        getEntryDirPath: platform_1.getEntryDirPath,
        getEntryPath: platform_1.getEntryPath,
        getPlatform: platform_1.getPlatform,
        getPlatformName: platform_1.getPlatformName,
    },
    project: {
        getProjectFilePath: project_1.getProjectFilePath,
        getProjectRootPath: project_1.getProjectRootPath,
        getPackageJson: project_1.getPackageJson,
    },
    virtualModules: {
        addVirtualEntry: virtualModules_1.addVirtualEntry,
        addVirtualModule: virtualModules_1.addVirtualModule,
    },
    tsconfig: {
        readTsConfig: typescript_1.readTsConfig,
    },
};
//# sourceMappingURL=index.js.map