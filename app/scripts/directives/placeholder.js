'use strict';

angular.module('islcAngularApp')
  .directive('placeholder', function ($timeout, Modernizr) {
    return {
      restrict: 'A',
      require: 'ngModel',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        if (Modernizr.input.placeholder) {
          return false;
        }
        $timeout(function () {
          var placeholder = attrs.placeholder,
            label = angular.element('<label>' + placeholder + '</label>'),
            wrapper = angular.element('<div class="input-wrapper"></div>');


          element.wrap(wrapper);
          label.insertBefore(element);

          element.on('focus', function () {
            label.hide();
          });

          element.on('blur', function () {
            if (!element.val().length) {
              label.show();
            }
          });
        });




      }
    };
  });
