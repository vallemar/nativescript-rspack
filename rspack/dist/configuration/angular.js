"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const semver_1 = require("semver");
const fs_1 = require("fs");
const typescript_1 = require("../helpers/typescript");
const dependencies_1 = require("../helpers/dependencies");
const project_1 = require("../helpers/project");
const index_1 = require("../index");
const log_1 = require("../helpers/log");
const platform_1 = require("../helpers/platform");
const base_1 = __importDefault(require("./base"));
// until we can switch to async/await on the webpack config, copy this from '@angular/compiler-cli'
const GLOBAL_DEFS_FOR_TERSER = {
    ngDevMode: false,
    ngI18nClosureMode: false,
};
const GLOBAL_DEFS_FOR_TERSER_WITH_AOT = Object.assign(Object.assign({}, GLOBAL_DEFS_FOR_TERSER), { ngJitMode: false });
function default_1(config, env = index_1.env) {
    var _a, _b;
    (0, base_1.default)(config, env);
    const platform = (0, platform_1.getPlatformName)();
    const tsConfigPath = (0, project_1.getProjectTSConfigPath)();
    const disableAOT = !!env.disableAOT;
    // remove default ts rule
    config.module.rules.delete('ts');
    // remove fork ts checked as not needed
    config.plugins.delete('ForkTsCheckerWebpackPlugin');
    // explicitly define mainFields to make sure ngcc compiles as es2015 (module field)
    // instead of umd (main field).
    config.resolve.mainFields.add('module').add('main');
    config.module
        .rule('angular')
        .test(/(?:\.ngfactory.js|\.ngstyle\.js|\.ts)$/)
        .use('@ngtools/webpack')
        .loader('@ngtools/webpack');
    config.module
        .rule('@angular/core')
        .test(/[\/\\]@angular[\/\\]core[\/\\].+\.js$/)
        .parser({ system: true });
    // set up html
    config.module
        .rule('html')
        .test(/\.html$/)
        .use('raw-loader')
        .loader('raw-loader');
    // exclude component css files from the normal css rule
    config.module
        .rule('css')
        .include.add((0, path_1.resolve)((0, platform_1.getEntryDirPath)(), 'app.css'))
        .add((0, path_1.resolve)((0, platform_1.getEntryDirPath)(), `app.${platform}.css`))
        .add(/node_modules/);
    // and instead use raw-loader, since that's what angular expects
    config.module
        .rule('css|component')
        .exclude.add((0, path_1.resolve)((0, platform_1.getEntryDirPath)(), 'app.css'))
        .add((0, path_1.resolve)((0, platform_1.getEntryDirPath)(), `app.${platform}.css`))
        .add(/node_modules/)
        .end()
        .test(/\.css$/)
        .use('raw-loader')
        .loader('raw-loader');
    // get base postCSS options
    const postCSSOptions = config.module
        .rule('scss')
        .uses.get('postcss-loader')
        .get('options');
    // exclude component css files from the normal css rule
    config.module
        .rule('scss')
        .include.add((0, path_1.resolve)((0, platform_1.getEntryDirPath)(), 'app.scss'))
        .add((0, path_1.resolve)((0, platform_1.getEntryDirPath)(), `app.${platform}.scss`))
        .add(/node_modules/);
    // and instead use raw-loader, since that's what angular expects
    config.module
        .rule('scss|component')
        .exclude.add((0, path_1.resolve)((0, platform_1.getEntryDirPath)(), 'app.scss'))
        .add((0, path_1.resolve)((0, platform_1.getEntryDirPath)(), `app.${platform}.scss`))
        .add(/node_modules/)
        .end()
        .test(/\.scss$/)
        .use('raw-loader')
        .loader('raw-loader')
        .end()
        .use('postcss-loader')
        .loader('postcss-loader')
        .options(postCSSOptions)
        .end()
        .use('sass-loader')
        .loader('sass-loader');
    const angularCompilerPlugin = getAngularCompilerPlugin();
    if (angularCompilerPlugin) {
        config.plugin('AngularCompilerPlugin').use(angularCompilerPlugin, [
            {
                tsConfigPath,
                mainPath: (0, platform_1.getEntryPath)(),
                // disable type checking in a forked process - it ignores
                // the hostReplacementPaths and prints errors about
                // platform suffixed files, even though they are
                // working as expected.
                forkTypeChecker: false,
                hostReplacementPaths(path) {
                    const ext = (0, path_1.extname)(path);
                    const platformExt = `.${platform}${ext}`;
                    // already includes a platform specific extension - ignore
                    if (path.includes(platformExt)) {
                        return path;
                    }
                    const platformPath = path.replace(ext, platformExt);
                    // check if the same file exists with a platform suffix and return if it does.
                    if ((0, fs_1.existsSync)(platformPath)) {
                        // console.log(`[hostReplacementPaths] resolving "${path}" to "${platformPath}"`);
                        return platformPath;
                    }
                    // just return the original path otherwise
                    return path;
                },
                platformTransformers: [require('../transformers/NativeClass').default],
            },
        ]);
    }
    const angularWebpackPlugin = getAngularWebpackPlugin();
    if (angularWebpackPlugin) {
        // angular no longer supports transformers.
        // so we patch their method until they do
        // https://github.com/angular/angular-cli/pull/21046
        const originalCreateFileEmitter = angularWebpackPlugin.prototype.createFileEmitter;
        angularWebpackPlugin.prototype.createFileEmitter = function (...args) {
            let transformers = args[1] || {};
            if (!transformers.before) {
                transformers.before = [];
            }
            if (this.pluginOptions.jitMode) {
                transformers.before.unshift(require('../transformers/NativeClass').default);
            }
            else {
                transformers.before.push(require('../transformers/NativeClass').default);
            }
            args[1] = transformers;
            return originalCreateFileEmitter.apply(this, args);
        };
        config.plugin('AngularWebpackPlugin').use(angularWebpackPlugin, [
            {
                tsconfig: tsConfigPath,
                directTemplateLoading: false,
                jitMode: disableAOT,
            },
        ]);
        config.when(env.hmr, (config) => {
            config.module
                .rule('angular-hmr')
                .enforce('post')
                .test((0, platform_1.getEntryPath)())
                .use('angular-hot-loader')
                .loader('angular-hot-loader');
        });
        const buildAngularVersion = (0, dependencies_1.getDependencyVersion)('@angular-devkit/build-angular');
        if (buildAngularVersion) {
            const buildAngularOptions = {
                aot: !disableAOT,
            };
            if ((0, semver_1.satisfies)(buildAngularVersion, '<15.0.0')) {
                const tsConfig = (0, typescript_1.readTsConfig)(tsConfigPath);
                const { ScriptTarget } = (0, typescript_1.getTypescript)();
                buildAngularOptions.scriptTarget =
                    (_a = tsConfig.options.target) !== null && _a !== void 0 ? _a : ScriptTarget.ESNext;
            }
            if (disableAOT) {
                buildAngularOptions.optimize = false;
            }
            // zone + async/await
            config.module
                .rule('angular-webpack-loader')
                .test(/\.[cm]?[tj]sx?$/)
                .exclude.add(/[/\\](?:core-js|@babel|tslib|web-animations-js|web-streams-polyfill)[/\\]/)
                .end()
                .resolve.set('fullySpecified', false)
                .end()
                .before('angular')
                .use('webpack-loader')
                .loader(getWebpackLoaderPath())
                .options(buildAngularOptions);
        }
        else {
            (0, log_1.warnOnce)('build-angular-missing', `
				@angular-devkit/build-angular is missing! Some features may not work as expected. Please install it manually to get rid of this warning.
				`);
        }
    }
    // look for platform specific polyfills first
    // falling back to independent polyfills
    const polyfillsPath = [
        (0, path_1.resolve)((0, platform_1.getEntryDirPath)(), `polyfills.${platform}.ts`),
        (0, path_1.resolve)((0, platform_1.getEntryDirPath)(), `polyfills.ts`),
    ].find((path) => (0, fs_1.existsSync)(path));
    if (polyfillsPath) {
        const paths = config.entry('bundle').values();
        // replace globals with the polyfills file which
        // should handle loading the correct globals
        // and any additional polyfills required.
        if (paths.includes('@nativescript/core/globals/index')) {
            paths[paths.indexOf('@nativescript/core/globals/index')] = polyfillsPath;
            // replace paths with the updated paths
            config.entry('bundle').clear().merge(paths);
        }
    }
    // Filter common undesirable warnings
    config.set('ignoreWarnings', ((_b = config.get('ignoreWarnings')) !== null && _b !== void 0 ? _b : []).concat([
        /**
         * This rule hides
         * +-----------------------------------------------------------------------------------------+
         * | WARNING in Zone.js does not support native async/await in ES2017+.                      |
         * | These blocks are not intercepted by zone.js and will not triggering change detection.   |
         * | See: https://github.com/angular/zone.js/pull/1140 for more information.                 |
         * +-----------------------------------------------------------------------------------------+
         */
        /Zone\.js does not support native async\/await/,
        /**
         * This rule hides
         * +-----------------------------------------------------------------------------------------+
         * | WARNING in environment.*.ts is part of the TypeScript compilation but it's unused.      |
         * | Add only entry points to the 'files' or 'include' properties in your tsconfig.          |
         * +-----------------------------------------------------------------------------------------+
         */
        /environment(\.(\w+))?\.ts is part of the TypeScript compilation but it's unused/,
        // Additional rules to suppress warnings that are safe to ignore
        {
            module: /@angular\/core\/(__ivy_ngcc__\/)?fesm2015\/core.js/,
            message: /Critical dependency: the request of a dependency is an expression/,
        },
        /core\/profiling/,
        /core\/ui\/styling/,
    ]));
    config.optimization.minimizer('TerserPlugin').tap((args) => {
        var _a, _b, _c;
        var _d, _e, _f;
        (_a = (_d = args[0]).terserOptions) !== null && _a !== void 0 ? _a : (_d.terserOptions = {});
        (_b = (_e = args[0].terserOptions).compress) !== null && _b !== void 0 ? _b : (_e.compress = {});
        (_c = (_f = args[0].terserOptions.compress).global_defs) !== null && _c !== void 0 ? _c : (_f.global_defs = {});
        args[0].terserOptions.compress.global_defs = Object.assign(Object.assign({}, args[0].terserOptions.compress.global_defs), (disableAOT
            ? GLOBAL_DEFS_FOR_TERSER
            : GLOBAL_DEFS_FOR_TERSER_WITH_AOT));
        return args;
    });
    // todo: re-visit later, disabling by default now
    // config.plugin('DefinePlugin').tap((args) => {
    // 	args[0] = merge(args[0], {
    // 		__UI_USE_EXTERNAL_RENDERER__: true,
    // 	});
    // 	return args;
    // });
    return config;
}
exports.default = default_1;
function getAngularCompilerPlugin() {
    const { AngularCompilerPlugin } = require('@ngtools/webpack');
    return AngularCompilerPlugin;
}
function getAngularWebpackPlugin() {
    const { AngularWebpackPlugin } = require('@ngtools/webpack');
    return AngularWebpackPlugin;
}
function tryRequireResolve(path) {
    try {
        return require.resolve(path);
    }
    catch (err) {
        return null;
    }
}
function getWebpackLoaderPath() {
    var _a, _b;
    return ((_b = (_a = tryRequireResolve('@angular-devkit/build-angular/src/babel/webpack-loader')) !== null && _a !== void 0 ? _a : tryRequireResolve('@angular-devkit/build-angular/src/tools/babel/webpack-loader')) !== null && _b !== void 0 ? _b : 
    // fallback to angular 16.1+
    '@angular-devkit/build-angular/src/tools/babel/webpack-loader');
}
//# sourceMappingURL=angular.js.map