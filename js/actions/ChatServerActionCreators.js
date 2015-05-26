'use strict';

var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
  receiveAll(messages) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.RECEIVED_MESSAGES,
      messages: messages,
    });
  },

  receiveCreatedMessage(createdMessage) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.RECEIVED_CREATED_MESSAGE,
      message: createdMessage,
    });
  }
};
