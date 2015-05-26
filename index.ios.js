'use strict';

var React = require('react-native');
var {
  Component,
  AppRegistry,
} = React;

var ChatScreen = require('./js/components/ChatScreen');
var ChatExampleData = require('./js/stores/ChatExampleData');
var ChatWebAPIUtils = require('./js/utils/ChatWebAPIUtils');

ChatExampleData.init().then(() => {
  ChatWebAPIUtils.getAllMessages();
});

class App extends Component {
  render() {
    return (
      <ChatScreen />
    );
  }
}

AppRegistry.registerComponent('chat', () => App);
