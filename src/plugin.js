module.exports = function({ types: t }) {
  let _unique_path = +new Date();
  return {
    name: 'react-redux-types-plugin',
    visitor: {
      ExportNamedDeclaration(path) {
        if (!path.get('declaration').isVariableDeclaration()) return;
        let declaration = path.get('declaration');
        if (!declaration.get('declarations').length) return;
        declaration.get('declarations').map((item, index) => {
          if (item.isVariableDeclarator()) {
            item
              .get('init')
              .replaceWith(t.StringLiteral(_unique_path + '_' + index));
          }
        });
      }
    }
  };
};
