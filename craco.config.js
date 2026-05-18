const path = require("path");

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
      webpackConfig.resolve.symlinks = false;
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        followSymlinks: true,
      };
      return webpackConfig;
    },
  },
};
