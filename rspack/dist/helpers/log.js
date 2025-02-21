"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.warnOnce = exports.warn = exports.error = void 0;
const webpack_1 = require("../index");
const ts_dedent_1 = __importDefault(require("ts-dedent"));
// de-indents strings so multi-line string literals can be used
function cleanup(data) {
    return data.map((d) => {
        if (typeof d === 'string') {
            return (0, ts_dedent_1.default)(d);
        }
        return d;
    });
}
function error(...data) {
    console.warn(`[@nativescript/webpack] Error: \n`, ...cleanup(data));
    // we return the error - the caller can throw or ignore
    if (typeof data[0] === 'string') {
        return new Error('\n\n[@nativescript/webpack]\n---\n\n' + (0, ts_dedent_1.default)(data[0]) + '\n\n---\n');
    }
    return new Error('@nativescript/webpack ran into a problem...');
}
exports.error = error;
function warn(...data) {
    console.warn(`[@nativescript/webpack] Warn: \n`, ...cleanup(data));
}
exports.warn = warn;
const warnedMap = {};
function warnOnce(key, ...data) {
    if (warnedMap[key]) {
        return;
    }
    warnedMap[key] = true;
    warn(...data);
}
exports.warnOnce = warnOnce;
function info(...data) {
    if (webpack_1.env.verbose) {
        console.log(`[@nativescript/webpack] Info: \n`, ...cleanup(data));
    }
}
exports.info = info;
// todo: refine
// export function error(message: string, info?: { possibleCauses?: string[] }) {
// 	console.error(`
// 	NativeScript Webpack encountered an error and cannot proceed with the build:
//
// 	${message}
//
// 	Possible causes:
// 	${info?.possibleCauses?.map((cause) => `- ${cause}`).join('\n')}
// 	`);
// }
//# sourceMappingURL=log.js.map