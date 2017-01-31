/* eslint-env node */
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
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        'eslint-loader'
                    ]
                }
            ]
        }
    }
}

module.exports = getBaseWebpackConfig
