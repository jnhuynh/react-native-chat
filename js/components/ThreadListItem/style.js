'use strict';

var React = require('react-native');
var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FEFEFE',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },

  name: {
    fontFamily: "HelveticaNeue-Medium",
    fontSize: 18,
    color: '#262626',
    marginBottom: 5,
  },

  dateTime: {
    fontFamily: "HelveticaNeue-Light",
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 5,
  },

  message: {
    fontFamily: "HelveticaNeue",
    fontSize: 16,
    color: '#262626',
    marginBottom: 5,
  },
});
