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

    $scope.removeGallery = function (gallery) {
      galleryService.remove(gallery.id).then(function (res) {
        galleryService.get(null, true).then(function (galleries) {
          $rootScope.galleries = galleries;
          $state.go('gallery');
          $timeout($rootScope.cancelLoader);
        });
      });
    };

    $scope.upload = function (Flow) {
      galleryService.cacheClear();
      $rootScope.startLoader();

      Flow.upload();

      Flow.on('catchAll', function (e) {
        switch (e) {
          case 'complete':
            galleryService.cacheClear();
            galleryService.get(null, true).then(function (galleries) {
              if ($rootScope.galleries && $rootScope.galleries.length === galleries.length) {
                notificationService.error('Gallery Upload', 'Sorry! Your upload failed. Try a smaller file. Under 5MB is ideal.');
              }

              $rootScope.galleries = galleries;

              if (galleries && galleries.length) {
                $scope.newGallery = {};
                Flow.files = [];
                $state.go('gallery.view', {id: galleries[0].id});
              }

              $rootScope.cancelLoader();

            });
            break;
          default:
            break;
        }
      });

    };

    $scope.clearFlow = function (Flow) {
      Flow.files = [];
    };

  });
