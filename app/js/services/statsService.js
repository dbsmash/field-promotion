var StatsService = function($http) {
	var colormap = {
		"Khador":"#FE3116",
		"Cygnar":"#2B4FD0",
		"Protectorate of Menoth":"#EAECB1",
		"Retribution of Scyrah":"#C5F9FB",
		"Cryx":"#A8D734",
		"Mercenaries":"#8E5C2E",
		"Legion of Everblight":"#622491",
		"Skorne":"#E02211",
		"Circle Orboros":"#B1CE2A",
		"Trollbloods":"#589FC8",
		"Convergence of Cyriss":"#CAB9BC",
		"Minions":"#23501B"
	};


	var getStats = function($scope, callback) {
		$http.get('/stat/').success(function(data) {
			callback(data);
        });
	};

	var getColorForFaction = function(faction) {
		return colormap[faction];
	};

	return {
		getStats: getStats,
		getColorForFaction: getColorForFaction
    };
};

var services = angular.module('myApp.services');
services.service('StatsService', StatsService);
