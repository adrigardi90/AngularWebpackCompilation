const path = require('path');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns
    basePath: '',

    // frameworks 
    frameworks: ['jasmine'],

    plugins: [
      require('karma-remap-istanbul'),
      require('karma-sourcemap-loader'),
      require('karma-remap-coverage'),
      require('karma-webpack'),
      require('karma-coverage'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter')
    ],

    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    // list of files / patterns to load in the browser
    files: [
      {pattern: './config/karma-test-shim.js', watched: false}
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // Only apply preprocessor to test files ts
    preprocessors: {
      './config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    // webpack test configuration
    webpack : require('./config/webpack.test.js'),

    // converage reporter configuration
    coverageReporter: {

      dir: path.join(__dirname, './coverage/'),
      reporters:[
        {type: 'html'},
        {type: 'text-summary'},
        {type: 'text'},
        {type: 'json', file: 'coverage.json'}
      ],

      // % coverage warning between Green & Red
      watermarks: {
        statements: [ 90, 95 ],
        functions: [ 90, 95 ],
        branches: [ 90, 95 ],
        lines: [ 90, 95 ]
      },

      check: {
        global: { // thresholds for all files
          statements: 90
        },
        each: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
          overrides: { // We can override some files
            'src/app/modules/home/home.*.ts': {
              lines: 50,
              statements: 50,
              functions: 50,
              branches: 50,
            }
          }
        }
      },
    },

    angularCli: {
      environment: 'dev'
    },

    // reporters list
    reporters: ['progress', 'kjhtml', 'coverage'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    // auto reload test
    autoWatch: true,

    // Browser
    browsers: ['Chrome'],

    singleRun: false

  });

};
