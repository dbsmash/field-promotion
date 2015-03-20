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

var gameTypes = [
  '',
  'Casual',
  'Tournament',
  'Convention',
  'Teaching',
  'League'
];

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
  {"name":"Concession Victory",
  "won":true,
  "teaching":false,
  "draw":false},
  {"name":"Concession Defeat",
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
];

var factionData = {
"Khador":[
    {name:"Orsus Zoktavir, Butcher of Khardov", level: 1},
    {name:"Kommander Orsus Zoktavir", level: 2},
    {name:"Kommander Zoktavir, The Butcher Unleashed", level: 3},
    {name:"Kommander Sorscha Kratikoff", level: 1},
    {name:"Forward Kommander Sorscha Kratikoff", level: 2},
    {name:"Vladimir Tzepesci, The Dark Prince", level: 1},
    {name:"Vladimir Tzepesci, The Dark Champion", level: 2},
    {name:"Vladimir Tzepesci, Great Prince of Umbrey", level: 3},
    {name:"Kommandant Irusk", level: 1},
    {name:"Supreme Kommandant Irusk", level: 2},
    {name:"Koldun Kommander Aleksandra Zerkova", level: 1},
    {name:"Karchev the Terrible", level: 1},
    {name:"Zevanna Agha, Old Witch of Khador", level: 1},
    {name:"Kommander Strakhov", level: 1},
    {name:"Kommander Harkevich, The Iron Wolf", level: 1}
],
"Cygnar":[
    {name:"Constance Blaize, Knight of the Prophet", level: 1},
    {name:"Major Markus 'Siege' Brisbane", level: 1},
    {name:"Lieutenant Allister Caine", level: 1},
    {name:"Captain Allister Caine", level: 2},
    {name:"Captain E. Dominic Darius", level: 1},
    {name:"Captain Victoria Haley", level: 1},
    {name:"Major Victoria Haley", level: 2},
    {name:"Captain Jeremiah Kraye", level: 1},
    {name:"Commander Adept Sebastian Nemo", level: 1},
    {name:"General Adept Sebastian Nemo", level: 2},
    {name:"Artificer General Nemo", level: 3},
    {name:"Captain Kara Sloan", level: 1},
    {name:"Commander Coleman Stryker", level: 1},
    {name:"Lord Commander Stryker", level: 2},
    {name:"Lord General Stryker", level: 3},
    {name:"Commander Dalin Sturgis", level: 1}
],
"Protectorate of Menoth":[
    {name:"Grand Scrutator Severius", level: 1},
    {name:"Hierarch Severius", level: 2},
    {name:"Harbinger of Menoth", level: 1},
    {name:"High Allegiant Amon Ad'Raza", level: 1},
    {name:"High Executioner Servath Reznik", level: 1},
    {name:"Reznik, Wrath of Ages", level: 2},
    {name:"High Exemplar Kreoss", level: 1},
    {name:"Grand Exemplar Kreoss", level: 2},
    {name:"Intercessor Kreoss", level: 3},
    {name:"High Reclaimer", level: 1},
    {name:"Testament of Menoth", level: 2},
    {name:"Feora Priestess of the Flame", level: 1},
    {name:"Feora, Protector of the Flame", level: 2},
    {name:"Thyra, Flame of Sorrow", level: 1},
    {name:"Vice Scrutator Vindictus", level: 1}
],
"Retribution of Scyrah": [
    {name:"Garryth, Blade of Retribution", level: 1},
    {name:"Kaelyssa, Night's Whisper", level: 1},
    {name:"Lord Arcanist Ossyan", level: 1},
    {name:"Adeptis Rahn", level: 1},
    {name:"Ravyn, Eternal Light", level: 1},
    {name:"Dawnlord Vyros", level: 1},
    {name:"Issyria, Sibyl of Dawn", level: 1},
    {name:"Vyros, Incissar of the Dawnguard", level: 2}
],
"Cryx":[
    {name:"Iron Lich Asphyxious", level: 1},
    {name:"Lich Lord Asphyxious", level: 2},
    {name:"Asphyxious the Hellbringer", level: 3},
    {name:"War Witch Deneghra", level: 1},
    {name:"Wraith Witch Deneghra", level: 2},
    {name:"Goreshade the Bastard", level: 1},
    {name:"Goreshade the Cursed", level: 2},
    {name:"Goreshade, Lord of Ruin", level: 3},
    {name:"Master Necrotech Mortenebra" , level: 1},
    {name:"Lord Exhumator Scaverous", level: 1},
    {name:"Skarre, the Pirate Queen", level: 1},
    {name:"Skarre, Queen of the Broken Coast", level: 2},
    {name:"Lich Lord Terminus", level: 1},
    {name:"Lich Lord Venethrax", level: 1},
    {name:"The Witch Coven of Garlghast", level: 1},
    {name:"Sturgis the Corrupted", level: 1}
],
"Mercenaries": [
    {name:"Captain Bartolo Montador", level: 1},
    {name:"Captain Damiano", level: 1},
    {name:"Drake MacBain", level: 1},
    {name:"Durgen Madhammer", level: 1},
    {name:"Gorten Grundback", level: 1},
    {name:"Fiona the Black", level: 1},
    {name:"Magnus the Traitor", level: 1},
    {name:"Magnus the Warlord", level: 2},
    {name:"General Ossrum", level: 1},
    {name:"Captain Phinneus Shae", level: 1},
    {name:"Ashlynn D'Elyse", level: 1},
    {name:"Exulon Thexus", level: 1},
    {name:"Constance Blaize, Knight of the Prophet", level: 1}
],
"Legion of Everblight": [
    {name:"Absylonia, Terror of Everblight", level: 1},
    {name:"Absylonia, Daughter of Everblight", level: 2},
    {name:"Bethayne, Voice of Everblight & Belphagor", level: 1},
    {name:"Kallus, Wrath of Everblight", level: 1},
    {name:"Lylyth, Herald of Everblight", level: 1},
    {name:"Lylyth, Shadow of Everblight", level: 2},
    {name:"Lylyth, Reckoning of Everblight", level: 3},
    {name:"Rhyas, Sigil of Everblight", level: 1},
    {name:"Saeryn, Omen of Everblight", level: 1},
    {name:"Thagrosh, Prophet of Everblight", level: 1},
    {name:"Thagrosh, Messiah of Everblight", level: 2},
    {name:"Vayl, Disciple of Everblight", level: 1},
    {name:"Vayl, Consul of Everblight", level: 2}
],
"Skorne": [
    {name:"Lord Tyrant Hexeris", level: 1},
    {name:"Lord Arbiter Hexeris", level: 2},
    {name:"Archdomina Makeda", level: 1},
    {name:"Supreme Archdomina Makeda", level: 2},
    {name:"Epic Unit: Makeda & The Exalted Court", level: 3},
    {name:"Void Seer Mordikaar", level: 1},
    {name:"Master Tormentor Morghoul", level: 1},
    {name:"Lord Assassin Morghoul", level: 2},
    {name:"Master Ascetic Naaresh", level: 1},
    {name:"Dominar Rasheth", level: 1},
    {name:"Tyrant Xerxis", level: 1},
    {name:"Xerxis, Fury of Halaak", level: 2},
    {name:"Supreme Aptimus Zaal & Kovaas", level: 1}
],
"Circle Orboros": [
    {name:"Baldur the Stonecleaver", level: 1},
    {name:"Baldur the Stonesoul", level: 2},
    {name:"Bradigus Throle the Runecarver", level: 1},
    {name:"Cassius the Oathkeeper", level: 1},
    {name:"Grayle the Farstrider", level: 1},
    {name:"Kaya the Wildborne", level: 1},
    {name:"Kaya the Moonhunter", level: 2},
    {name:"Kromac the Ravenous", level: 1},
    {name:"Krueger the Stormwrath", level: 1},
    {name:"Krueger the Stormlord", level: 2},
    {name:"Mohsar the Desertwalker", level: 1},
    {name:"Morvahna the Autumnblade", level: 1},
    {name:"Morvahna the Dawnshadow", level: 2}
],
"Trollbloods":[
    {name:"Borka Kegslayer", level: 1},
    {name:"Borka, Vengeance of the Rimeshaws", level: 2},
    {name:"Calandra Truthsayer, Oracle of the Glimmerwood", level: 1},
    {name:"Grim Angus", level: 1},
    {name:"Hunters Grim", level: 1},
    {name:"Grissel Bloodsong", level: 1},
    {name:"Grissel Bloodsong, Marshal of the Kriels", level: 2},
    {name:"Captain Gunnbjorn", level: 1},
    {name:"Hoarluk Doomshaper, Shaman of the Gnarls", level: 1},
    {name:"Hoarluk Doomshaper, Rage of Dhunia", level: 2},
    {name:"Jarl Skuld, Devil of the Thornwood", level: 1},
    {name:"Chief Madrak Ironhide", level: 1},
    {name:"Madrak Ironhide, World Ender", level: 2}
],
"Convergence of Cyriss":[
    {name:"Aurora, Numen of Aerogenisis", level: 1},
    {name:"Axis, The Harmonic Enforcer", level: 1},
    {name:"Iron Mother Directrix & Exponent Servitors", level: 1},
    {name:"Father Lucant, Divinity Architect", level: 1},
    {name:"Forge Master Syntherion", level: 1}
],
"Minions":[
    {name:"Bloody Barnabas", level: 1},
    {name:"Calaban the Gravewalker", level: 1},
    {name:"Dr. Arkadius", level: 1},
    {name:"Helga the Conqueror", level: 1},
    {name:"Jaga-Jaga, the Death Charmer", level: 1},
    {name:"Lord Carver, BMMD, Esq. III", level: 1},
    {name:"Maelok the Dreadbound", level: 1},
    {name:"Midas", level: 1},
    {name:"Rask", level: 1},
    {name:"Sturm & Drang", level: 1}
]
};

var StaticDataService = {

  getFactions: function () {
    return factions;
  },

  getGameTypes: function() {
    return gameTypes;
  },

  getResults: function() {
    return results;
  },

  getResultForName: function(resultName) {
    for (var i=0; i< results.length; i++) {
      if (results[i].name === resultName) {
        return results[i];
      }
    }
  },

  getCastersForFaction: function(faction) {
    var casters = factionData[faction];
    if (!casters) {
      return [];
    }
    return casters;
  }
};



module.exports = StaticDataService;