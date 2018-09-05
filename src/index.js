const { transformSync } = require('@babel/core');
const plugin = require('./plugin');

module.exports = function(source) {
  const path = this.context;
  const { code, map, ast } = transformSync(source, {
    plugins: [[plugin, { module_path: path }]]
  });
  return code;
};
