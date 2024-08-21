class TypedScssModulesPlugin {
  apply(compiler) {
    compiler.hooks.afterPlugins.tap('TypedScssModulesPlugin', () => {
      require('child_process').spawn(
        'npx', ['typed-scss-modules', 'src'], { stdio: 'inherit' }
      )
    })
  }
}

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }, {
      test: /\.s?css$/,
      use: [
        { loader: 'css-loader', options: { modules: 'icss' } },
        { loader: 'sass-loader', options: { implementation: require('sass') } },
      ],
    }],
  },
  plugins: [new TypedScssModulesPlugin()],
  resolve: {
    extensions: ['.ts', '.js'],
  }
}
