var RecordController = function($scope, GameService, FactionService) {
	var self = this;
	GameService.getGames($scope);
	$scope.results = FactionService.getResults();
	$scope.playerFactions = FactionService.getFactions();
	$scope.opponentFactions = FactionService.getFactions();
	$scope.gameTypes = FactionService.getGameTypes();
	resetValues();
	$("#record-date").datepicker({
		dateFormat:'yy-mm-dd',
		onSelect:function (date) {
			$scope.$apply(function () {
				$scope.newGame.date = date;
			});
		}
	});

	var designationMap = {
		1:'',
		2:' *',
		3:' **'
	};

	var iconMap = {
		"Khador":"img/khador.jpg",
		"Cygnar":"img/cygnar.jpg",
		"Protectorate of Menoth":"img/menoth.jpg",
		"Retribution of Scyrah":"img/ret.jpg",
		"Cryx":"img/cryx.jpg",
		"Mercenaries":"img/mercs.jpg",
		"Legion of Everblight":"img/legion.jpg",
		"Skorne":"img/skorne.jpg",
		"Circle Orboros":"img/circle.jpg",
		"Trollbloods":"img/trolls.jpg",
		"Convergence of Cyriss":"img/cyriss.jpg",
		"Minions":"img/minions.jpg",
	};

	function resetValues() {
		var newGame = {
			player_faction: $scope.playerFactions[0],
			size: '',
			opponent_name: '',
			result: $scope.results[0],
			opponent_faction: $scope.opponentFactions[0],
			date: '',
			key: 'NEW',
			game_type: '',
			location: ''
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
			game_type: $scope.newGame.game_type,
			location: $scope.newGame.location,
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

	$scope.getIconForFaction = function(faction) {
		return iconMap[faction];
	};
};

var controllers = angular.module('myApp.controllers');
controllers.controller('RecordController', RecordController);
