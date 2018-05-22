const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const { resolve } = require('path')
const { entry, devdir, prodir, dotenv } = require('./.variables.js')

const base = {
  
  context: process.cwd(),

  mode: 'production',

  entry: [
    `whatwg-fetch`,
    `babel-polyfill`
  ].concat(
    [resolve(entry)]
  ),

  resolve: {
    mainFields: ['jsnext:main', 'module', 'browser', 'main']
  },

  output: {
    path: resolve(prodir),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: `babel-loader?cacheDirectory`, exclude: [resolve('node_modules')] },
      { test: /\.css$/, loader: 'css-loader' }
    ]
  },

  plugins: [
    new Dotenv({
      path: dotenv,
      systemvars: true
    })
  ],

  optimization: {
    providedExports: true,
    usedExports: true,
    sideEffects: true,
    // concatenateModules: false // <= important for tree-shaking???
  }

}

const configs = {

  pro: () => base,

  non() {
    const pro = this.pro()
    pro.mode = 'none'
    pro.plugins = pro.plugins || []
    pro.plugins.push(new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }))
    return pro
  },

  ana() {
    const pro = this.pro()
    pro.plugins = pro.plugins || []
    pro.plugins.push(new BundleAnalyzerPlugin({}))
    return pro
  },

  spl() {
    const pro = this.pro()
    pro.optimization = Object.assign({}, pro.optimization, {
      splitChunks: {
        name: 'vendor',
        chunks: 'initial'
      }
    })
    return pro
  }

}

const { npm_lifecycle_event } = process.env
const suffix = npm_lifecycle_event.split(':')[1]
module.exports = configs[suffix]()