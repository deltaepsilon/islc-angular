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
      gallerService.cacheClear();
      galleryService.get(null, true).then(function (galleries) {
        $rootScope.galleries = galleries;

        if (galleries && galleries.length) {
          $scope.newGallery = {};
          $state.go('gallery.view', {id: galleries[0].id});
        } else {
          $rootScope.cancelLoader();
        }

      });

    });

    $scope.fileChange = function (value) {
      $scope.newGallery.file = value;

    };

    $scope.removeGallery = function (gallery) {
      galleryService.remove(gallery.id).then(function (res) {
        galleryService.get(null, true).then(function (galleries) {
          $rootScope.galleries = galleries;
          $state.go('gallery');
        });
      });
    };
  });
