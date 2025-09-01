module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".json",
          ],
          alias: {
            "@": "./",
            "@app": "./app",
            "@components": "./components",
            "@styles": "./styles",
            "@utils": "./utils",
            "@mock": "./mock",
            "@hooks": "./hooks",
            "@types": "./types",
            "@fonts": "./public/assets/fonts",
            "@icons": "./public/assets/icons",
            "@images": "./public/assets/images",
          },
        },
      ],
    ],
  };
};
