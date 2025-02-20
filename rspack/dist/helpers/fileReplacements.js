"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFileReplacements = exports.getFileReplacementsFromEnv = void 0;
const path_1 = require("path");
const index_1 = require("../index");
const project_1 = require("./project");
const copyRules_1 = require("./copyRules");
/**
 * @internal
 */
function getFileReplacementsFromEnv(env = index_1.env) {
    const fileReplacements = {};
    const entries = (() => {
        if (Array.isArray(env.replace)) {
            return env.replace;
        }
        if (typeof env.replace === 'string') {
            return [env.replace];
        }
        return [];
    })();
    entries.forEach((replaceEntry) => {
        replaceEntry.split(/,\s*/).forEach((r) => {
            let [_replace, _with] = r.split(':');
            if (!_replace || !_with) {
                return;
            }
            // make sure to resolve replacements to a full path
            // relative to the project root
            _replace = (0, path_1.resolve)((0, project_1.getProjectRootPath)(), _replace);
            _with = (0, path_1.resolve)((0, project_1.getProjectRootPath)(), _with);
            fileReplacements[_replace] = _with;
        });
    });
    return fileReplacements;
}
exports.getFileReplacementsFromEnv = getFileReplacementsFromEnv;
function applyFileReplacements(config, fileReplacements = getFileReplacementsFromEnv()) {
    Object.entries(fileReplacements).forEach(([_replace, _with]) => {
        // in case we are replacing source files - we'll use aliases
        if (_replace.match(/\.(ts|js)$/)) {
            return config.resolve.alias.set(_replace, _with);
        }
        // otherwise we will override the replaced file with the replacement
        (0, copyRules_1.addCopyRule)({
            from: _with, // copy the replacement file
            to: _replace, // to the original "to-be-replaced" file
            force: true,
        });
    });
}
exports.applyFileReplacements = applyFileReplacements;
//# sourceMappingURL=fileReplacements.js.map