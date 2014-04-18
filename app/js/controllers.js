'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

var RecordController = function($scope, GameService, FactionService) {
	GameService.getGames($scope);
	$scope.results = FactionService.getResults();
	resetValues();
	
	function resetValues() {
		$scope.result = $scope.results[0];

		$scope.playerFactions = FactionService.getFactions();
		$scope.player_faction = $scope.playerFactions[0];
		$scope.playerCasters = FactionService.getCastersForFaction($scope.player_faction);
		$scope.player_warcaster = $scope.playerCasters[0];
		$scope.opponent_name = '';
		$scope.size = '';
		$scope.opponentFactions = FactionService.getFactions();
		$scope.opponent_faction = $scope.opponentFactions[0];
		$scope.opponentCasters = FactionService.getCastersForFaction($scope.opponent_faction);
		$scope.opponent_warcaster = $scope.opponentCasters[0];
	}

	function getResultBooleans(result) {
		for(var i = 0; i < $scope.results.length; i++) {
		    if ($scope.results[i].name === result) {
				return [$scope.results[i].won, $scope.results[i].draw, $scope.results[i].teaching];
			}
		}
	}
	
	$scope.playerFactionChanged = function(faction) {
		$scope.playerCasters = FactionService.getCastersForFaction(faction);
		$scope.player_warcaster = $scope.playerCasters[0];
	};

	$scope.opponentFactionChanged = function(faction) {
		$scope.opponentCasters = FactionService.getCastersForFaction(faction);
		$scope.opponent_warcaster = $scope.opponentCasters[0];
	};

	$scope.submitGame = function() {
		var results = getResultBooleans($scope.result.name);
		var game = {
			date: $scope.date,
			player_faction: $scope.player_faction.name,
			player_warcaster: $scope.player_warcaster,
			opponent_name: $scope.opponent_name,
			opponent_faction: $scope.opponent_faction.name,
			opponent_warcaster: $scope.opponent_warcaster,
			size: Number($scope.size),
			result: $scope.result.name,
			won: Boolean(results[0]),
			draw: Boolean(results[1]),
			teaching: Boolean(results[2]),
		};
		GameService.submitGame(game);
		$scope.games.unshift(game);
		resetValues();
	};

	$scope.deleteGame = function(game) {
		GameService.deleteGame(game);
		var index = -1;
		for (var i = 0; i < $scope.games.length; i++) {
			if ($scope.games[i].key === game.key) {
				index = i;
			}
		}
		if (index > -1) {
			$scope.games.splice(index, 1);
		}

	};
};

var SearchController = function() {

};

controllers.controller('RecordController', RecordController);
controllers.controller('SearchController', SearchController);