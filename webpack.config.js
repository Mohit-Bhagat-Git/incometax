const path = require('path')
var HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const argv = require('yargs').argv

console.log('ENV = ' + argv.env)
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/src/index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	entry: __dirname + '/src/index.js',
	devtool: 'inline-source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node-modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextWebpackPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},

			{
				test: /\.(png|jp(e*)g|svg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1, // Convert images < 8kb to base64 strings
						name: 'assets/images/[name].[ext]',
						publicPath: '../../'
					}
				}]
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1, // Convert images < 8kb to base64 strings
						name: 'assets/fonts/[name].[ext]',
						publicPath: '../../'
					}
				}
			},
			{
				test: /\.styl$/,
				//loader: ExtractTextWebpackPlugin.extract('css-loader!stylus-loader!url-loader')
				use: ExtractTextWebpackPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", 'stylus-loader']
				})
			}
		]
	},
	output: {
		filename: 'bundle.[chunkhash:4].js',
		//path: path.resolve(__dirname, '../slportalefe-web/src/main/webapp')
		path: __dirname + '/build'
	},
	plugins: [
		HTMLWebpackPluginConfig,
		new ExtractTextWebpackPlugin("assets/css/styles.[contenthash:4].css"),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.optimize\.styl$\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
			canPrint: true
		}),
		// new  webpack.DefinePlugin({
		// 	'process.env.NODE_ENV':  JSON.stringify('production')
		// }),
		// new  webpack.optimize.UglifyJsPlugin(), //minify everything		new  webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
		new CompressionPlugin({
			filename: "[path].jgz[query]",
			algorithm: "gzip",
			test: /\.bundle.js$/,
			threshold: 10240,
			minRatio: 0.8
		})
	],
	devServer: {
		publicPath: "/",
		contentBase: path.join(__dirname, ""),
		historyApiFallback: {
			index: '/index.html',
		},
		//compress: true,
		//contentBase: path.join(__dirname, ""),
		//historyApiFallback:true,
		port: 9080,
		host: "0.0.0.0"
	}
};