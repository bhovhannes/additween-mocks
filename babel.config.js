/* eslint-env node */
module.exports = (api) => {
  const { NODE_ENV } = process.env

  // cache babel config as it is read by babel for each file
  api.cache.using(() => JSON.stringify([NODE_ENV]))

  let presetEnvOptions
  if (api.env('test')) {
    presetEnvOptions = {
      targets: {
        node: 'current'
      }
    }
  } else {
    presetEnvOptions = {
      bugfixes: true,
      modules: false,
      targets: {}
    }
  }

  const presets = [['@babel/preset-env', presetEnvOptions], ['@babel/preset-typescript']]

  const plugins = [
    [
      '@babel/plugin-transform-runtime',
      {
        version: require('@babel/runtime/package.json').version,
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules: !api.env('test')
      }
    ]
  ]

  return {
    presets,
    plugins
  }
}
