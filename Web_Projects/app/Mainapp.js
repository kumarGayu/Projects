var React = require('react');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var Button = require('react-bootstrap').Button;
var Main = require('./components/Main');
var routerHistory = require('react-router').useRouterHistory;
var createHistory = require('history').createHashHistory;

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

var LinkContainer = require('react-router-bootstrap').LinkContainer;
var appHistory = routerHistory(createHistory)({ queryKey: false });

var Mainapp = React.createClass({
    getInitialState: function () {
    return {
      activeKey: 1
    }
  },
    handleSelect: function(eventKey) {
        this.setState({
        activeKey: eventKey
      });
    },
    render: function(){
       return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          <LinkContainer to={{ pathname: '/home'}}><NavItem eventKey='0'>Home</NavItem></LinkContainer>
          <LinkContainer to={{ pathname: '/deeplearning'}}><NavItem eventKey='3'>Deep Learning</NavItem></LinkContainer>
        </Nav>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
    }
});
module.exports = Mainapp;