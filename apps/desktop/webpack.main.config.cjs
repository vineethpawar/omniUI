module.exports = {
  entry: "./src/main/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: { loader: "ts-loader", options: { configFile: "tsconfig.main.json", transpileOnly: true } },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  // Bundling the agent SDK + zod into the main process; nothing else gets pulled in.
  externals: {
    electron: "commonjs2 electron",
  },
};
