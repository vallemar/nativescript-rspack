#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ansi_colors_1 = require("ansi-colors");
const commander_1 = require("commander");
const ts_dedent_1 = __importDefault(require("ts-dedent"));
const webpack_1 = __importDefault(require("webpack"));
const rspack = __importDefault(require("@rspack/core"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const parseEnvFlags_1 = require("../cli/parseEnvFlags");
const defaultConfig = path_1.default.resolve(__dirname, '../stubs/default.config.stub.js');
const tag = `[${(0, ansi_colors_1.green)('../index')}]`;
function error(message) {
    console.error(`${tag} ${(0, ansi_colors_1.redBright)((0, ts_dedent_1.default)(message))}`);
}
function info(message) {
    console.info(`${tag} ${(0, ansi_colors_1.greenBright)((0, ts_dedent_1.default)(message))}`);
}
commander_1.program.enablePositionalOptions();
commander_1.program
    .command('init')
    .description('Initialize a new webpack.config.js in the current directory.')
    .action(() => {
    const targetPath = path_1.default.resolve(process.cwd(), 'webpack.config.js');
    if (fs_1.default.existsSync(targetPath)) {
        return error(`File Already Exists: ${targetPath}`);
    }
    fs_1.default.copyFileSync(defaultConfig, targetPath);
    info('Initialized config.');
});
commander_1.program
    .command('build')
    .description('Build...')
    .option('--env [name]', 'environment name')
    .option('--config [path]', 'config path')
    .option('--watch', 'watch for changes')
    .allowUnknownOption()
    .action((options, command) => {
    var _a, _b, _c, _d;
    var _e;
    const env = (0, parseEnvFlags_1.parseEnvFlags)(command.args);
    // add --env <val> into the env object
    // for example if we use --env prod
    // we'd have env.env = 'prod'
    if (options.env) {
        env['env'] = options.env;
    }
    (_a = env['stats']) !== null && _a !== void 0 ? _a : (env['stats'] = true);
    (_b = env['watch']) !== null && _b !== void 0 ? _b : (env['watch'] = options.watch);
    // if --env.config is passed, we'll set an environment
    // variable to it's value so that the config Util
    // reads from the correct config file.
    (_c = (_e = process.env).NATIVESCRIPT_CONFIG_NAME) !== null && _c !== void 0 ? _c : (_e.NATIVESCRIPT_CONFIG_NAME = env['config']);
    const configPath = (() => {
        if (options.config) {
            return path_1.default.resolve(options.config);
        }
        return path_1.default.resolve(process.cwd(), 'webpack.config.js');
    })();
    // todo: validate config exists
    // todo: guard against invalid config
    let configuration;
    try {
        configuration = require(configPath)(env);
    }
    catch (err) {
        console.log(err);
    }
    if (!configuration) {
        console.log('No configuration!');
        process.exitCode = 1;
        return;
    }
    const compiler = (0, rspack.default)(configuration);
    const webpackCompilationCallback = (err, stats) => {
        if (err) {
            // Do not keep cache anymore
            compiler.purgeInputFileSystem();
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            process.exitCode = 1;
            return;
        }
        if (stats) {
            // Set the process exit code depending on errors
            process.exitCode = stats.hasErrors() ? 1 : 0;
            if (env.stats) {
                console.log(stats.toString({
                    chunks: false,
                    colors: true,
                    errorDetails: env.verbose,
                }));
            }
            // if webpack profile is enabled we write the stats to a JSON file
            if (configuration.profile || env.profile) {
                console.log([
                    '',
                    '|',
                    `|  The build profile has been written to ${(0, ansi_colors_1.yellow)('webpack.stats.json')}`,
                    `|  You can analyse the stats at ${(0, ansi_colors_1.green)('https://webpack.github.io/analyse/')}`,
                    '|',
                    '',
                ].join('\n'));
                fs_1.default.writeFileSync(path_1.default.join(process.cwd(), 'webpack.stats.json'), JSON.stringify(stats.toJson()));
            }
        }
    };
    if (options.watch) {
        env.stats && console.log('webpack is watching the files...');
        compiler.watch((_d = configuration.watchOptions) !== null && _d !== void 0 ? _d : {}, webpackCompilationCallback);
    }
    else {
        compiler.run((err, status) => {
            compiler.close((err2) => webpackCompilationCallback((err || err2), status));
        });
    }
});
commander_1.program.version(require('../../package.json').version, '-v, --version');
commander_1.program.parse(process.argv);
//# sourceMappingURL=index.js.map