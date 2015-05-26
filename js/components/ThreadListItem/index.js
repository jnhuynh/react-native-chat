'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Text,
} = React;

var styles = require('./style');

module.exports = class ThreadListItem extends Component {
  render() {
    var thread = this.props.thread;
    var lastMessage = thread.lastMessage;

    return (
      <View style={styles.container}>
        <Text style={styles.name}>
          {thread.name}
        </Text>

        <Text style={styles.dateTime}>
          {lastMessage.date.toLocaleTimeString()}
        </Text>

        <Text style={styles.message}>
          {lastMessage.text}
        </Text>
      </View>
    );
  }
};
