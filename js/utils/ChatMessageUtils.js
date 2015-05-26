'use strict';

module.exports = {
  convertMessage(message, currentThreadID) {
    return {
      id: message.id,
      threadID: message.threadID,
      authorName: message.authorName,
      date: new Date(message.timestamp),
      text: message.text,
      isRead: message.threadID === currentThreadID,
    };
  },

  getCreatedMessageData(text, currentThreadID) {
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      threadID: currentThreadID,
      authorName: 'Bill',
      date: new Date(timestamp),
      text: text,
      isRead: true,
    };
  },
}
