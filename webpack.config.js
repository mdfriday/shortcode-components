const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      type: 'umd',
      name: 'mdfridayShortcode',
      umdNamedDefine: true,
    },
    globalObject: 'typeof self !== "undefined" ? self : this',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new (require('terser-webpack-plugin'))({
        terserOptions: {
          mangle: {
            keep_classnames: true,
            keep_fnames: true
          },
          compress: {
            typeofs: false,
            keep_classnames: true,
            keep_fnames: true
          }
        },
      }),
    ],
  },
  devtool: 'source-map',
}; 