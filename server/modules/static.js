'use strict';

var path = require('path');
var express = require('express');

module.exports = Static;

Static.$inject = ['server', 'config'];
function Static(server, config) {

  /**
   * @apiVersion 0.0.2
   *
   * @api {get} /dist Static Files
   * @apiDescription This route handles the static dir /dist.
   * @apiName Static Files
   * @apiGroup Routes
   *
   * @apiSuccess {any} any Returns any requested file in the /dist subdir.
   */

  var distDir = path.join(config.dist.root, 'dist');
  server.use('/dist', express.static(distDir));
}
