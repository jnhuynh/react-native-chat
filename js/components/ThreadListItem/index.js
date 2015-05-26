'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Text,
} = React;

module.exports = class ThreadListItem extends Component {
  render() {
    var thread = this.props.thread;
    var lastMessage = thread.lastMessage;

    return (
      <View>
        <Text>
          {thread.name}
        </Text>

        <Text>
          {lastMessage.date.toLocaleTimeString()}
        </Text>

        <Text>
          {lastMessage.text}
        </Text>
      </View>
    );
  }
};
