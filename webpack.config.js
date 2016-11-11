"use strict";

const path = require("path");

// Webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		"canvas-platformer": ["./src/main.js"]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name]-[hash].js"
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			},
			{
				test: /\.(png|jpg|gif|jpeg|webp|mem)$/,
				loader: 'file'
			},
			{
				test: /\.glsl$/,
				loader: 'webpack-glsl'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
};
