const path = require("path");

const TS1208 = "TS1208";

module.exports = {
  // Configuration for React app customization
  // Currently minimal setup - can be extended as needed
  style: {
    postcss: { mode: "file" },
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
