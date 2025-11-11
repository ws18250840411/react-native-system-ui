const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

// Watch the entire workspace (not just button)
// config.watchFolders = [workspaceRoot];
config.watchFolders = [path.join(workspaceRoot, "packages/unstyled/button")];

// Ensure Metro follows symlinks correctly
config.resolver = {
  ...config.resolver,
  unstable_enableSymlinks: true, // Enables support for symlinked packages
  unstable_enablePackageExports: true, // Fixes issues with certain packages using exports
};

// config.transformer = {
//   ...config.transformer,
//   babelTransformerPath: require.resolve("react-native-css-transformer"),
// };

// Improve caching behavior
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      res.setHeader("Cache-Control", "no-store"); // Prevent caching issues
      return middleware(req, res, next);
    };
  },
};

module.exports = withNativeWind(config, { input: "./global.css" });
