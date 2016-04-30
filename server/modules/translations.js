'use strict';

var _ = require('lodash');

module.exports = Translations;

Translations.$inject = ['apiv1', 'config', 'logFunc', 'jsonfile', 'q', 'fsQ', 'path'];
function Translations(server, config, logFunc, jsonfile, q, fsQ, path) {

  /**
   * @apiVersion 0.0.2
   *
   * @api {get} /api/v1/addTranslation Translation (DEV)
   * @apiDescription This route handles missing translations.
   *
   *
   * It adds missing translations to all lang files in app/misc/i18n/ with a trailing "@".
   *
   *
   * It ist only active in dev environment!
   * @apiName Missing Translations
   * @apiGroup Routes
   *
   * @apiSuccess {200} Statuscode Returns success of adding the translation to all files.
   *
   * @apiUse InternalServerError
   */

  server.post('/addTranslation', function(req, res) {
    var translationId = req.body.translationId;
    
    var mainDir = path.dirname(require.main.filename);
    var pathToFiles = path.resolve(mainDir, config.translations.path);
    fsQ.list(pathToFiles).then(function(dir) {
      return updateTranslationFiles(dir);
    })
      .then(function() {
        logFunc('[x] missing translation added: ' + translationId);
        res.sendStatus(200)
      })
      .catch(function(err) {
        logFunc(err);
        res.sendStatus(500);
      });

    function updateTranslationFiles(dir) {
      var deferred = q.defer();
      try {
        dir.forEach(function(fileName) {
          var filePath = path.join(pathToFiles, fileName);
          var file = jsonfile.readFileSync(filePath);
          _.set(file, translationId, '@' + translationId);
          jsonfile.writeFileSync(filePath, file, {spaces: 2});
        });
        deferred.resolve();
        return deferred.promise;
      }
      catch(error) {
        deferred.reject(error);
        return deferred.promise;
      }
    }

  });
}
