let webpack;
const { resolve } = require('path')

const useRsPack = true;

if (useRsPack) {
	webpack = require("./@nativescript-rspack/dist");
}
else {
	webpack = require("@nativescript/webpack");
}


module.exports = (env) => {
	webpack.init(env);
	webpack.chainWebpack((config) => {
		if (useRsPack) {
			config.plugin('DefinePlugin').tap((args) => {
				args[0] = Object.assign(args[0], {
					'global.isWeb': JSON.stringify(true),
				})
				return args
			})
		}
	})


	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	return webpack.resolveConfig();
};