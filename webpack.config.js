const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "./main.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", "css-loader"
        ]
      },
      {
        test: /\.scss$/,
          use: [{
            loader: "style-loader"
          }, {
              loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                      includePaths: ["./app/styles/style.scss", "./public/css/style.css"]
                }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};