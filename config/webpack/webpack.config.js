const config = require('./config');

module.exports = {
  context: config.context,
  entry: config.entry,
  output: config.output,
  module: {
    rules: config.rules
  },
  stats: config.stats,
  plugins: config.plugins,
  devtool: config.devtool
};