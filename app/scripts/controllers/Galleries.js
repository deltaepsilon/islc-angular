'use strict';

angular.module('islcAngularApp')
  .controller('GalleriesCtrl', function ($rootScope, $scope, galleries, galleryService, $timeout, $state, notificationService, subscriptionService, subscriptions) {

    if (galleries.error) {
      notificationService.error('Gallery', galleries.error);
    } else {
      $rootScope.galleries = galleries;
    }

    $rootScope.newGallery = {};

    $scope.galleryAccess = subscriptionService.galleryAccess(subscriptions);

    $scope.$on('fileChange', function (e, value) {
      $timeout(function () {
        $scope.newGallery.file = value;
        $scope.$digest();
      });

    });

    $scope.iFrameSubmit = function (target) {
      galleryService.cacheClear();
      $rootScope.startLoader();
    };

    $rootScope.$on('iFrameLoad', function (e, value) {
      galleryService.cacheClear();
      galleryService.get(null, true).then(function (galleries) {
        if ($rootScope.galleries && $rootScope.galleries.length === galleries.length) {
          notificationService.error('Gallery Upload', 'Sorry! Your upload failed. Try a smaller file. Under 5MB is ideal.');
        }

        $rootScope.galleries = galleries;

        if (galleries && galleries.length) {
          $scope.newGallery = {};
          $state.go('gallery.view', {id: galleries[0].id});
        }

        $rootScope.cancelLoader();

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
