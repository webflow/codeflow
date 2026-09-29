const path = require("path");
const WebpackDevServer = require("webpack-dev-server");

const TS1208 = "TS1208";

// react-scripts 5 shuts the server down with the WDS 4 `close()` API.
// WDS 5 renamed it to `stopCallback()`, so retain graceful shutdowns.
if (!WebpackDevServer.prototype.close) {
  WebpackDevServer.prototype.close = function close(callback) {
    this.stopCallback(callback);
  };
}

module.exports = {
  // Configuration for React app customization
  // Currently minimal setup - can be extended as needed
  style: {
    postcss: { mode: "file" },
  },
  devServer: (devServerConfig) => {
    // react-scripts 5 still emits webpack-dev-server 4 options. Translate the
    // removed hooks/options so we can use the patched webpack-dev-server 5.
    const {
      onBeforeSetupMiddleware,
      onAfterSetupMiddleware,
      https,
      ...compatibleConfig
    } = devServerConfig;

    compatibleConfig.server = https
      ? {
          type: "https",
          ...(typeof https === "object" ? { options: https } : {}),
        }
      : "http";
    compatibleConfig.setupMiddlewares = (middlewares, devServer) => {
      onBeforeSetupMiddleware?.(devServer);
      onAfterSetupMiddleware?.(devServer);
      return middlewares;
    };

    return compatibleConfig;
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      // Allow interviews with standalone TypeScript files.
      const typeChecker = webpackConfig.plugins.find(
        (plugin) => plugin.constructor.name === "ForkTsCheckerWebpackPlugin"
      );

      if (typeChecker) {
        typeChecker.options.issue.exclude = [
          ...(typeChecker.options.issue.exclude || []),
          { origin: "typescript", code: TS1208 },
        ];
      }

      webpackConfig.resolve.symlinks = false;
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        followSymlinks: true,
      };
      return webpackConfig;
    },
  },
};
