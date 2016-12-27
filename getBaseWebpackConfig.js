/* eslint-env node */
var webpack = require('webpack')
var path = require('path')

function getBaseWebpackConfig() {
    return {
        context: __dirname,
        output: {
            libraryTarget: 'umd',
            library: 'additweenMocks',
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
            devtoolModuleFilenameTemplate: 'additween-mocks:///[resource-path]'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                }
            ],
            postLoaders: []
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin()
        ]
    }
}

module.exports = getBaseWebpackConfig
