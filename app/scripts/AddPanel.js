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

var AddNewPanel = React.createClass({

  getInitialState: function () {
    if (this.props.game) {
      // panel is editing an existing game
      return {
        editing: true,
        opponent_faction: this.props.game.opponent_faction,
        date: this.props.game.date,
        player_faction: this.props.game.player_faction,
        player_warcaster: this.props.game.player_warcaster,
        opponent_name: this.props.game.opponent_name,
        opponent_warcaster: this.props.game.opponent_warcaster,
        size: this.props.game.size,
        won: this.props.game.won,
        draw: this.props.game.draw,
        teaching: this.props.game.teaching,
        location: this.props.game.location,
        game_type: this.props.game.game_type,
        result: this.props.game.result
      };
    }
    return {
      editing: false,
      opponent_faction: 'Khador',
      date: '',
      player_faction: 'Khador',
      player_warcaster: 'Orsus Zoktavir, Butcher of Khardov',
      opponent_name: '',
      opponent_warcaster: 'Orsus Zoktavir, Butcher of Khardov',
      size: 0,
      won: true,
      draw: false,
      teaching: false,
      location: '',
      game_type: '',
      result: 'Assassination Victory'
    };
  },

  validateGame: function() {
    var forSize = Number(this.state.size);
    if (isNaN(forSize)) {
      return 'Please supply a numeric game size.';
    }
    var date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/ ;
    if(!(date_regex.test(this.state.date)))
    {
      return 'Please supply a date in the format of YYYY-MM-DD';
    }
  },

  onSave: function () {
    document.body.scrollTop = 0;
    var error = this.validateGame();
    if (!error) {
      var newGame = {
        opponent_faction: this.state.opponent_faction,
        date: this.state.date + 'T00:00:00Z',
        player_faction: this.state.player_faction,
        player_warcaster: this.state.player_warcaster,
        opponent_name: this.state.opponent_name,
        opponent_warcaster: this.state.opponent_warcaster,
        size: Number(this.state.size),
        location: this.state.location,
        game_type: this.state.game_type,
        result: this.state.result
      };

      var result = StaticDataStore.getResultForName(this.state.result);
      newGame.won = result.won;
      newGame.draw = result.draw;
      newGame.teaching = result.teaching;

      if (this.state.editing) {
        newGame.key = this.props.game.key;
        GameStore.update(newGame);
      } else {
        GameStore.add(newGame);
      }
    } else {
      AlertService.showAlert('danger', error);
    }
  },

  onReset: function() {
    $('#date').val('');
    $('#player_faction').val('Khador');
    $('#opponent_faction').val('Khador');
    $('#player_warcaster').val('Orsus Zoktavir, Butcher of Khardov');
    $('#opponent_warcaster').val('Orsus Zoktavir, Butcher of Khardov');
    $('#size').val('');
    $('#opponent_name').val('');
    $('#game_type').val('');
    $('#location').val('');
    $('#result').val('Assassination Victory');
    this.replaceState(this.getInitialState());
  },

  componentDidMount: function() {
    var app = this;
      $('#date').datepicker({
      dateFormat:'yy-mm-dd',
      onSelect: function(dateText) {
        app.setState({date: this.value});
      }
    });

    var date = new Date();
    var dateString = date.toISOString().substring(0,10);
    this.setState({date: dateString});
    $('#date').val(dateString);


    if (this.props.game) {
      // editing existing game, so populate components accordingly!
      $('#player_faction').val(this.props.game.player_faction);
      $('#size').val(this.props.game.size);
      $('#game_type').val(this.props.game.game_type);
      $('#location').val(this.props.game.location);
      $('#date').val(this.props.game.date);
      $('#opponent_faction').val(this.props.game.opponent_faction);
      $('#opponent_warcaster').val(this.props.game.opponent_warcaster);
      $('#result').val(this.props.game.result);
      $('#opponent_name').val(this.props.game.opponent_name);
      $('#player_warcaster').val(this.props.game.player_warcaster);
    } else {
      var cache = GameStore.getLastSavedGameStorage();
    
      if (cache && !this.props.game) {
        $('#player_faction').val(cache.player_faction);
        this.setState({player_faction: cache.player_faction});

        $('#player_warcaster').val(cache.player_warcaster);
        this.setState({player_warcaster: cache.player_warcaster});

        $('#size').val(cache.size);
        this.setState({size: cache.size});

        $('#game_type').val(cache.game_type);
        this.setState({game_type: cache.game_type});

        $('#location').val(cache.location);
        this.setState({location: cache.location});
      }
    }
  },

  onFactionChanged: function(event) {
    var faction = event.target.value;
    this.setState({
      player_faction: faction,
      player_warcaster: StaticDataStore.getCastersForFaction(faction)[0].name
    });
    $('#player_warcaster').val(this.state.player_warcaster);
  },
  onOpponentFactionChanged: function(event) {
    var faction = event.target.value;
    this.setState({
      opponent_faction: faction,
      opponent_warcaster: StaticDataStore.getCastersForFaction(faction)[0].name
    });
    $('#opponent_warcaster').val(this.state.opponent_warcaster);
  },
  onWarcasterChanged: function(event) {
    this.setState({player_warcaster: event.target.value});
  },
  onOpponentWarcasterChanged: function(event) {
    this.setState({opponent_warcaster: event.target.value});
  },
  onDateChanged: function(event) {
    this.setState({date: event.target.value});
  },
  onOpponentNameChanged: function(event) {
    this.setState({opponent_name: event.target.value});
  },
  onSizeChanged: function(event) {
    this.setState({size: event.target.value});
  },
  onLocationChanged: function(event) {
    this.setState({location: event.target.value});
  },
  onTypeChanged: function(event) {
    this.setState({game_type: event.target.value});
  },
  onResultChanged: function(event) {
    this.setState({result: event.target.value});
  },

  /**
    * REACT render 
    */
  render: function () {
    var factionNodes = StaticDataStore.getFactions().map(function (faction) {
      return (
            <option value={faction.name}>{faction.name}</option>
      );
    }.bind(this));

    var oppFactionNodes = StaticDataStore.getFactions().map(function (faction) {
      return (
            <option value={faction.name}>{faction.name}</option>
      );
    }.bind(this));

    var resultNodes = StaticDataStore.getResults().map(function (result) {
      return (
            <option value={result.name}>{result.name}</option>
      );
    }.bind(this));

    var casterNodes = StaticDataStore.getCastersForFaction(this.state.player_faction).map(function (caster) {
      return (
            <option value={caster.name}>{caster.name}</option>
      );
    }.bind(this));

    var opponentCasterNodes = StaticDataStore.getCastersForFaction(this.state.opponent_faction).map(function (caster) {
      return (
            <option value={caster.name}>{caster.name}</option>
      );
    }.bind(this));

    var typeNodes = StaticDataStore.getGameTypes().map(function (type) {
      return (
            <option value={type}>{type}</option>
      );
    }.bind(this));

    var actionButton;
    var clearButton;
    var header;
    var key;
    if (this.state.editing) {
      actionButton = <Button bsStyle='primary' onClick={this.onSave}>Save Changes</Button>;
      header = 'Edit Game';
      key = this.props.game.key;
    } else {
      actionButton = <Button bsStyle='primary' onClick={this.onSave}>Add</Button>;
      clearButton = <Button bsStyle='primary' onClick={this.onReset}>Reset</Button>;
      header = 'Add New Game';
      key = 'new';
    }
    return (
        <Panel header={header} key={key}>
          <form>
          <Table>
            <tbody>
            <tr>
              <th width='10%'>Date</th>
              <td><Input className='dataRow' ref='date' id='date' type='text' onChange={this.onDateChanged} placeholder='YYYY-MM-DD'/></td>
            </tr>
            <tr>
              <th>Faction</th>
              <td><select className='dataRow' ref='player_faction' id='player_faction' onChange={this.onFactionChanged}>{factionNodes}</select></td>
            </tr>
            <tr>
              <th>Warcaster</th>
              <td><select className='dataRow' ref='player_warcaster' id='player_warcaster' onChange={this.onWarcasterChanged}>{casterNodes}</select></td>
            </tr>
            <tr>
              <th>Opponent Name</th>
              <td><Input type='text' className='dataRow' ref='opponent_name' id='opponent_name' onChange={this.onOpponentNameChanged}/></td>
            </tr>
            <tr>
              <th>Opponent Faction</th>
              <td><select className='dataRow' ref='opponent_faction' id='opponent_faction' onChange={this.onOpponentFactionChanged}>{oppFactionNodes}</select></td>
            </tr>
            <tr>
              <th>Opponent Warcaster</th>
              <td><select className='dataRow' ref='opponent_warcaster' id='opponent_warcaster' onChange={this.onOpponentWarcasterChanged}>{opponentCasterNodes}</select></td>
            </tr>
            <tr>
              <th>Game Size</th>
              <td><Input className='dataRow' type='text' ref='size' id='size' onChange={this.onSizeChanged} pattern='\d*'/></td>
            </tr>
            <tr>
              <th>Result</th>
              <td><select className='dataRow' ref='result' id='result' onChange={this.onResultChanged}>{resultNodes}</select></td>
            </tr>
            <tr>
              <th>Location</th>
              <td><Input className='dataRow' type='text' ref='location' id='location' onChange={this.onLocationChanged} /></td>
            </tr>
            <tr>
              <th>Game Type</th>
              <td><select className='dataRow' ref='game_type' id='game_type' onChange={this.onTypeChanged}>{typeNodes}</select></td>
            </tr>
            </tbody>
            
          </Table>
          </form>
          <ButtonToolbar>
            {actionButton}
            {clearButton}
          </ButtonToolbar>
          </Panel>
    );
  }
});

module.exports = AddNewPanel;