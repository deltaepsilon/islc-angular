'use strict';

angular.module('islcAngularApp')
  .directive('qvImageExpand', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var REGEX = /[.#]/g,
          selector = attrs.qvImageExpand,
          modalTarget = selector.replace(REGEX, ''),
          body = angular.element(document.body),
          modal = angular.element('<div class="modal"></div>'),
          backdrop = angular.element('<div class="modal-backdrop"></div>'),
          open = function () {
            body.find(selector).clone().appendTo(modal);
            body.append(backdrop);

            backdrop.on('click', close);
            element.on('keyup', keyup);
          },
          close = function () {
            backdrop.remove();
            modal.empty();

            backdrop.off('click', close);
            element.off('keyup', keyup);
          },
          keyup = function (e) {
            if (e.keyCode === 27) {
              close();
            }

          };


        modal.attr('modal-target', modalTarget);
        backdrop.append(modal);

        element.on('click', open);

      }
    };
  });
