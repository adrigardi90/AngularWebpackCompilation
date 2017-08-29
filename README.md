

<p align="center">
  <img src="https://github.com/adrigardi90/AngularWebpackCompilation/blob/master/src/images/WebpackAngular.png" alt="Webpack3_configuration" width="215" height="290"/>
</p>

# AngularWebpackCompilation
> [Webpack 3](https://webpack.js.org/configuration/) configuration to compile and test [Angular 4](https://angular.io/) application with lazy loading modules 

## Quick start

```bash
# Clone the repo
git clone https://github.com/adrigardi90/AngularWebpackCompilation.git

# Change into the repo directory
cd AngularWebpackCompilation

# install
npm install

```

## Development Mode
In Development mode we use JiT compilation. Css are included in the head tag. The ouput is in the /compiled folder

```bash
# build dev mode
npm run build-dev
```

## Production Mode
In Production mode we use AoT compilation with Tree Shaking. Css are included in one separated file. The ouput is in the /compiled folder

```bash
# build production mode
npm run build-production
```

## Serve
We can serve the compile application from /compiled with http-server

```bash
# serve compiled app
npm run serve
```

## Run testing & coverage
We use Karma & Jasmine to testing. The coverage reporter is in the /coverage folder

```bash
# run test
npm run test
```

## Start
We can serve src folder and develop with hot reloading using webpack-dev-server

```bash
# start application
npm run start
```
