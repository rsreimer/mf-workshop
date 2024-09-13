const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { name } = require("./package.json");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: { publicPath: "auto" },
  devServer: {
    static: { directory: path.join(__dirname, "dist") },
    port: 3002,
  },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name,
      filename: "remoteEntry.js",
      exposes: {
        "./bootstrap": "./src/remote.ts",
      },
      shared: {},
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
