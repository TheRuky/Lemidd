const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyGlobsPlugin = require('copy-globs-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const { hasArg } = require('./helper');

// Merge default and user config.
const config = require('./loadConfig');

const isWatch = hasArg('watch');

config.stats = !isWatch;

// Plugins
let plugins = [
  new webpack.ProvidePlugin(config.modules),
  new ExtractTextPlugin({
    filename: 'styles/[name].css',
    allChunks: true,
    disable: isWatch
  }),
  new CopyGlobsPlugin({
    pattern: 'images/**/*',
    output: '[path][name].[ext]'
  }),
  new CleanPlugin([config.craft ? config.output.path : config.staticServer.output.path], {
    root: config.root,
    verbose: false
  })
];

// Configure plugins.
// If 'watch' is enabled - development mode.
if(isWatch) {
  config.devtool = 'cheap-module-source-map';
  config.sourceMap = true;

  let watchPlugins = [];

  if(config.craft) {
    if(config.hmr) {
      config.entry = require('./webpack.hmr')(config.entry);
      const BrowserSyncPlugin = require('browsersync-webpack-plugin');
      watchPlugins = watchPlugins.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new BrowserSyncPlugin({
          target: config.url.dev,
          proxyUrl: config.url.proxy,
          watch: config.watch,
          open: true,
          delay: 1000
        })
      ]);
    } else {
      const EventHooksPlugin = require('event-hooks-webpack-plugin');
      const BrowserSync = require('browser-sync').create();

      BrowserSync.init({
        proxy: config.url.dev,
        host: config.staticServer.host,
        port: config.staticServer.port,
        files: config.watch
      });

      watchPlugins = watchPlugins.concat([
        new EventHooksPlugin({
          done: () => {
            BrowserSync.reload();
          }
        })
      ]);
    }
  } else {
    const EventHooksPlugin = require('event-hooks-webpack-plugin');
    const BrowserSync = require('browser-sync').create();

    config.output.path = config.staticServer.output.path;
    config.output.publicPath = config.staticServer.output.publicPath;

    BrowserSync.init({
      host: config.staticServer.host,
      port: config.staticServer.port,
      files: config.staticServer.watch,
      server: { baseDir: config.staticServer.baseDir }
    });

    watchPlugins = watchPlugins.concat([
      new EventHooksPlugin({
        done: () => {
          BrowserSync.reload();
        }
      })
    ]);
  }

  plugins = plugins.concat(watchPlugins);
} else {


  const { default: ImageminPlugin } = require('imagemin-webpack-plugin');
  const imageminMozjpeg = require('imagemin-mozjpeg');

  let buildPlugins = [];

  buildPlugins = buildPlugins.concat([
    new ImageminPlugin({
      optipng: { optimizationLevel: 7 },
      gifsicle: { optimizationLevel: 3 },
      pngquant: { quality: '65-90', speed: 4 },
      svgo: { removeUnknownsAndDefaults: false, cleanupIDs: false },
      plugins: [imageminMozjpeg({ quality: 75 })],
      disable: isWatch,
    }),
  ]);

  plugins = plugins.concat(buildPlugins);
}

// Configure rules
let rules = [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)\/(?!(dom7|ssr-window|swiper)\/).*/,
    use: [
      {
        loader: 'cache-loader'
      },
      {
        loader: 'babel-loader',
        options: { presets: ['env'] }
      }
    ]
  },
  {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'cache-loader'
        },
        {
          loader: 'css-loader',
          options: { sourceMap: config.sourceMap }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: { path: __dirname, ctx: { isWatch } },
            sourceMap: config.sourceMap
          }
        },
        {
          loader: 'resolve-url-loader',
          options: { sourceMap: config.sourceMap }
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: config.sourceMap }
        }
      ]
    })
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'cache-loader'
        },
        {
          loader: 'css-loader',
          options: { sourceMap: config.sourceMap }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: { path: __dirname, ctx: { isWatch } },
            sourceMap: config.sourceMap
          }
        },
        {
          loader: 'resolve-url-loader',
          options: { sourceMap: config.sourceMap }
        }
      ]
    })
  },
  {
    test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
    include: config.context,
    loader: 'url-loader',
    options: {
      limit: 4096,
      publicPath: '/assets/',
      name: `[path][name].[ext]`,
    }
  },
  {
    test: /\.(mp4|webm)$/,
    include: config.context,
    loader: 'url-loader',
    options: {
      name: `[path][name].[ext]`
    }
  },
  {
    test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
    include: /node_modules|bower_components/,
    loader: 'url-loader',
    options: {
      limit: 4096,
      outputPath: 'vendor/',
      name: `[name].[ext]`,
    },
  },
];

// Assign rules and plugins.
config.rules = rules;
config.plugins = plugins;

module.exports = config;