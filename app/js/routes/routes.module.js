'use strict';

var _ = require('lodash');

require('angular-scroll'); //extends $document / angular-alement

var routes = require('./routes');


var requires = [
  'app.core',
  'duScroll'
];

module.exports = angular.module('app.routes', requires)
  .config(routes);

// controllers

// directives

// services

// routes
