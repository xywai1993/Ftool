var path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './Ftool.js',
	output: {
		filename: 'Ftool.min.js',
		path: path.resolve(__dirname, './dist'),
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader:  'babel-loader'
				}
			}
		]
	}
    
};