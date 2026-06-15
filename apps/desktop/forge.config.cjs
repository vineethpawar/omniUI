const path = require("node:path");

module.exports = {
  packagerConfig: {
    name: "omniUI",
    appBundleId: "dev.omniui.desktop",
    icon: path.join(__dirname, "assets", "icon"),
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    { name: "@electron-forge/maker-dmg", config: { format: "ULFO" } },
    { name: "@electron-forge/maker-squirrel", config: { name: "omniUI" } },
    { name: "@electron-forge/maker-deb", config: {} },
    { name: "@electron-forge/maker-zip", platforms: ["darwin", "linux"] },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        mainConfig: "./webpack.main.config.cjs",
        renderer: {
          config: "./webpack.renderer.config.cjs",
          entryPoints: [
            {
              html: "./src/renderer/index.html",
              js: "./src/renderer/index.tsx",
              name: "main_window",
              preload: { js: "./src/preload.ts" },
            },
          ],
        },
        devContentSecurityPolicy:
          "default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' http://localhost:* ws://localhost:* https://api.anthropic.com https://api.figma.com",
      },
    },
  ],
};
