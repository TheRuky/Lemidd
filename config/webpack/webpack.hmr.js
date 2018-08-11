// Configuration object for HMR client string.
const clientConfig = {
  reload: true,
  noInfo: true,
  quiet: true,
  timeout: 2000
};

/**
 * Generates HMR client string based on given configuration.
 * @param {Object} config - Client configuration.
 * @returns {string} Client string.
 */
const generateClient = (config) => {
  let client = `webpack-hot-middleware/client`;

  if(config == null) return client;

  let init = true;
  Object.keys(config).forEach(key => {
    client = `${client}${init ? '?' : '&'}${key}=${config[key]}`;

    init &= false;
  });

  return client;
};

/**
 * Adds HMR client string to Webpack entry point.
 * @param {(string|string[]|Object)} entry - Webpack entry object.
 * @returns {string[]|Object} Modified Webpack entry.
 */
const hmr = (entry) => {
  const client = generateClient(clientConfig);

  // If entry is a string.
  if(typeof entry === 'string' || entry instanceof String) {
    return [client, entry];
  }

  // If entry is an array.
  if(Array.isArray(entry)) {
    entry.unshift(client);
    return entry;
  }

  // If entry is an object.
  // NOTE: Function assumes that object values are either a string or an array.
  Object.keys(entry).forEach(key => {
    entry[key] = Array.isArray(entry[key]) ? entry[key].slice(0) : [entry[key]];
    entry[key].unshift(client);
  });

  return entry;
};

module.exports = hmr;