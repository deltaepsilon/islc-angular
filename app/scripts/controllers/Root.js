'use strict';

angular.module('islcAngularApp')
  .controller('RootCtrl', function ($scope, melissa, studentWork) {
    $scope.images = {
      studentWork: studentWork,
      melissa: melissa
    }
  });
