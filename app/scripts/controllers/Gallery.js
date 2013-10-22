'use strict';

angular.module('islcAngularApp')
  .controller('GalleryCtrl', function ($rootScope, $scope, gallery, galleryService, $state) {
    $scope.gallery = gallery;


    $scope.removeGallery = function (gallery) {
      galleryService.remove(gallery.id).then(function (res) {
        galleryService.get(null, true).then(function (galleries) {
          $rootScope.galleries = galleries;
          $state.go('gallery');
        });
      });
    };

  });
