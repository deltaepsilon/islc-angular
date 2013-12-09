'use strict';

angular.module('islcAngularApp')
  .controller('GalleryCtrl', function ($rootScope, $scope, $sanitize, gallery, galleryService, notificationService, commentService) {
    $scope.$watch('gallery', function () {
      if ($scope.gallery && $scope.gallery.comments) {
        $scope.gallery.comments = commentService.sanitize($scope.gallery.comments);
      }

    });
    $scope.gallery = gallery;

    $scope.addComment = function (newComment) {
      galleryService.addComment($scope.gallery.id, $sanitize(newComment)).then(function (res) {
        if (res.error) {
          notificationService.error('Gallery', res.error);
        } else {
          galleryService.get($scope.gallery.id).then(function (ares) {
            $scope.newComment = undefined;
            $scope.gallery = ares;

          });
        }

      });
    };

  });
