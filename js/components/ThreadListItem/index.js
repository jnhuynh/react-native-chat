'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Text,
  PropTypes,
  TouchableOpacity,
} = React;

var ChatThreadActionCreators = require('../../actions/ChatThreadActionCreators');

var styles = require('./style');

module.exports = class ThreadListItem extends Component {
  constructor() {
    this.propTypes = {
      thread: PropTypes.object,
      currentThreadID: PropTypes.string,
    };
  }

  _onPress() {
    ChatThreadActionCreators.clickThread(this.props.thread.id);
  }

  render() {
    var thread = this.props.thread;
    var lastMessage = thread.lastMessage;

    return (
      <TouchableOpacity activeOpacity={0.85} onPress={this._onPress.bind(this)}>
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
      </TouchableOpacity>
    );
  }
};
