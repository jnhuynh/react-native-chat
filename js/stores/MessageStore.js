'use strict';

var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var ThreadStore = require('./ThreadStore');
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _messages = {};

function _addMessages(messages) {
  messages.forEach((message) => {
    if (!_messages[message.id]) {
      _messages[message.id] = ChatMessageUtils.convertMessage(message, ThreadStore.getCurrentID());
    }
  });
}

var MessageStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get(id) {
    return _messages[id];
  },

  getAll() {
    return _messages;
  },

  getAllForThread(threadID) {
    var threadMessages = [];

    for (var id in _messages) {
      if (_messages[id].threadID === threadID) {
        threadMessages.push(_messages[id]);
      }
    }

    threadMessages.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }

      return 0;
    });

    return threadMessages;
  },

  getAllForCurrentThread() {
    return this.getAllForThread(ThreadStore.getCurrentID());
  },
});

MessageStore.dispatchToken = ChatAppDispatcher.register((action) => {
  switch(action.type) {
    case ActionTypes.CLICK_THREAD:
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      MessageStore.emitChange();
      break;
    case ActionTypes.CREATE_MESSAGE:
      break;
    case ActionTypes.RECEIVED_MESSAGES:
      _addMessages(action.messages);
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      MessageStore.emitChange();
      break;

    default:
  }
});

module.exports = MessageStore;
