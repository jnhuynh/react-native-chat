'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Text,
} = React;

var ThreadStore = require('../../stores/ThreadStore');
var MessageStore = require('../../stores/MessageStore');

var MessageListItem = require('../MessageListItem');

var styles = require('./style');

function getStateFromStores() {
  return {
    thread: ThreadStore.getCurrent(),
    messages: MessageStore.getAllForCurrentThread(),
  }
}

module.exports = class MessageSection extends Component {
  constructor() {
    this.state = getStateFromStores();
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  componentDidMount() {
    ThreadStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ThreadStore.removeChangeListener(this._onChange.bind(this));
  }

  componentDidUpdate() {
  }

  render() {
    var messageListItems = this.state.messages.map((message) => {
      return (
        <MessageListItem
          key={message.id}
          message={message}
        />
      );
    });

    return (
      <View style={styles.container}>
        {messageListItems}
      </View>
    );
  }
};
