'use strict';
var serverconf = require('../server/config.json');

module.exports = {

  'styles': {
    'src' : ['app/styles/main.less'],
    'watch': ['app/styles/**/*.less'],
    'dest': 'build/dist'
  },

  'bootstrap': {
    'src': 'node_modules/bootstrap/fonts/*',
    'dest': 'build/dist/fonts'
  },

  'flagIcon': {
    'src': 'node_modules/flag-icon-css/flags/**/*',
    'dest': 'build/dist/flags'
  },

  'nodeFonts': {
    'src': 'server/misc/fonts/**/*',
    'dest': 'build/server/misc/fonts'
  },

  'fonts': {
    'src': 'app/assets/fonts/**/*',
    'dest': 'build/dist/fonts'
  },

  'nodeScripts': {
    'src' : [
      '!server/**/*.spec.js',
      '!server/server.js',
      '!server/start.js',
      'server/**/*.js',
      'server/**/*.json'
    ],
    'dest': 'build/server'
  },

  'scripts': {
    'preprocess': {
      'watch': [
        'app/js/main.preprocess.js'
      ]
    },
    'src': [
      'app/js/**/*.js',
      '!app/js/**/*.spec.js',
      '!app/js/**/*.e2e.js'
    ],
    'dest': 'build/dist'
  },

  //written to support ngNewRouter, may be used in future
  'components': {
    'src': 'app/js/routing/components/**/*.html',
    'dest': 'build/components'
  },

  'images': {
    'watch': [
      'app/assets/images/**/*'
    ],
    'src' : 'app/assets/images/**/*',
    'dest': 'build/dist/images'
  },

  'misc': {
    'src' : 'app/misc/**/*',
    'dest': 'build/dist/'
  },

  'views': {
    'cache': {
      'watch': [
        'app/js/**/*.cache.html'
      ]
    },
    'watch': [
      'app/index.html'
    ],
    'src': 'app/js/**/*.html',
    'dest': 'app/js'
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['app/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap': true
  },

  'preprocess': {
    // include LiveReload in app/js/main.js if development environment is running
    'src': ['app/js/main.preprocess.js'],
    'dest': 'app/js',
    'rename': 'main'
  },

  'test': {
    'karma': {
      'file': 'karma.conf.js',
      'host': 'localhost',
      'port': 9876
    }
  },

  'nodeunit': {
    'files': [
      '!server/**/*.spec.js',
      'server/*.js',
      'server/modules/**/*',
      'server/extensions/**/*'
    ],
    'testfiles': 'server/**/*spec.js',
    'log': 'logs/nodeunit.test.xml',
    'coverage': 'logs/node_coverage'
  },

  'lint': {
    'src' : [
      'app/js/**/*.js',
      '!app/js/templatecache.js',
      'server/modules/*',
      'server/extensions/**/*',
      'server/*.js',
      'gulp/**/*.js'
    ],
    'logFile': 'logs/eshint_result.xml'
  },

  'logs': {
    'src': 'logs/**/*',
    'keep': '!logs/.gitkeep'
  },

  'devServer': {
    // if following files change node is being restarted
    'watchDirectory': 'server/',
    'watchIgnorePatterns': ['*.spec.js'],
    'server': 'server/start.js'
  },

  'templateCache': {
    // cache following files for angular strap
    'src': 'app/js/**/*.cache.html',
    'dest': 'app/js'
  },

  'translations': {
    'watch': [
      'app/misc/i18n/*'
    ],
    'src': 'app/misc/i18n/*',
    'dest': 'build/dist/i18n/'
  }

};

// Add serverconfig to global config
module.exports.server = serverconf.server;
