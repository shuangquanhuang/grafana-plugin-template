# Grafana Plugin Template
> Minimal starter with hot module replacement (HMR) for grafana plugin development.

* **[React](https://facebook.github.io/react/)** (17.x)
* **[Webpack](https://webpack.js.org/)** (5.x)
* **[Typescript](https://www.typescriptlang.org/)** (4.x)
* **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** ([React Hot Loader](https://github.com/gaearon/react-hot-loader))
* Production build script (Webpack)
* Image loading/minification ([Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader))
* [SASS](http://sass-lang.com/) support
* Code linting ([ESLint](https://github.com/eslint/eslint)) and formatting ([Prettier](https://github.com/prettier/prettier))
* Test framework ([Jest](https://facebook.github.io/jest/))


## Installation
1. Clone/download repo
2. `yarn install` (or `npm install` for npm)

## Usage
**Development**

`npm|yarn run start`

* Build app continuously (HMR enabled)
* App served @ `http://localhost:8080`

**Production**

`npm|yarn run build`

* Build app once (HMR disabled) to `/dist/`

## See also
* [Grafana plugin development FQA](https://fossies.org/linux/grafana/packages/grafana-toolkit/README.md)
* [Build a panel plugin](https://grafana.com/tutorials/build-a-panel-plugin/)