const config = ({ file, options }) => {
  return {
    parser: !options ? 'postcss-safe-parser' : undefined,
    plugins: {
      'css-mqpacker': true,
      cssnano: !options ? { preset: ['default', { discardComments: { removeAll: true } }] } : false,
      autoprefixer: true
    }
  };
};

module.exports = config;