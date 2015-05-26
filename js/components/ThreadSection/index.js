'use strict';

var React = require('react-native');
var {
  Component,
  View,
} = React;

var ThreadStore = require('../../stores/ThreadStore');
var ThreadListItem = require('../ThreadListItem');

var styles = require('./style');

function getStateFromStores() {
  return {
    threads: ThreadStore.getAllChrono(),
    currentThreadID: ThreadStore.getCurrentID(),
  }
}

module.exports = class ThreadSection extends Component {
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

  render() {
    var threadListItems = this.state.threads.map((thread) => {
      return (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          currentThreadID={this.state.currentThreadID}
        />
      );
    });

    return (
      <View style={styles.container}>
        {threadListItems}
      </View>
    );
  }
};
