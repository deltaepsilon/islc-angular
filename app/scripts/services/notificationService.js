'use strict';

angular.module('islcAngularApp')
  .service('notificationService', function notificationService($notification) {
    $notification.enableHtml5Mode();

    return {
      info: function (title, content, userData) {
        $notification.notify(null, title, content, userData);
      },
      error: function (title, content, userData) {
        $notification.notify(null, title, content, userData);
      },
      success: function (title, content, userData) {
        $notification.notify(null, title, content, userData);
      },
      warning: function (title, content, userData) {
        $notification.notify(null, title, content, userData);
      }
    }
  });
