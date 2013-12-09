'use strict';

angular.module('islcAngularApp')
  .controller('GalleryCtrl', function ($rootScope, $scope, gallery, galleryService, notificationService, $sanitize) {
    var LINEFEED_REGEX = /&#10;/g;

    $scope.$watch('gallery', function () {
      if ($scope.gallery && $scope.gallery.comments) {
        var i = $scope.gallery.comments.length;
        while (i--) {
          $scope.gallery.comments[i].comment = $sanitize($scope.gallery.comments[i].comment);
          $scope.gallery.comments[i].comment = $scope.gallery.comments[i].comment.replace(LINEFEED_REGEX, "\n");
        }
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
