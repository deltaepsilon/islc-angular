'use strict';

angular.module('islcAngularApp')
  .directive('qvLink', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $timeout(function () {
          var href = attrs.qvLink,
            text = attrs.linkText;

          element = element[0];

          if (!href || !text) {
            return;
          } else {
            var attributes = element.attributes,
              i = attributes.length,
              a = document.createElement("a"),
              attribute;

            a.setAttribute('href', href);
            a.innerHTML = text;

            while (i--) {
              attribute = attributes[i];
              a.setAttribute(attribute.name, element.getAttribute(attribute.name));
            }
            element.parentNode.replaceChild(a, element)
          }
        });

      }
    };
  });


//# Accordion directive.
//# ----------------------
//# open and close the current tab in accordion animation.
//
//  angular.module('ClientSuccess.directives').directive 'csLink', () ->
//  restrict    : 'A'
//link        : (scope, element, attrs) ->
//  href = attrs['csLink']
//text = attrs['linkText']
//element = element[0]
//if !href || !text
//  return
//else
//  attributes = element.attributes
//i = attributes.length
//a = document.createElement("a")
//a.setAttribute 'href', href
//a.innerHTML = text
//
//while (i--)
//  attribute = attributes[i]
//a.setAttribute(attribute.name, element.getAttribute(attribute.name))
//
//element.parentNode.replaceChild(a, element)

