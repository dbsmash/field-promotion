'use strict';

/* Services */

var services = angular.module('myApp.services', []);

services.value('version', '0.1');

var GameService = function($http) {
	var getGames = function($scope) {
		$http.get('/game/').success(function(data) {
			$scope.games = data;
        });
	};
	return {
		getGames: getGames
    };
};

services.service('GameService', GameService);
