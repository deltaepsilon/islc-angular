'use strict';

angular.module('islcAngularApp')
  .controller('GalleriesCtrl', function ($rootScope, $scope, galleries, galleryService, $timeout, $state, notificationService, subscriptionService, subscriptions) {

    if (galleries.error) {
      notificationService.error('Gallery', galleries.error);
    } else {
      $scope.galleries = galleries;
    }

    $rootScope.newGallery = {};

    $scope.galleryAccess = subscriptionService.galleryAccess(subscriptions);

    $scope.removeGallery = function (gallery) {
      galleryService.remove(gallery.id).then(function (res) {
        galleryService.get(null, true).then(function (galleries) {
          $scope.galleries = galleries;
          $state.go('gallery');
          $timeout($rootScope.cancelLoader);
        });
      });
    };

    $scope.upload = function (Flow) {
      var flowHandler = function (e) {
        switch (e) {
          case 'complete':
            galleryService.cacheClear();
            galleryService.get(null, true).then(function (galleries) {
              if ($scope.galleries && $scope.galleries.length === galleries.length) {
                notificationService.error('Gallery Upload', 'Sorry! Your upload failed. Try a smaller file. Under 5MB is ideal.');
              }

              $scope.galleries = galleries;

              if (galleries && galleries.length) {
                $scope.newGallery = {};
                Flow.files = [];
                $state.go('gallery.view', {id: galleries[0].id});
              }

              $rootScope.cancelLoader();
              Flow.off('catchAll', flowHandler);

            });
            break;
          default:
            break;
        }
      };


      galleryService.cacheClear();
      $rootScope.startLoader();

      Flow.opts.query = $scope.newGallery;

      Flow.upload();

      Flow.on('catchAll', flowHandler);

    };

    $scope.clearFlow = function (Flow) {
      Flow.files = [];
    };

  });
