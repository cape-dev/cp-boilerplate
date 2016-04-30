'use strict';

//@ngInject
module.exports = function routes($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);


  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: '/home',
      template: require('../core/home.html'),
      controller: 'HomeController',
      controllerAs: 'vm',
      bindToController: true
    })
};
