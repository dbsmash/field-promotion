/** @jsx React.DOM */
var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
var GameStore = require('./GameStore');
var StaticDataStore = require('./StaticDataStore');
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Input = require('react-bootstrap').Input;
var AlertService = require('./AlertService');
var AddPanel = require('./AddPanel');

var GameDetailModel = React.createClass({

  getInitialState: function() {
    return {
      editing: false
    };
  },

  enableEditing: function() {
    this.setState({editing: true});
  },

  onDelete: function() {
    GameStore.delete(this.props.game.key);
    this.props.onRequestHide();
  },

  render: function() {
    if (this.state.editing) {
      return this.getEditingRender();
    } else {
      return this.getDisplayRender();
    }
  },

  componentWillMount: function() {
    var app = this;
    // make sure to hide popup if game is edited.
    GameStore.addConsumer('edit', function () {
      app.setState({editing: false});
    });
  },

  getEditingRender: function() {
    var game = this.props.game;
    return (
      <Modal bsStyle="primary" title="Game Details" animation={false}>
        <div className="modal-body">
          <AddPanel game={game}/>
        </div>
        <div className="modal-footer">
          <Button bsStyle="primary" onClick={this.props.onRequestHide}>Close</Button>
        </div>
      </Modal>
    );
  },

  getDisplayRender: function () {
    var game = this.props.game;
    return (
      <Modal bsStyle="primary" title="Game Details" animation={false}>
        <div className="modal-body">
          <p><strong>Date:</strong> {game.date}</p>
          <p><strong>Faction:</strong> {game.player_faction}</p>
          <p><strong>Caster:</strong> {game.player_warcaster}</p>
          <br/>
          <p><strong>Opponent:</strong> {game.opponent_name}</p>
          <p><strong>Faction:</strong> {game.opponent_faction}</p>
          <p><strong>Caster:</strong> {game.opponent_warcaster}</p>
          <br/>
          <p><strong>Size:</strong> {game.size}</p>
          <p><strong>Location:</strong> {game.location}</p>
          <p><strong>Game Type:</strong> {game.game_type}</p>
          <p><strong>Result:</strong> {game.result}</p>
        </div>
        <div className="modal-footer">
          <Button bsStyle="danger" onClick={this.onDelete}>Delete Game</Button>
          <Button bsStyle="primary" onClick={this.enableEditing}>Edit Game</Button>
          <Button bsStyle="primary" onClick={this.props.onRequestHide}>Close</Button>
        </div>
      </Modal>
    );
  }
});

var GamePanel = React.createClass({

  showDetails: function() {

  },

  render: function() {
    var app = this;
    var game = this.props.game;
    var result = StaticDataStore.getResultForName(game.result);
    var className = '';
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
        <th className="text-font">
          <ModalTrigger modal={<GameDetailModel game={game}/>}>
            <Button bsStyle="primary">Show</Button>
          </ModalTrigger>
        </th>
      </tr>
    );
  }
});

module.exports = GamePanel;