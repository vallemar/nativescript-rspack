"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformSuffixPlugin = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const id = 'PlatformSuffixPlugin';
/**
 * The platform suffix plugin will try to resolve files with a platform specifier (suffix)
 * falling back to the non-platform-specific version.
 *
 * For example:
 *   import something from './something.js'
 *
 *   will first look for './something.<platform>.js'
 *   and if not found look for './something.js'
 *
 */
class PlatformSuffixPlugin {
    constructor(options) {
        this.extensions = options.extensions;
        // if (typeof options.extensions === "function") {
        // 	this.extensions = options.extensions()
        // } else {
        // 	this.extensions = options.extensions
        // }
    }
    apply(compiler) {
        const platformRE = new RegExp(`\\.${this.extensions.join('|')}\\.`);
        // require.context
         compiler.hooks.contextModuleFactory.tap(id, (cmf) => {
            
            // @ts-ignore
            cmf.hooks.beforeResolve.tap(id, (modules, options) => {
             //   console.log("HEREEE beforeResolve", modules);

                const additionalModules = [];
                // we are looking for modules that are platform specific (something.<platform>.ext)
                // and we are duplicating them without the platform suffix
                // this allows using require.context with non-existent platformless filenames
                // but mapped to the platform specific variant (done in the resolver hook below)
                for (const module of modules) {
                    if (platformRE.test(module.request)) {
                        additionalModules.push(Object.assign(Object.assign({}, module), { request: module.request.replace(platformRE, '.') }));
                    }
                }
                modules.push(...additionalModules);
            });
        });
       // console.log(compiler.hooks);
        
        compiler.hooks.normalModuleFactory.tap(id, (normalModuleFactory) => {
          //  console.log("HEREEE normalModuleFactory", normalModuleFactory);

            normalModuleFactory.hooks.resolve.tapAsync(id, (data, callback) => {
              // Redirect the module
          /*    console.log("id", id);
             console.log("data", data);
             console.log("callback", callback); */
             callback();
            /*  for (const platform of this.extensions) {
                const { path, request } = request_;
                const ext = request && (0, path_1.extname)(request);
                const platformExt = ext ? `.${platform}${ext}` : '';
                if (path && request && ext && !request.includes(platformExt)) {
                    const platformRequest = request.replace(ext, platformExt);
                    const extPath = (0, path_1.resolve)(path, platformRequest);
                    // console.log({
                    // 	path,
                    // 	request,
                    // 	ext,
                    // 	extPath
                    // })
                    // if a file with the same + a platform suffix exists
                    // we want to resolve that file instead
                    if ((0, fs_1.existsSync)(extPath)) {
                        const message = `resolving "${request}" to "${platformRequest}"`;
                        const hook = resolver.ensureHook('normalResolve');
                        console.log(message);
                        // here we are creating a new resolve object and replacing the path
                        // with the .<platform>.<ext> suffix
                        const obj = Object.assign(Object.assign({}, request_), { path: resolver.join(path, platformRequest), relativePath: request_.relativePath &&
                                resolver.join(request_.relativePath, platformRequest), request: undefined });
                        // we call to the actual resolver to do the resolving of this new file
                        return resolver.doResolve(hook, obj, message, resolveContext, callback);
                    }
                }
            }
            callback(); */
            });
          });

     /*    compiler.resolverFactory.hooks.resolver
            .for('normal')
            .tap(id, (resolver) => {
    
            resolver.hooks.normalResolve.tapAsync(id, (request_, resolveContext, callback) => {
                for (const platform of this.extensions) {
                    const { path, request } = request_;
                    const ext = request && (0, path_1.extname)(request);
                    const platformExt = ext ? `.${platform}${ext}` : '';
                    if (path && request && ext && !request.includes(platformExt)) {
                        const platformRequest = request.replace(ext, platformExt);
                        const extPath = (0, path_1.resolve)(path, platformRequest);
                        // console.log({
                        // 	path,
                        // 	request,
                        // 	ext,
                        // 	extPath
                        // })
                        // if a file with the same + a platform suffix exists
                        // we want to resolve that file instead
                        if ((0, fs_1.existsSync)(extPath)) {
                            const message = `resolving "${request}" to "${platformRequest}"`;
                            const hook = resolver.ensureHook('normalResolve');
                            console.log(message);
                            // here we are creating a new resolve object and replacing the path
                            // with the .<platform>.<ext> suffix
                            const obj = Object.assign(Object.assign({}, request_), { path: resolver.join(path, platformRequest), relativePath: request_.relativePath &&
                                    resolver.join(request_.relativePath, platformRequest), request: undefined });
                            // we call to the actual resolver to do the resolving of this new file
                            return resolver.doResolve(hook, obj, message, resolveContext, callback);
                        }
                    }
                }
                callback();
            });
            // 	resolver.hooks.rawFile.tap(id, (request, resolveContext, callback) => {
            // 		if(request.path && !/\.ios\..+$/.test(request.path)) {
            // 			const { ext } = parse(request.path)
            // 			const platformExtPath = request.path.replace(ext, `.${this.platform}${ext}`)
            // 			// console.log({
            // 			//     p1: request.path,
            // 			//     p2: platformExtPath
            // 			// })
            // 			if(existsSync(platformExtPath)) {
            // 				// request.path = platformExtPath
            // 				// console.log('-'.repeat(100))
            // 				// console.log(request)
            // 				const obj = {
            // 					...request,
            // 					path: platformExtPath,
            // 					fullySpecified: false
            // 				}
            // 				return resolver.doResolve(
            // 					'raw-file',
            // 					obj,
            // 					`resolved ${request.path} to platform specific file: ${platformExtPath}`,
            // 					resolveContext,
            // 					(err, result) => {
            // 						if(err) return callback(err);
            // 						if(result) return callback(null, result);
            // 						return callback();
            // 					}
            // 				)
            // 				// return request
            // 			}
            // 		}
            // });
        }); */
    }
}
exports.PlatformSuffixPlugin = PlatformSuffixPlugin;
//# sourceMappingURL=PlatformSuffixPlugin.js.map