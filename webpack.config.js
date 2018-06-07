let path = require('path');
let webpack = require('webpack');

module.exports = {

    entry: [
        'webpack-hot-middleware/client?http://localhost:3001',
        'webpack/hot/dev-server',
        './src/index.js'
    ],
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        hot: true,
        contentBase: './src'
    },
    output: {
        path: __dirname,
        filename: 'app.js',
        publicPath: '/js/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: ['babel-loader'],
            include: path.join(__dirname, 'src')
        },
        { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
        {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader']
        }]
    }
};