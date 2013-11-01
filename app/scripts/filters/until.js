'use strict';

angular.module('islcAngularApp')
  .filter('until', function (moment) {
    return function (date, type) {
      var today = moment(),
        date = moment(date),
        number = date.diff(today, type || 'days');

      return Math.max(0, number);
    };
  });
