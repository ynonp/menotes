(function(global) {

  global.myapp = angular.module('MyApp', ['ngRoute']);

  myapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/notebooks/:nid', {
        templateUrl: 'src/views/notebook.html'
      })
      .when('/', {
        templateUrl: 'src/views/notebook.html'
      });

  }]);
}(this));