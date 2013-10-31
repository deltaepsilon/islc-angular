'use strict';

angular.module('islcAngularApp')
  .directive('qvTruncate', function ($timeout, _) {
    return {
      restrict: 'A',
      priority: -1,
      link: function postLink(scope, element, attrs) {
        var max = parseInt(attrs.csTruncate, 10) || 250,
          counter = 0,
          nuke = false,
          truncateChildren = function (max, element) {
            var children = element.children(),
              length = children.length,
              i = 0,
              child,
              text;

            for (i; i < length; i++) {
              child = angular.element(children[i]);
              if (nuke) {
                child.remove();
              } else if (child.children().length) {
                truncateChildren(max, child);
              } else {
                text = child.text();
                counter += text.length;
                if (counter > max){
                  text = text.substr(0, text.length - (counter - max) - 3) + '...';
                  child.text(text);
                  nuke = true;
                }

              }

            }

          };

        $timeout(function () {
          truncateChildren(max, element);
        });

      }
    };
  });
