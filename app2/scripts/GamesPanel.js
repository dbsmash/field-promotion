/** @jsx React.DOM */
var React = require('react');
var Button = require('react-bootstrap').Button;
var GameStore = require('./GameStore');
var StaticDataStore = require('./StaticDataStore');
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Input = require('react-bootstrap').Input;
var AlertService = require('./AlertService');

var GamesPanel = React.createClass({
  getInitialState: function () {
    var app = this;

    GameStore.setConsumer('load', function(gameData) {
      app.setState({games: gameData.games});
    });
    return {games: []};
  },

  componentWillMount: function() {
    GameStore.load();
  },

  render: function() {
    var app = this;
    var gameNodes = this.state.games.map(function (game) {
      var className = 'text-font';
      var result = StaticDataStore.getResultForName(game.result);
      if (result && result.won) {
        className += ' won';
      } else if (result && !result.won && !result.teaching && !result.draw) {
        className += ' lost';
      }

      return (
        <tr>
          <th className="text-font">{game.date}</th>
          <th className="text-font">{game.player_warcaster}</th>
          <th className="text-font">{game.opponent_name}</th>
          <th className={className}>{game.result}</th>
        </tr>
      );
    }.bind(this));

    return (
      <div>
      <Table className="table table-striped table-bordered">
      <tbody>
        <tr>
        <th className="text-header">Date</th>
        <th className="text-header">Caster</th>
        <th className="text-header">Opponent</th>
        <th className="text-header">Result</th>
      </tr>
      {gameNodes}
      </tbody>
      </Table>
      </div>
    );
  }
});

module.exports = GamesPanel;