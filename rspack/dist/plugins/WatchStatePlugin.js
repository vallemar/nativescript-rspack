"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchStatePlugin = exports.messages = void 0;
const __1 = require("../");
const id = 'WatchStatePlugin';
const version = 1;
var messages;
(function (messages) {
    messages["compilationComplete"] = "Webpack compilation complete.";
    messages["startWatching"] = "Webpack compilation complete. Watching for file changes.";
    messages["changeDetected"] = "File change detected. Starting incremental webpack compilation...";
})(messages || (exports.messages = messages = {}));
/**
 * This little plugin will report the webpack state through the console
 * and send status updates through IPC to the {N} CLI.
 */
class WatchStatePlugin {
    apply(compiler) {
        let isWatchMode = false;
        let prevAssets = [];
        compiler.hooks.watchRun.tapAsync(id, function (compiler, callback) {
            callback();
            if (isWatchMode) {
                __1.env.stats && console.log(messages.changeDetected);
                if (__1.env.verbose) {
                    if (compiler.modifiedFiles) {
                        Array.from(compiler.modifiedFiles).forEach((file) => {
                            console.log(`[${id}][WatchTriggers] MODIFIED: ${file}`);
                        });
                    }
                    if (compiler.removedFiles) {
                        Array.from(compiler.removedFiles).forEach((file) => {
                            console.log(`[${id}][WatchTriggers] REMOVED: ${file}`);
                        });
                    }
                }
            }
            isWatchMode = true;
        });
        compiler.hooks.afterEmit.tapAsync(id, function (compilation, callback) {
            callback();
            __1.env.stats &&
                console.log(isWatchMode ? messages.startWatching : messages.compilationComplete);
            const stats = compilation.getStats();
            if (stats.hasErrors()) {
                __1.env.verbose && console.log(`[${id}] Warn: Compilation had errors!`);
            }
            // logic taken from CleanWebpackPlugin
            // const assets =
            // 	stats.toJson(
            // 		{
            // 			assets: true,
            // 		},
            // 		true
            // 	).assets || [];
            // const assetList = assets.map((asset) => asset.name);
            // const emittedAssets = Array.from(compilation.emittedAssets);
            const assetList = Object.keys(compilation.assets);
            const emittedAssets = Array.from(compilation.emittedAssets);
            if (!prevAssets.length && emittedAssets.length < assetList.length) {
                emittedAssets.push(...assetList);
            }
            const staleAssets = prevAssets.filter((asset) => {
                return assetList.includes(asset) === false;
            });
            // store assets for next compilation
            prevAssets = assetList.sort();
            notify({
                type: 'compilation',
                version,
                hash: compilation.hash,
                data: {
                    emittedAssets,
                    staleAssets,
                },
            });
        });
    }
}
exports.WatchStatePlugin = WatchStatePlugin;
function notify(message) {
    __1.env.verbose && console.log(`[${id}] Notify: `, message);
    if (!process.send) {
        return;
    }
    process.send(message, (error) => {
        if (error) {
            console.error(`[${id}] Process Send Error: `, error);
        }
        return null;
    });
}
//# sourceMappingURL=WatchStatePlugin.js.map