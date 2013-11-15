'use strict';

angular.module('islcAngularApp')
  .directive('qvSlider', function () {
    return {
      templateUrl: '/views/directives/qv-slider.html',
      restrict: 'A',
      scope: {
        imageList: '=qvSlider'
      },
      link: function ($scope) {
        var list = $scope.imageList,
          i = list ? list.length : 0,
          images = [],
          FILENAME_REGEX = /[^\/]+\.\w+$/,
          TEXT_REGEX = /(_|\.\w+$)/g,
          SLASH_REGEX = /\:/g,
          filename,
          parts;

        while (i--) {
          filename = list[i].match(FILENAME_REGEX)[0];
          parts = filename.split('|');

          if (parts.length >= 2) {
            images.push({
              src: list[i],
              href: 'http://' + parts[0].replace(SLASH_REGEX, '/'),
              text: parts[1].replace(TEXT_REGEX, ' ').trim()
            });
          } else {
            images.push({
              src: list[i]
            });
          }

        }

        $scope.images = images;
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
