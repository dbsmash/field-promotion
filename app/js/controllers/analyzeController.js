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

var controllers = angular.module('myApp.controllers');
controllers.controller('AnalyzeController', AnalyzeController);
