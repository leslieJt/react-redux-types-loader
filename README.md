# react-redux-types-loader
解决redux中types不能根据文件夹模块化的问题

module.exports = {
  entry: {
    app: ['./index.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /components\/([^\/]+\/)*type[s]?.js$/,
        exclude: /node_modules/,
        loaders: ['react-redux-types-loader']
      }
    ]
  }
};
