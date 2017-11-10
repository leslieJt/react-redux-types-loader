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
            item
              .get('init')
              .replaceWith(
                t.StringLiteral(
                  module_path ? module_path : +new Date() + '_' + index
                )
              );
          }
        });
      }
    }
  };
};
