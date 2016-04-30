'use strict';

//@if !isProd
window.LiveReloadOptions = {host: 'localhost'};
require('livereload-js');
//@endif

// Angular
require('angular');
require('angular-ui-router');

require('./templatecache');
require('./translation');
require('./routes');
require('./core');

// create and bootstrap application

var requires = [
  'app.translation',
  'ui.router',
  'app.routes',
  'app.core'
];

module.exports = angular.module('app', requires);