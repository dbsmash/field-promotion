var AnalyzeController = function($scope, StatsService) {
	var loadHistoryChart = function(response) {
		var datasets = [];
		for (key in response) {
			if (response.hasOwnProperty(key)) {
				datasets.push({
					label: key,
					strokeColor: StatsService.getColorForFaction(key),
					pointColor: StatsService.getColorForFaction(key),
					data: response[key].history
				});
			}
		}

		var data = {
			labels: ["Last Month", "2 months ago", "3 months ago", "4 months ago", "5 months ago", "6 months ago", "7 months ago", "8 months ago", "9 months ago", "10 months ago", "11 months ago", "12 months ago"],
			datasets: datasets
		};
		var ctx = document.getElementById("myChart3").getContext("2d");
		var options = {
			legendTemplate : "<ul><% for (var i=0; i<datasets.length; i++){%><li><span style=\"color:<%=datasets[i].pointColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",
			datasetFill: false,
			bezierCurve: true
		};
		var myBarChart = new Chart(ctx).Line(data, options);
		var leg = myBarChart.generateLegend();
		$("#legend").html(leg);
	};

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
		loadHistoryChart(response);
	}

	var data = StatsService.getStats($scope, loadCharts);
	
};

var controllers = angular.module('myApp.controllers');
controllers.controller('AnalyzeController', AnalyzeController);
