'use strict';

angular.module('islcAngularApp')
  .directive('qvSlider', function () {
    return {
      templateUrl: '/views/directives/qv-slider.html',
      restrict: 'A',
      scope: {
        images: '=qvSlider'
      },
      controller: function ($scope, $element) {
        var list = $element.find('.qv-slider-list');
        $scope.hideRight = true;

        $scope.slide = function (px) {
          var windowWidth = $element.width(),
            margin = parseInt(list.css('margin-left'), 10),
            width = list.width(),
            change = px + margin,
            minMargin = -1 * (width - windowWidth) + px,
            left = Math.min(0, Math.max(minMargin, change));
          if (left === 0) {
            $scope.hideRight = true;
          } else if (minMargin > change) {
            $scope.hideLeft = true;
          } else {
            $scope.hideLeft = false;
            $scope.hideRight = false;
          }
          list.css('margin-left', left);

        }

      }
    };
  });
