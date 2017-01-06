// rollup.config.js
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const globals = require('rollup-plugin-node-globals');
const nodeResolve = require('rollup-plugin-node-resolve');
import babelrc from 'babelrc-rollup';

export default {
  entry: 'lib/react-native/Parse.js',
  dest: 'dist/parse.rollup.js',
  format: 'umd',
  moduleName: 'test',
  sourceMap: true,
  plugins: [
    globals(),
    nodeResolve({
      jsnext: true,
      main: true,
      preferBuiltins: false
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    babel(babelrc()),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}