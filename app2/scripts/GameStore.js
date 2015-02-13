var GameStore = {
  games: [],
  callbacks: {
    'add': [],
    'edit': [],
    'delete': [],
    'search' : [],
    'load': []
  },

  addConsumer: function (type, callback) {
    var relevantCallbacks = this.callbacks[type];
    relevantCallbacks.push(callback);
  },

  setConsumer: function (type, callback) {
    this.callbacks[type] = [callback];
  },

  notifyConsumers: function (type, data) {
    var relevantCallbacks = this.callbacks[type];
    for (var i = 0; i < relevantCallbacks.length; i++) {
      relevantCallbacks[i](data);
    }
  },

  add: function (game) {
    $.ajax({url: '/game_go/',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(game),
      success: function (data) {
        this.games.unshift(data);
        this.notifyConsumers('add', data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Error adding game to server!');
      }.bind(this)
    });
  },

  load: function () {
    $.ajax({url: '/game_go/',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        var games = data.games;
        for (var i = 0; i < games.length; i++) {
          var date = games[i].date;
          games[i].date = date.substring(0, 10);
        }
        this.games = games;
        this.notifyConsumers('load', data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Error loading games from server!');
      }.bind(this)
    });
  },

  getGames: function () {
    return this.games;
  }
};

module.exports = GameStore;