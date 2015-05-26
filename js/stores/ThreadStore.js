'use strict';

var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _threads = {};

var ThreadStore = assign({}, EventEmitter.prototype, {
  init(messages) {
    messages.forEach((message) => {
      var threadID = message.threadID;
      var thread = _threads[threadID];

      if (thread && thread.lastTimestamp > message.timestamp) {
        return;
      }

      _threads[threadID] = {
        id: threadID,
        name: message.threadName,
        lastMessage: ChatMessageUtils.convertMessage(message, _currentID),
      }
    });

    if (!_currentID) {
      var allChrono = this.getAllChrono();
      _currentID = allChrono[allChrono.length - 1].id;
    }

    _threads[_currentID].lastMessage.isRead = true;
  },

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
    return _threads[id];
  },

  getAll() {
    return _threads;
  },

  getAllChrono() {
    var orderedThreads = [];
    for (var id in _threads) {
      var thread = _threads[id];
      orderedThreads.push(thread);
    }

    orderedThreads.sort((a, b) => {
      if (a.lastMessage.date < b.lastMessage.date) {
        return -1;
      } else if (a.lastMessage.date > b.lastMessage.date) {
        return 1;
      }

      return 0;
    });

    return orderedThreads;
  },

  getCurrentID() {
    return _currentID;
  },

  getCurrent() {
    return this.get(this.getCurrentID());
  },
});

ThreadStore.dispatchToken = ChatAppDispatcher.register((action) => {
  switch(action.type) {
    case ActionTypes.CLICK_THREAD:
      _currentID = action.threadID;
      _threads[_currentID].lastMessage.isRead = true;
      ThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVED_MESSAGES:
      ThreadStore.init(action.messages);
      ThreadStore.emitChange();
      break;

    default:
  }
});

module.exports = ThreadStore;
