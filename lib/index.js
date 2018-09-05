const _require = require('@babel/core'),
      transformSync = _require.transformSync;

const plugin = require('./plugin');

module.exports = function (source) {
  const path = this.context;

  const _transformSync = transformSync(source, {
    plugins: [[plugin, {
      module_path: path
    }]]
  }),
        code = _transformSync.code,
        map = _transformSync.map,
        ast = _transformSync.ast;

  return code;
};