'use strict';

var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;

var ThreadStore = assign({}, EventEmitter.prototype, {
  init(messages) {
  },
});

module.exports = ThreadStore;

