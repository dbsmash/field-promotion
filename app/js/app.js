'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/record', {templateUrl: 'partials/record.html', controller: 'RecordController'});
  $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: 'SearchController'});
  $routeProvider.when('/analyze', {templateUrl: 'partials/analyze.html', controller: 'AnalyzeController'});
  $routeProvider.otherwise({redirectTo: '/record'});
}]);
