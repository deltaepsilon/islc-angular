'use strict';

angular.module('islcAngularApp')
  .directive('qvFlash', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var flashClass = attrs.flashClass || 'flash',
          flashDuration = attrs.flashDuration || 1000,
          flashMessage = attrs.flashMessage,
          minWidth,
          cachedHtml;

        element.on('click', function () {
          scope.$watch(attrs.csFlash, function () {
            element.addClass(flashClass);
          });

          element.attr('disabled', true);
          minWidth = element.css('min-width');

          if (flashMessage) {
            if (minWidth === '0px') {
              element.css('min-width', element.outerWidth());
            }

            cachedHtml = element.html()
            element.html(flashMessage)

          }

          $timeout(function () {
            element.removeClass(flashClass);
            element.removeAttr('disabled');
            if (flashMessage) {
              if (minWidth === '0px') {
                element.css('min-width', '0px');
              }
              element.html(cachedHtml);
            }
          }, flashDuration);

        });
      }
    };
  });

//
//angular.module('ClientSuccess.directives').directive 'csFlash', ($timeout) ->
//  restrict    : 'A'
//link        : (scope, element, attrs) ->
//  flashClass = attrs.flashClass || 'flash'
//flashDuration = attrs.flashDuration || 1000
//flashMessage = attrs.flashMessage
//
//#   Wait for a click to init this guy
//element.one 'click', ->
//  scope.$watch attrs.csFlash, ->
//  element.addClass flashClass
//element.attr('disabled', true);
//minWidth = element.css('min-width');
//
//
//if flashMessage
//  if minWidth == '0px'
//    element.css('min-width', element.outerWidth())
//cachedHtml = element.html()
//element.html(flashMessage)
//
//
//$timeout ->
//element.removeClass flashClass
//element.removeAttr('disabled');
//if flashMessage
//  if minWidth == '0px'
//    element.css('min-width', '0px')
//element.html(cachedHtml)
//
//  ,
//  flashDuration
//
//
