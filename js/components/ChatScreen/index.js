'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Text,
} = React;

var styles = require('./style');

var ThreadSection = require('../ThreadSection');
var MessageSection = require('../MessageSection');

module.exports = class ChatScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ThreadSection />
        <MessageSection />
      </View>
    );
  }
};
