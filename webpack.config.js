var path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/Ftool.ts',
	output: {
		filename: 'Ftool.min.js',
		path: path.resolve(__dirname, './dist'),
		libraryTarget: 'umd'
		//umdNamedDefine: true
	},

	optimization: {
		minimize: true
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'ts-loader'
				}
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};
