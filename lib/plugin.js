module.exports = function (_ref) {
  var t = _ref.types;

  return {
    name: 'react-redux-types-plugin',
    visitor: {
      ExportNamedDeclaration: function ExportNamedDeclaration(path, state) {
        var module_path = state.opts.module_path;

        if (!path.get('declaration').isVariableDeclaration()) return;
        var declaration = path.get('declaration');
        if (!declaration.get('declarations').length) return;
        declaration.get('declarations').map(function (item, index) {
          if (item.isVariableDeclarator()) {
            if (item.get('init').node && item.get('init').get('expressions')) return item; //变量赋值时，不进行变换
            var value = item.get('init').node ? item.get('init').node.value : '';
            var str = (module_path ? module_path : +new Date()) + '/' + (value ? value.toString() : item.get('id').node.name);
            var cwd = process.cwd();
            item.get('init').replaceWith(t.StringLiteral(str.replace(new RegExp(cwd), '')));
          }
        });
      }
    }
  };
};