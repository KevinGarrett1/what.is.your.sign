const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { path: appRoot } = require('app-root-path');
const webpack = require('webpack');

module.exports = env => {
	const isDevMode = env.ENVIRONMENT === 'development';
	const mode = isDevMode ? 'development' : 'production';
	const envPath = isDevMode ? `${appRoot}/.env.development` : `${appRoot}/.env`;

	const plugins = [
		new HtmlWebpackPlugin({
			favicon: `${appRoot}/static/images/zodiacIcon.ico`,
			inject: true,
			template: `${appRoot}/src/index.html`,
			hash: !isDevMode,
			minify: !isDevMode,
		}),
		new MiniCssExtractPlugin({
			chunkFilename: isDevMode ? '[id].css' : '[id].[contenthash].css',
			filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
		}),
	];

	const minimizer = isDevMode ? [] : [new TerserPlugin(), new CssMinimizerPlugin()];

	if (isDevMode) {
		// only enable hot in development
		plugins.push(new webpack.HotModuleReplacementPlugin());
	}

	return {
		devServer: {
			compress: true,
			hot: true,
			port: 4001,
		},
		cache: {
			type: 'memory',
		},
		devtool: isDevMode ? 'eval' : false,
		entry: `${appRoot}/src`,
		mode,
		module: {
			rules: [
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {},
						},
						'css-loader',
						'postcss-loader',
						'sass-loader',
					],
				},
				{
					exclude: /node_modules/,
					test: /\.(jsx?|tsx?)$/,
					use: ['babel-loader'],
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					type: 'asset',
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'fonts/',
							},
						},
					],
				},
			],
		},
		output: {
			chunkFilename: isDevMode ? '[id].js' : '[id].[contenthash].js',
			clean: true,
			filename: isDevMode ? '[name].js' : '[name].[contenthash].js',
			path: `${appRoot}/dist`,
		},
		optimization: {
			moduleIds: 'deterministic',
			splitChunks: {
				chunks: 'async',
				minSize: 500000,
				minRemainingSize: 0,
				maxSize: 2000000,
				minChunks: 1,
				maxAsyncRequests: 30,
				maxInitialRequests: 30,
				enforceSizeThreshold: 2000000,
				cacheGroups: {
					styles: {
						chunks: 'all',
						enforce: true,
						name: 'styles',
						test: /\.(sa|sc|c)ss$/,
					},
					defaultVendors: {
						priority: -10,
						reuseExistingChunk: true,
						test: /[\\/]node_modules[\\/]/,
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
					},
				},
			},
			minimize: true,
			minimizer,
		},
		performance: {
			hints: false,
		},
		plugins,
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
		},
		stats: {
			children: false,
			entrypoints: false,
		},
		target: 'web',
	};
};
