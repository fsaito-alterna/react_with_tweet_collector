const path = require('path')
const webpack = require('webpack')

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

const HtmlWebPackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: 'index.html',
})

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'css/[name].[contenthash].css',
})

const CleanWebpackPlugin = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin()
const ManifestPlugin = require('webpack-manifest-plugin')
const manifestPlugin = new ManifestPlugin({
  writeToFileEmit: true
})
const providePlugin = new webpack.ProvidePlugin({
  Promise: 'es6-promise',
})

const prerenderSPAPlugin = new PrerenderSPAPlugin({
  // `/distribution`のとこに出力先のフォルダ
  staticDir: path.join(__dirname, './public/'),
  indexPath: path.join(__dirname, './public/index.html'),
  outputDir: path.join(__dirname, './prerender/'),
  // プリレンダリングするページ
  routes: [
    // add prerender path.
  ],
  renderer: new Renderer({
    // Optional - defaults to 0, no limit.
    // Routes are rendered asynchronously.
    // Use this to limit the number of routes rendered in parallel.
    maxConcurrentRoutes: 5,
    // Optional - Wait to render until a certain amount of time has passed.
    // NOT RECOMMENDED
    renderAfterTime: 8000, // Wait 5 seconds.
  })
})

module.exports = (env, argv) => ({
  entry: {
    app: [ './src/index.tsx' ]
  },
  devtool: argv.mode === 'development' ? 'cheap-module-eval-source-map' : false,
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules(?!(\/|\\)query-string)/,
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules=true',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jp(e?)g|gif|svg|ico|pdf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'img/[name].[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.sass', 'css'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  devServer: {
    compress: true,
    inline: true,
    port: 10000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    },
    host: 'localhost',
  },
  plugins: [
    cleanPlugin,
    miniCssExtractPlugin,
    htmlPlugin,
    manifestPlugin,
    providePlugin,
    prerenderSPAPlugin,
  ],
})
