'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

var designationMap = {
	1:'',
	2:' *',
	3:' **'
};

var RecordController = function($scope, GameService, FactionService) {
	GameService.getGames($scope);
	$scope.results = FactionService.getResults();
	$scope.playerFactions = FactionService.getFactions();
	$scope.opponentFactions = FactionService.getFactions();
	resetValues();
	
	function resetValues() {
		var newGame = {
			player_faction: $scope.playerFactions[0],
			size: '',
			opponent_name: '',
			result: $scope.results[0],
			opponent_faction: $scope.opponentFactions[0],
			date: '',
			key: 'NEW'
		};

		$scope.playerCasters = FactionService.getCastersForFaction(newGame.player_faction);
		newGame.player_warcaster = $scope.playerCasters[0];

		$scope.opponentCasters = FactionService.getCastersForFaction(newGame.opponent_faction);
		newGame.opponent_warcaster = $scope.opponentCasters[0];

		$scope.newGame = newGame;
	}

	function getResultBooleans(result) {
		for(var i = 0; i < $scope.results.length; i++) {
		    if ($scope.results[i].name === result) {
				return [$scope.results[i].won, $scope.results[i].draw, $scope.results[i].teaching];
			}
		}
	}

	$scope.isResultLoss = function(resultString) {
		for(var i = 0; i < $scope.results.length; i ++) {
			if ($scope.results[i].name === resultString) {
				return !$scope.results[i].won && !$scope.results[i].draw && !$scope.results[i].teaching;
			}
		}
	};

	$scope.isResultWin = function(resultString) {
		for(var i = 0; i < $scope.results.length; i ++) {
			if ($scope.results[i].name === resultString) {
				return $scope.results[i].won;
			}
		}
	};
	
	$scope.playerFactionChanged = function(faction) {
		$scope.playerCasters = FactionService.getCastersForFaction(faction);
		$scope.newGame.player_warcaster = $scope.playerCasters[0];
	};

	$scope.opponentFactionChanged = function(faction) {
		$scope.opponentCasters = FactionService.getCastersForFaction(faction);
		$scope.newGame.opponent_warcaster = $scope.opponentCasters[0];
	};

	$scope.submitGame = function() {
		var results = getResultBooleans($scope.newGame.result.name);
		var game = {
			date: $scope.newGame.date,
			player_faction: $scope.newGame.player_faction.name,
			player_warcaster: $scope.newGame.player_warcaster.name,
			opponent_name: $scope.newGame.opponent_name,
			opponent_faction: $scope.newGame.opponent_faction.name,
			opponent_warcaster: $scope.newGame.opponent_warcaster.name,
			size: Number($scope.newGame.size),
			result: $scope.newGame.result.name,
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

	$scope.getDesignationForLevel = function(level) {
		return designationMap[level];
	};
};

var SearchController = function($scope, FactionService, GameService) {
	$scope.results = FactionService.getResults();
	$scope.playerFactions = FactionService.getFactions();
	$scope.opponentFactions = FactionService.getFactions();
	$scope.search = {};
	$scope.performance = 'no search configured!';

	$scope.clear = function() {
		var search = {
			player_faction: '',
			size: '',
			opponent_name: '',
			result: '',
			opponent_faction: '',
			date: '',
			player_warcaster: '',
			opponent_warcaster: ''
		};
		$scope.playerCasters = [];
		$scope.opponentCasters = [];
		$scope.search = search;
		$scope.games = [];
		$scope.performance = 'no search configured!';
	};

	$scope.searchGames = function() {
		$scope.performance = 'searching...';
		GameService.searchGames($scope, $scope.search);
	};

	$scope.isResultLoss = function(resultString) {
		for(var i = 0; i < $scope.results.length; i ++) {
			if ($scope.results[i].name === resultString) {
				return !$scope.results[i].won && !$scope.results[i].draw && !$scope.results[i].teaching;
			}
		}
		return false;
	};

	$scope.isResultWin = function(resultString) {
		for(var i = 0; i < $scope.results.length; i ++) {
			if ($scope.results[i].name === resultString) {
				return $scope.results[i].won;
			}
		}
		return false;
	};

	$scope.updatePerformance = function(wins, non_teaching_games) {
		var win_per = Math.floor((wins / non_teaching_games) * 100);
		$scope.performance = win_per + '% with ' + wins + ' wins over ' + non_teaching_games + ' games.';
	};

	$scope.playerFactionChanged = function(faction) {
		$scope.playerCasters = FactionService.getCastersForFaction(faction);
	};

	$scope.opponentFactionChanged = function(faction) {
		$scope.opponentCasters = FactionService.getCastersForFaction(faction);
	};

	$scope.getDesignationForLevel = function(level) {
		return designationMap[level];
	};
};

controllers.controller('RecordController', RecordController);
controllers.controller('SearchController', SearchController);