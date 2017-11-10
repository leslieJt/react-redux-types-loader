# react-redux-types-loader

1. 问题

在react-redux模块使用时，types文件中namespace一直是个头疼的问题，常见的写法如下：


```
export const a = 'order_list_a';
export const b = 'order_list_b';
```
或者使用变量的形式

```
const _path = 'order_list_';
export const a = `${_path}a`;
export const b = `${_path}b`;
```
在我们拷贝文件夹的过程中，容易忘记或者不小心导致了namespace中的path相同，就会导致reducer被触发多次。

2. react-redux-types-loader的写法


```
export let a,b,c;
```
或者
```
export let a;
export let b;
export let c;
```
或者
```
export const a = 'aaa';
export const b = 'bbb';
export let c;
```
以上几种types文件的写法都能支持，而react-redux-types-loader会自动帮你解决namespace的问题。



---

下面是webpack中如何配置config的方法：

```
module.exports = {
  entry: {
    app: ['./index.jsx']
  }
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

```
在loaders的数组中加入react-redux-types-loader即可。

components是指项目中存放组件的大文件夹，例如下面的组织结构


---
### 注意事项

components文件夹下的所有types.js的文件都将被篡改源码，所以如果有需要命名为types.js的文件请放在components文件夹外，或者取其他名称。
