/** @jsx React.DOM */
var React = require('react');
var Alert = require('react-bootstrap').Alert;

var AlertService = {

  showAlert: function (type, text) {
    var mountNode = document.getElementById('alertGutter');
    React.renderComponent(
      <Alert className="floater" bsStyle={type}>
        <p>{text}</p>
      </Alert>
    ,mountNode);
    setTimeout(function(){
      React.unmountComponentAtNode(document.getElementById('alertGutter'));
    }, 3000);
  }
}

module.exports = AlertService;