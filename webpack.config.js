/* eslint-env es6, node */
const getBaseWebpackConfig = require('./getBaseWebpackConfig')

const unminifiedConfig = getBaseWebpackConfig()
unminifiedConfig.entry = {
    'additween-mocks': './index'
}

module.exports = [
    unminifiedConfig
]
