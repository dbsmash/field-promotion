'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

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

var SearchController = function($scope, FactionService, GameService) {
	$scope.results = FactionService.getResults();
	$scope.playerFactions = FactionService.getFactions();
	$scope.opponentFactions = FactionService.getFactions();
	$scope.gameTypes = FactionService.getGameTypes();
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
			opponent_warcaster: '',
			location: '',
			game_type: ''
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

	$scope.getIconForFaction = function(faction) {
		return iconMap[faction];
	};
};

var AnalyzeController = function($scope, StatsService) {
	var loadFactionNumberChart = function(response) {
		var names = [];
		var wins = [];
		var key;

		for (key in response) {
			if (response.hasOwnProperty(key)) {
				names.push(key);
				wins.push(response[key].count);
			}
		}
		var data = {
			labels: names,
			datasets: [
				{
					label: "Factions!",
					fillColor: "rgba(151,187,205,0.5)",
					strokeColor: "rgba(151,187,205,0.8)",
					highlightFill: "rgba(151,187,205,0.75)",
					highlightStroke: "rgba(151,187,205,1)",
					data: wins
				}
			]
		};
		var ctx = document.getElementById("myChart").getContext("2d");
		var myBarChart = new Chart(ctx).Bar(data);
	};

	var loadFactionWinChart = function(response) {
		var data = [];
		var key;

		for (key in response) {
			if (response.hasOwnProperty(key)) {
				var win_per = parseFloat(response[key].wins / response[key].nt_count * 100).toFixed(2);
				data.push({
					label: key,
					value: win_per,
					color: StatsService.getColorForFaction(key),
					highlight: StatsService.getColorForFaction(key)
				});
			}
		}

		var options = {
			scaleOverride: true,
			scaleSteps: 10,
			scaleStepWidth: 10,
			scaleStartValue: 0,
		};
		
		var ctx = document.getElementById("myChart2").getContext("2d");
		var myBarChart = new Chart(ctx).PolarArea(data, options);
	};

	var loadCharts = function(response) {
		loadFactionNumberChart(response);
		loadFactionWinChart(response);
	}

	var data = StatsService.getStats($scope, loadCharts);
	
};

controllers.controller('RecordController', RecordController);
controllers.controller('SearchController', SearchController);
controllers.controller('AnalyzeController', AnalyzeController);