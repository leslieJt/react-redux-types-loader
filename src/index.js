const {transform} = require('babel-core');
const plugin = require('./plugin');

module.exports = (source)=>{
    const {code,map,ast} = transform(source,{plugins: [plugin]});
    return code;
}