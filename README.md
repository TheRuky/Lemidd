# Installation
In the root folder (where `package.json` is), run
```
yarn
```
It will install all necessary dependencies.

After that, use one of the following:

| Command | Description |
| ------- | ----------- |
| `yarn start` | Starts a web server powered by BrowserSync and does an automatic reload on file changes. |
| `yarn build` | Builds assets. |
| `yarn build:production` | Builds assets and optimizes them for production. |


# Configuration
| | |
| --- | --- |
| ⚠️ | **All configuration changes should be done in `config/config.json` only!** |
| ⚠️ | **Webpack configuration should never be modified, unless absolutely necessary and inevitable!** |
| | |

## `config.json`
This is the main configuration file and all configuration changes should be done **in this file**!
```
📂 config
   📄 config.json
```

📃 **`config.json` (default)**
```
{
  "craft": true,
  "craftPath": "../",
  "context": "app/src/assets",
  "entry": {
    "main": [
      "./scripts/main.js",
      "./styles/main.scss"
    ]
  },
  "url": {
    "dev": "http://qraft.local",
    "proxy": "http://localhost:3000"
  },
  "output": {
    "path": "web/assets",
    "publicPath": "/assets/"
  },
  "watch": [
    "config/*.php",
    "templates/**/*"
  ],
  "staticServer": {
    "output": {
      "path": "app/dist/assets",
      "publicPath": "/dist/assets/"
    },
    "host": "localhost",
    "port": 3000,
    "baseDir": [
      "app"
    ],
    "watch": [
      "app/*"
    ]
  },
  "modules": {},
  "hmr": true,
  "lint": true
}
```
### Options
| | |
| ---- | ---- |
| ⚠️ | **All options should always be present in `config.json`! This means that you can not have configuration without `craft` or `lint` options even if you are not using them! For example, if you are not using Craft, set it to `false`, don't delete it!** |
| ⚠️ | **When an option _should be a relative path_, it means relative to bundler root (where `package.json` is), unless specified differently in the description.** |
| ⚠️ | **Craft only options are used only when Craft is enabled. However, they should still be in `config.json`, even if not used!** |
| ⚠️ | 📃 **- check the `config.json` snippet for the default value.** |
| | |

| Option | Description | Default | Craft only |
| ------ | ----------- | ------- | ---------- |
| `context` | Webpack [context](https://webpack.js.org/configuration/entry-context/). Should be a relative path. Usually, it's set to the folder where all assets are put. | `app/src/assets` | ⛔ |
| `craft` | If set to `true`, bundler will be setup to work with Craft and make use of Craft-only options. | `true` | No |
| `craftPath` | Relative path to Craft root directory. It should always be a relative path. By default, Craft root is set to bundler's parent folder (one level up). | `../` | ✅ |
| `entry` | Webpack [entry points](https://webpack.js.org/concepts/entry-points/). Should always be relative path(s). It's usually set to main files that Webpack starts to bundle from. | 📃 | ⛔ |
| `hmr` | If set to `true`, it will enable [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) for Craft development. HMR can have unexplained bugs (for example, infinite reloading and such). If that happens, it should be turned off. | `true` | ✅ |
| `modules` | Object that contains [modules that should be loaded automatically](https://webpack.js.org/plugins/provide-plugin/) by Webpack. For example, changing this option to `{ "$": "jquery", "jQuery": "jquery" }` would allow using jQuery globally, without need to import it every time. | `{}` | ⛔ |
| `lint` | If set to `true`, it will enable a [linter](https://en.wikipedia.org/wiki/Lint_(software)). | `true` | ⛔ |
| `output.path` | Webpack [output path](https://webpack.js.org/configuration/output/#output-path). Should be a relative path. By default, it is set to `assets` folder under Craft's public folder `web`. | `web/assets` | ✅ |
| `output.publicPath` | Webpack [output public path](https://webpack.js.org/configuration/output/#output-publicpath). Should be an absolute path (with `/` at the beginning). It's the path from where server will resolve bundled assets. By default, it will resolve them from `http://localhost:3000/assets`. Craft's `web` folder is root public folder and will correspond to proxied URL. Since `output.path` is set to bundle files to `web/assets`, `publicPath` is set to `assets` folder. | `/assets/` | ✅ |
| `staticServer.baseDir` | Array of relative paths to look for files to serve. It automatically looks for `index.html` in the provided path. | 📃 | ⛔ |
| `staticServer.host` | Host of the BrowserSync server for serving static files. | `localhost` | ⛔ |
| `staticServer.output` | Same as `output`, but to be used when Craft is turned off. | 📃 | ⛔ |
| `staticServer.port` | Port to be used by BrowserSync server for serving static files | `3000` | ⛔ |
| `staticServer.watch ` | Same as `watch`, but to be used when Craft is turned off. | 📃 | ⛔ |
| `url.dev` | URL that will be proxied by BrowserSync when using Craft. | `http://qraft.local` | ✅ |
| `url.proxy` | URL to which `url.dev` will be proxied by BrowserSync. | `http://localhost:3000` | ✅ |
| `watch` | An array of relative paths that should be watched by BrowserSync. If `craft` is set to `true`, it will resolve files from `craftPath`. | 📃 | ✅ |
