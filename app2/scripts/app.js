/** @jsx React.DOM */

'use strict';

var React = require('react');

var GameStore = require('./GameStore');
var AddPanel = require('./AddPanel');
var GamesPanel = require('./GamesPanel');
var Accordion = require('react-bootstrap').Accordion;
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Input = require('react-bootstrap').Input;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var NavItem = require('react-bootstrap').NavItem;
var Nav = require('react-bootstrap').Nav;
var Navbar = require('react-bootstrap').Navbar;
var AlertService = require('./AlertService');

var FieldPromotionApp = React.createClass({


  getInitialState: function () {
    var app = this;

    GameStore.addConsumer('add', function (data) {
      app.replaceState({items: GameStore.getGames()});
      AlertService.showAlert('success', 'You have successfully added a game!');
    });

    return {activeKey: 1};
  },

  componentWillMount: function () {
    
  },

  selectRecordTab: function () {
    this.setState({activeKey: 1});
  },

  selectGamesTab: function () {
    this.setState({activeKey: 2});
  },

  render: function() {
    var content = <AddPanel/>;
    if (this.state.activeKey === 2) {
      content = <GamesPanel/>;
    }
    return (
      <div>
        <h3><div>Field Promotion</div></h3>
        <Navbar staticTop fluid>
            <Nav>
              <NavItem className={this.state.activeKey == 1 ? "active" : ""}
                  eventKey={1}
                  onClick={this.selectRecordTab}>
                Record New Game
              </NavItem>

              <NavItem className={this.state.activeKey == 2 ? "active" : ""}
                  eventKey={2}
                  onClick={this.selectGamesTab}>
                View All Games
              </NavItem>
            </Nav>
          </Navbar>
          {content}
      </div>
    );
  }
});

var mountNode = document.getElementById('app');
React.renderComponent(<FieldPromotionApp />, mountNode);
