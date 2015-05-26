'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Text,
  PropTypes,
} = React;

var styles = require('./style');

module.exports = class ThreadListItem extends Component {
  constructor() {
    this.propTypes = {
      message: PropTypes.object
    };
  }

  render() {
    var message = this.props.message;

    return (
      <View style={styles.container}>
        <Text>{message.authorName}</Text>
        <Text>{message.date.toLocaleTimeString()}</Text>
        <Text>{message.text}</Text>
      </View>
    );
  }
};
