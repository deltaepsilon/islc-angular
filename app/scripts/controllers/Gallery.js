'use strict';

angular.module('islcAngularApp')
  .controller('GalleryCtrl', function ($rootScope, $scope, galleries, $timeout) {
    console.log('galleries', galleries);
    $rootScope.galleries = galleries;
    $rootScope.newGallery = {};

    $scope.$on('fileChange', function (e, value) {
      $timeout(function () {
        $scope.newGallery.file = value;
        $scope.$digest();
      });

    });

    $scope.fileChange = function (value) {

      $scope.$apply(function () {
        $scope.newGallery.file = value;
      });
    };



  });
