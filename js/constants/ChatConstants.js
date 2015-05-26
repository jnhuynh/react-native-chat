'use strict';

var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    CLICK_THREAD: null,
    CREATE_MESSAGE: null,
    RECEIVED_MESSAGES: null,
    RECEIVED_CREATED_MESSAGE: null,
  }),
};
