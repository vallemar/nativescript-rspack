import { merge } from 'webpack-merge';
import { getPackageJson, getProjectRootPath, getProjectFilePath } from './project';
import { addVirtualEntry, addVirtualModule } from './virtualModules';
import { applyFileReplacements } from './fileReplacements';
import { addCopyRule, removeCopyRule } from './copyRules';
import { error, info, warn, warnOnce } from './log';
import { determineProjectFlavor } from './flavor';
import { readTsConfig } from './typescript';
import { getValue } from './config';
import { getIPS } from './host';
import { getAllDependencies, hasDependency, getDependencyPath } from './dependencies';
import { addPlatform, getAbsoluteDistPath, getDistPath, getEntryDirPath, getEntryPath, getPlatform, getPlatformName } from './platform';
declare const _default: {
    merge: typeof merge;
    addCopyRule: typeof addCopyRule;
    removeCopyRule: typeof removeCopyRule;
    applyFileReplacements: typeof applyFileReplacements;
    config: {
        getValue: typeof getValue;
    };
    dependencies: {
        getAllDependencies: typeof getAllDependencies;
        hasDependency: typeof hasDependency;
        getDependencyPath: typeof getDependencyPath;
    };
    flavor: {
        determineProjectFlavor: typeof determineProjectFlavor;
    };
    host: {
        getIPS: typeof getIPS;
    };
    log: {
        error: typeof error;
        info: typeof info;
        warn: typeof warn;
        warnOnce: typeof warnOnce;
    };
    platform: {
        addPlatform: typeof addPlatform;
        getAbsoluteDistPath: typeof getAbsoluteDistPath;
        getDistPath: typeof getDistPath;
        getEntryDirPath: typeof getEntryDirPath;
        getEntryPath: typeof getEntryPath;
        getPlatform: typeof getPlatform;
        getPlatformName: typeof getPlatformName;
    };
    project: {
        getProjectFilePath: typeof getProjectFilePath;
        getProjectRootPath: typeof getProjectRootPath;
        getPackageJson: typeof getPackageJson;
    };
    virtualModules: {
        addVirtualEntry: typeof addVirtualEntry;
        addVirtualModule: typeof addVirtualModule;
    };
    tsconfig: {
        readTsConfig: typeof readTsConfig;
    };
};
export default _default;
