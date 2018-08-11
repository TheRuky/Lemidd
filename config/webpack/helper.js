const path = require('path');

/**
 * Returns relative Craft path. Should only be used as relative path.
 * @param craftRoot - Craft root path. Should be relative and have '/' at the end.
 * @param filename - Filename to resolve from Craft root.
 * @returns {string} - Path from Craft root.
 */
const craftPath = (craftRoot, filename) => `${craftRoot}${filename}`;

/**
 * Function returns absolute path to given filename from root path (where process is run).
 * If no filename is given, path to where process is run is returned.
 * @param filename - Filename to get absolute path of.
 * @returns {string} - Absolute path.
 */
const rootPath = (filename) => filename == null ? process.cwd() : path.resolve(process.cwd(), filename);

/**
 * Merges two objects by keys. Works with nested objects too.
 * First given object is always a reference, meaning that if the
 * key exists in the second object, and not in the first,
 * it will not be added to the result.
 * @param obj1 - First object
 * @param obj2 - Second object.
 * @returns {Object} - Merged object.
 */
const merge = (obj1, obj2) => {
  const result = {};

  Object.keys(obj1).forEach(key => {
    if(isObject(obj1[key])) {
      result[key] = merge(obj1[key], obj2[key]);
    } else {
      result[key] = obj2[key] == null ? obj1[key] : obj2[key];
    }
  });

  return result;
};

/**
 * Check if given parameter is an Object, excluding Array.
 * @param obj - Object to check.
 * @returns {boolean} - true if object is an Object, false otherwise.
 */
const isObject = (obj) => obj === Object(obj) && !Array.isArray(obj);

/**
 * Checks if command line was called with given argument.
 * Argument is matched to arg or any number of dashes before arg (-arg, --arg, ...).
 * @param arg - Argument to check.
 * @returns {boolean} - true if argument was given, false otherwise.
 */
const hasArg = (arg) => {
  const regex = new RegExp(`-*${arg}`);
  return process.argv.slice(2).some(a => regex.test(a));
};

module.exports = { rootPath, merge, craftPath, hasArg };