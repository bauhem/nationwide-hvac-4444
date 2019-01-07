module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              "@babel/preset-env"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-object-assign",
              "@babel/plugin-proposal-object-rest-spread"
            ]
          }
        }
      }
    ]
  }
}


