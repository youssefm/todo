const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
};
