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

	var submitGame = function(gameParams) {
		$http({
			method: 'POST',
			url: '/game/',
			data: $.param(gameParams),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	};

	var deleteGame = function(game) {
		$http({
			method: 'DELETE',
			url: '/game/' + game.key
		});
	};

	return {
		getGames: getGames,
		submitGame: submitGame,
		deleteGame: deleteGame
    };
};

var FactionService = function($http) {
	var getFactions = function() {
		return factions;
	};

	var getCastersForFaction = function(faction) {
		return factionData[faction.name];
	};

	var getResults = function() {
		return results;
	};

	return {
		getFactions: getFactions,
		getCastersForFaction: getCastersForFaction,
		getResults: getResults
    };
};

services.service('GameService', GameService);
services.service('FactionService', FactionService);

var factions = [
	{name: "Khador", symbol: "KH"},
	{name: "Cygnar", symbol: "CYG"},
	{name: "Protectorate of Menoth", symbol: "POM"},
	{name: "Retribution of Scyrah", symbol: "RET"},
	{name: "Cryx", symbol: "CRYX"},
	{name: "Mercenaries", symbol: "KH"},
	{name: "Legion of Everblight", symbol: "MERC"},
	{name: "Skorne", symbol: "SK"},
	{name: "Circle Orboros", symbol: "CIRC"},
	{name: "Trollbloods", symbol: "TROLL"},
	{name: "Convergence of Cyriss", symbol: "COC"},
	{name: "Minions", symbol: "MIN"},
];

var factionData = {
	"Khador":["Orsus Zoktavir, Butcher of Khardov",
			"Kommander Orsus Zoktavir",
			"Kommander Zoktavir, The Butcher Unleashed",
			"Kommander Sorscha Kratikoff",
			"Forward Kommander Sorscha Kratikoff",
			"Vladimir Tzepesci, The Dark Prince",
			"Vladimir Tzepesci, The Dark Champion",
			"Vladimir Tzepesci, Great Prince of Umbrey",
			"Kommandant Irusk",
			"Supreme Kommandant Irusk",
			"Koldun Kommander Aleksandra Zerkova",
			"Karchev the Terrible",
			"Zevanna Agha, Old Witch of Khador",
			"Kommander Strakhov",
			"Kommander Harkevich, The Iron Wolf"],
	"Cygnar":["Constance Blaize, Knight of the Prophet",
			"Major Markus 'Siege' Brisbane",
			"Lieutenant Allister",
			"Captain Allister Caine",
			"Captain E. Dominic Darius",
			"Captain Victoria Haley",
			"Major Victoria Haley",
			"Captain Jeremiah Kraye",
			"Commander Adept Sebastian Nemo",
			"General Adept Sebastian Nemo",
			"Artificer General Nemo",
			"Captain Kara Sloan",
			"Commander Coleman Stryker",
			"Lord Commander Stryker"],
	"Protectorate of Menoth":["Grand Scrutator Severius",
			"Hierarch Severius",
			"Harbinger of Menoth",
			"High Allegiant Amon Ad'Raza",
			"High Executioner Servath Reznik",
			"High Exemplar Kreoss",
			"Grand Exemplar Kreoss",
			"Intercessor Kreoss",
			"High Reclaimer",
			"Testament of Menoth",
			"Feora Priestess of the Flame",
			"Feora, Protector of the Flame",
			"Thyra, Flame of Sorrow",
			"Vice Scrutator Vindictus"],
	"Retribution of Scyrah": ["Garryth, Blade of Retribution",
			"Kaelyssa, Night's Whisper",
			"Lord Arcanist Ossyan",
			"Adeptis Rahn",
			"Ravyn, Eternal Light",
			"Dawnlord Vyros",
			"Issyria, Sibyl of Dawn",
			"Vyros, Incissar of the Dawnguard"],
	"Cryx":["Iron Lich Asphyxious",
			"Lich Lord Asphyxious",
			"Asphyxious the Hellbringer",
			"War Witch Deneghra",
			"Wraith Witch Deneghra",
			"Goreshade the Bastard",
			"Goreshade the Cursed",
			"Master Necrotech Mortenebra" ,
			"Lord Exhumator Scaverous",
			"Skarre, the Pirate Queen",
			"Skarre, Queen of the Broken Coast",
			"Lich Lord Terminus",
			"Lich Lord Venethrax",
			"The Witch Coven of Garlghast"],
	"Mercenaries": ["Captain Bartolo Montador",
			"Captain Damiano",
			"Drake MacBain",
			"Durgen Madhammer",
			"Gorten Grundback",
			"Fiona the Black",
			"Magnus the Traitor",
			"Magnus the Warlord",
			"General Ossrum",
			"Captain Phinneus Shae",
			"Ashlynn D'Elyse",
			"Constance Blaize, Knight of the Prophet"],
	"Legion of Everblight": ["Absylonia, Terror of Everblight",
			"Bethayne, Voice of Everblight & Belphagor",
			"Kallus, Wrath of Everblight",
			"Lylyth, Herald of Everblight",
			"Lylyth, Shadow of Everblight",
			"Lylyth, Reckoning of Everblight",
			"Rhyas, Sigil of Everblight",
			"Saeryn, Omen of Everblight",
			"Thagrosh, Prophet of Everblight",
			"Thagrosh, Messiah of Everblight",
			"Vayl, Disciple of Everblight",
			"Vayl, Consul of Everblight"],
	"Skorne": ["Lord Tyrant Hexeris",
			"Lord Arbiter Hexeris",
			"Archdomina Makeda",
			"Supreme Archdomina Makeda",
			"Epic Unit: Makeda & The Exalted Court",
			"Void Seer Mordikaar",
			"Master Tormentor Morghoul",
			"Lord Assassin Morghoul",
			"Master Ascetic Naaresh",
			"Dominar Rasheth",
			"Tyrant Xerxis",
			"Supreme Aptimus Zaal & Kovaas"],
	"Circle Orboros": ["Baldur the Stonecleaver",
			"Baldur the Stonesoul",
			"Cassius the Oathkeeper",
			"Grayle the Farstrider",
			"Kaya the Wildborne",
			"Kaya the Moonhunter",
			"Kromac the Ravenous",
			"Krueger the Stormwrath",
			"Krueger the Stormlord",
			"Mohsar the Desertwalker",
			"Morvahna the Autumnblade",
			"Morvahna the Dawnshadow"],
	"Trollbloods":["Borka Kegslayer",
			"Calandra Truthsayer, Oracle of the Glimmerwood",
			"Grim Angus",
			"Hunters Grim",
			"Grissel Bloodsong",
			"Grissel Bloodsong, Marshal of the Kriels",
			"Captain Gunnbjorn",
			"Hoarluk Doomshaper, Shaman of the Gnarls",
			"Hoarluk Doomshaper, Rage of Dhunia",
			"Jarl Skuld, Devil of the Thornwood",
			"Chief Madrak Ironhide",
			"Madrak Ironhide, World Ender"],
	"Convergence of Cyriss":["Aurora, Numen of Aerogenisis",
			"Axis, The Harmonic Enforcer",
			"Iron Mother Directrix & Exponent Servitors",
			"Father Lucant, Divinity Architect",
			"Forge Master Syntherion"],
	"Minions":["Bloody Barnabas",
			"Calaban the Gravewalker",
			"Dr. Arkadius",
			"Lord Carver, BMMD, Esq. III",
			"Maelok the Dreadbound",
			"Midas",
			"Rask",
			"Sturm & Drang"]
};

var results = [{"name":"Assassination Victory",
  "won":true,
  "teaching":false,
  "draw":false},
  {"name":"Assassination Defeat",
  "won":false,
  "teaching":false,
  "draw":false},
  {"name":"Scenario Victory",
  "won":true,
  "teaching":false,
  "draw":false},
  {"name":"Scenario Defeat",
  "won":false,
  "teaching":false,
  "draw":false},
  {"name":"Clock Victory",
  "won":true,
  "teaching":false,
  "draw":false},
  {"name":"Clock Defeat",
  "won":false,
  "teaching":false,
  "draw":false},
  {"name":"Draw",
  "won":false,
  "teaching":false,
  "draw":true},
  {"name":"Teaching Game",
  "won":false,
  "teaching":true,
  "draw":false}
]
