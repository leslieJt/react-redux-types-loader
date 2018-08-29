module.exports = function({ types: t }) {
  return {
    name: 'react-redux-types-plugin',
    visitor: {
      ExportNamedDeclaration(path, state) {
        const { module_path } = state.opts;
        if (!path.get('declaration').isVariableDeclaration()) return;
        let declaration = path.get('declaration');
        if (!declaration.get('declarations').length) return;
        declaration.get('declarations').map((item, index) => {
          if (item.isVariableDeclarator()) {
            if(item.get('init').node && item.get('init').get('expressions'))return item;//变量赋值时，不进行变换
            let value = item.get('init').node
              ? item.get('init').node.value
              : '';
            let str =
              (module_path ? module_path : +new Date()) +
              '/' +
              (value ? value.toString() : item.get('id').node.name);
            let cwd = process.cwd();
            item
              .get('init')
              .replaceWith(t.StringLiteral(str.replace(new RegExp(cwd), '')));
          }
        });
      }
    }
  };
};
