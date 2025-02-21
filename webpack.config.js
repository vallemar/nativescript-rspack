let webpack;
const { resolve } = require('path')

const useRsPack = true;

if(useRsPack) {
	webpack = require("./rspack/dist/index");
}
else {
	webpack = require("@nativescript/webpack");
}


module.exports = (env) => {
	webpack.init(env);
	webpack.chainWebpack((config) => {
		if(useRsPack){
	
			config.resolve.alias.set(
				'@nativescript/webpack',
				resolve(__dirname, './rspack/dist/index')
			)
		}
    })


	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	return webpack.resolveConfig();
};