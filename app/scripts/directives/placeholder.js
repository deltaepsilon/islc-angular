'use strict';

angular.module('islcAngularApp')
  .directive('placeholder', function ($timeout, Modernizr) {
    return {
      restrict: 'A',
      require: 'ngModel',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        var type = element.attr('type');
        if (Modernizr.input.placeholder) {
//          return false;
        }
        if (type === 'number' || type === 'integer') {
          return false;
        }

        $timeout(function () {
          var placeholder = attrs.placeholder,
            label;

          if (type === 'password') {
            label = angular.element('<label class="password-placeholder">' + placeholder + '</label>')
            label.insertBefore(element);
          } else {
            element.val(placeholder);

            element.on('focus', function () {
              if (element.val() === placeholder) {
                element.val('');
              }
            });

            element.on('blur', function () {
              if (!element.val().length) {
                element.val(placeholder);
              }
            });
          }

        });




      }
    };
  });
