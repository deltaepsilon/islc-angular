'use strict';

angular.module('islcAngularApp')
  .controller('GalleriesCtrl', function ($rootScope, $scope, galleries, galleryService, $timeout, $state, notificationService) {

    if (galleries.error) {
      notificationService.error('Gallery', galleries.error);
    } else {
      $rootScope.galleries = galleries;
    }

    $rootScope.newGallery = {};

    $scope.$on('fileChange', function (e, value) {
      $timeout(function () {
        $scope.newGallery.file = value;
        $scope.$digest();
      });

    });

    $rootScope.$on('iFrameLoad', function (e, value) {
      galleryService.get(null, true).then(function (galleries) {
        $rootScope.galleries = galleries;

        if (galleries && galleries.length) {
          $scope.newGallery = {};
          $state.go('gallery.view', {id: galleries[0].id});
        }

      });

    });

    $scope.fileChange = function (value) {

      $scope.$apply(function () {
        $scope.newGallery.file = value;
      });
    };

    $scope.removeGallery = function (gallery) {
      galleryService.remove(gallery.id).then(function (res) {
        galleryService.get(null, true).then(function (galleries) {
          $rootScope.galleries = galleries;
        });
      });
    };
  });
