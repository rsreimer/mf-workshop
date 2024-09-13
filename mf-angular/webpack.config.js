const { ModuleFederationPlugin } = require("webpack").container;
const { name } = require("./package.json");

module.exports = (config) => {
  Object.assign(config.output, {
    uniqueName: name,
    scriptType: "text/javascript",
    publicPath: "auto",
  });

  Object.assign(config.optimization, {
    runtimeChunk: false,
  });

  config.plugins?.push(
    new ModuleFederationPlugin({
      name,
      filename: "remoteEntry.js",
      exposes: {
        "./bootstrap": "./src/remote.ts",
      },
      shared: [
        "@angular/animations",
        "@angular/common",
        "@angular/compiler",
        "@angular/core",
        "@angular/elements",
        "@angular/forms",
        "@angular/platform-browser",
        "@angular/platform-browser-dynamic",
        "@angular/router",
        "rxjs",
        "tslib",
      ],
    }),
  );

  return config;
};
