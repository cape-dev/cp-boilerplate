'use strict';

var component = require('./core.module');

class HomeController {
  constructor() {
    this.test = 12344444
  }
}

component.controller('HomeController', HomeController);


