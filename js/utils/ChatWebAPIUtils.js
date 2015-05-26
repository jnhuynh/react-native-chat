'use strict';

var React = require('react-native');
var {
  AsyncStorage,
} = React;

var ChatServerActionCreators = require('../actions/ChatServerActionCreators');

module.exports = {
  _getMessages() {
    return AsyncStorage.getItem('messages').then((messagesString) => {
      return JSON.parse(messagesString);
    });
  },

  getAllMessages() {
    return this._getMessages().then((messages) => {
      ChatServerActionCreators.receiveAll(Messages);
    });
  },

  createMessage(message, threadName) {
    return this._getMessages().then((messages) => {;
      var timestamp = Date.now();
      var id = 'm_' + timestamp;
      var threadID = message.threadID || ('t_' + Date.now());

      var createdMessage = {
        id: id,
        threadID: threadID,
        threadName: threadName,
        authorName: message.authorName,
        text: message.text,
        timestamp: timestamp,
      };

      messages.push(createdMessage);
      AsyncStorage.setItem('messages', JSON.stringify(rawMessages));

      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    });
  }
};
