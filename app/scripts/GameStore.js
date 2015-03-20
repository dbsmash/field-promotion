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

  updateLastSavedGameStorage: function(game) {
    if (typeof(Storage) != 'undefined') {
      localStorage.setItem('player_faction', game.player_faction);
      localStorage.setItem('player_warcaster', game.player_warcaster);
      localStorage.setItem('size', game.size);
      localStorage.setItem('location', game.location);
      localStorage.setItem('game_type', game.game_type);
    }
  },

  getLastSavedGameStorage: function() {
    if (typeof(Storage) != 'undefined') {
      if (!localStorage.player_faction) {
        return;
      }
      var data = {};
      data.player_faction = localStorage.player_faction;
      data.size = localStorage.size;
      data.location = localStorage.location;
      data.game_type = localStorage.game_type;
      data.player_warcaster = localStorage.player_warcaster;
      return data;
    }
  },

  add: function (game) {
    $.ajax({url: '/game_go/',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(game),
      success: function (data) {
        this.updateLastSavedGameStorage(game);
        this.games.unshift(data);
        this.notifyConsumers('add', data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Error adding game to server!');
      }.bind(this)
    });
  },

  delete: function (key) {
    $.ajax({url: '/game_go/' + key,
      type: 'DELETE',
      success: function (data) {
        this._deleteLocal(key);
        this.notifyConsumers('delete', this.games);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Error deleting game from server!');
      }.bind(this)
    });
  },

  _deleteLocal: function(key) {
    var index = -1;
      for (var i = 0; i < this.games.length; i++) {
        if (this.games[i].key === key) {
          index = i;
        }
      }
      if (index > -1) {
        this.games.splice(index, 1);
      }
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