const { rootPath, craftPath, merge } = require('./helper');
const userConfig = require('../config');

// Default config.
const defaultConfig = {
  root: rootPath(),
  stats: false,
  craft: true,
  lint: true,
  craftPath: '../',
  context: 'app/src/assets',
  entry: {
    main: [
      './scripts/main.js',
      './styles/main.scss'
    ]
  },
  url: {
    dev: 'http://qraft.local',
    proxy: 'http://localhost:3000'
  },
  output: {
    path: 'web/assets',
    publicPath: '/assets/',
    filename: 'scripts/[name].js'
  },
  watch: [
    'config/*.php',
    'templates/**/*'
  ],
  staticServer: {
    output: {
      path: 'app/dist/assets',
      publicPath: '/dist/assets/'
    },
    host: 'localhost',
    port: 3000,
    baseDir: [
      'app'
    ],
    watch: [
      'app/*'
    ]
  },
  modules: {},
  devtool: '',
  sourceMap: false,
  hmr: true,
  rules: [],
  plugins: []
};

// Initial configuration setup.
// NOTE: Implemented "best case scenario" configuration. No error checking. Should probably implement.
const config = merge(defaultConfig, userConfig);

config.context = rootPath(config.context);
config.staticServer.output.path = rootPath(config.staticServer.output.path);
config.output.path = config.craft ? rootPath(craftPath(config.craftPath, config.output.path)) : config.staticServer.output.path;
config.watch = config.craft ? config.watch.map(s => craftPath(config.craftPath, s)) : config.watch;
config.modules = userConfig.modules == null ? config.modules : userConfig.modules;

module.exports = config;