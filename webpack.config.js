const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  // モードを開発モードにする
  mode: "development",
  // 入力ファイル設定
  entry: [path.resolve(__dirname, "./src/scripts/index.ts")],
  // 出力ファイル設定
  output: {
    // 出力されるファイル名
    filename: "index.js",
    // 出力先ディレクトリ
    path: path.resolve(__dirname, "dist"),
  },

  // モジュール設定
  module: {
    rules: [
      {
        // ts-loaderの設定
        test: /\.(js|ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.ts(x?)$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  // モジュール解決
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },

  // 開発モード設定
  devtool: "source-map",
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    liveReload: true,
    watchFiles: ["./src/**/*"],
    static: {
      directory: path.join(__dirname, "dist"),
      watch: true,
    },
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
};
