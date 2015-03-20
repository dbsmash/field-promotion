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
var GamePanel = require('./GamePanel');

var GamesPanel = React.createClass({
  getInitialState: function () {
    var app = this;

    GameStore.setConsumer('load', function(gameData) {
      app.setState({games: gameData.games});
    });

    GameStore.setConsumer('delete', function(games) {
      app.setState({games: games});
    });
    return {games: []};
  },

  componentWillMount: function() {
    GameStore.load();
  },

  render: function() {
    var app = this;
    var gameNodes = this.state.games.map(function (game) {
      return (
        <GamePanel game={game}/>
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
        <th className="text-header">Details</th>
      </tr>
      {gameNodes}
      </tbody>
      </Table>
      </div>
    );
  }
});

module.exports = GamesPanel;