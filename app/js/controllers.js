'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

var RecordController = function($scope, GameService) {
	GameService.getGames($scope);
};

controllers.controller('RecordController', RecordController);

var SearchController = function() {

};

controllers.controller('SearchController', SearchController);