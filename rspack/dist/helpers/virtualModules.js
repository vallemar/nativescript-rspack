"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVirtualModule = exports.addVirtualEntry = void 0;
const webpack_virtual_modules_1 = __importDefault(require("webpack-virtual-modules"));
const webpack_1 = require("webpack");
const fs_1 = require("fs");
const path_1 = require("path");
const ts_dedent_1 = __importDefault(require("ts-dedent"));
const platform_1 = require("./platform");
const project_1 = require("./project");
/**
 * @deprecated Virtual entries are not recommended by the webpack team, use real files instead. For example, resolve a path in node_modules if necessary.
 */
function addVirtualEntry(config, name, contents) {
    return addVirtualModule(config, `__@nativescript_webpack_virtual_entry_${name}__`, contents);
}
exports.addVirtualEntry = addVirtualEntry;
/**
 * @deprecated Virtual modules are not recommended by the webpack team, use real files instead. For example, resolve a path in node_modules if necessary.
 */
function addVirtualModule(config, name, contents) {
    const virtualEntryPath = (0, path_1.join)((0, platform_1.getEntryDirPath)(), `${name}`);
    // add the virtual entry to the context exclusions
    // makes sure that require.context will never
    // include the virtual entry.
    config
        .plugin(`ContextExclusionPlugin|${name}`)
        .use(webpack_1.ContextExclusionPlugin, [new RegExp(`${name}\.js$`)]);
    const options = {
        [virtualEntryPath]: (0, ts_dedent_1.default)(contents),
    };
    // AngularCompilerPlugin does not support virtual modules
    // https://github.com/sysgears/webpack-virtual-modules/issues/96
    // This is only an issue on v11, which has experimental webpack 5 support
    // AngularCompilerPlugin gets replaced by AngularWebpackPlugin on v12
    // todo: we can remove this special handling once we no longer support v11
    if (config.plugins.has('AngularCompilerPlugin')) {
        const compatEntryPath = (0, project_1.getProjectFilePath)((0, path_1.join)('node_modules', '.nativescript', `${name}`));
        (0, fs_1.mkdirSync)((0, path_1.dirname)(compatEntryPath), { recursive: true });
        (0, fs_1.writeFileSync)(compatEntryPath, options[virtualEntryPath]);
        return compatEntryPath;
    }
    if (config.plugins.has('VirtualModulesPlugin')) {
        config.plugin('VirtualModulesPlugin').tap((args) => {
            Object.assign(args[0], options);
            return args;
        });
    }
    else {
        config.plugin('VirtualModulesPlugin').use(webpack_virtual_modules_1.default, [options]);
    }
    return virtualEntryPath;
}
exports.addVirtualModule = addVirtualModule;
//# sourceMappingURL=virtualModules.js.map