const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
        "process": false,
      };
      
      webpackConfig.resolve.extensionAlias = {
        ...webpackConfig.resolve.extensionAlias,
        '.js': ['.js', '.ts', '.tsx', '.jsx'],
      };
      
      return webpackConfig;
    },
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          process: 'process',
          Buffer: ['buffer', 'Buffer'],
        }),
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(process.env),
          'process.browser': true,
        }),
      ],
    },
  },
  typescript: {
    enableTypeChecking: false
  },
  eslint: {
    enable: false,
  },
}; 