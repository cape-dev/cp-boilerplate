'use strict';

module.exports = Angular;

Angular.$inject = ['server', 'config'];
function Angular(server, config) {

  /**
   * @apiVersion 0.0.2
   *
   * @api {get} /* Angular
   * @apiDescription This route is loaded at last, so it can catch all other routes
   * which are not explicitly defined by express server to pass the query back to angular.
   * @apiName Angular routing
   * @apiGroup Routes
   *
   * @apiSuccess {html} indexFile Returns the index.html in order to pass the query back to Angular.
   */

  // Serve index.html for all routes to leave routing up to Angular
  server.get('/*', function(req, res) {
    res.sendFile('index.html', {root: config.dist.root});
  });

}
