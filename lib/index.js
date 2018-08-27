var _require = require('babel-core'),
    transform = _require.transform;

var plugin = require('./plugin');

module.exports = function (source) {
  var path = this.context;

  var _transform = transform(source, {
    plugins: [[plugin, { module_path: path }]]
  }),
      code = _transform.code,
      map = _transform.map,
      ast = _transform.ast;

  return code;
};