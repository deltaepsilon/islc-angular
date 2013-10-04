'use strict';

angular.module('islcAngularApp')
  .service('notificationService', function notificationService($notification) {
    $notification.enableHtml5Mode();

    return {
      info: function (title, content, userData) {
        $notification.notify('images/icons-2x/info.png', title, content, userData);
      },
      error: function (title, content, userData) {
        $notification.notify('images/icons-2x/error.png', title, content, userData);
      },
      success: function (title, content, userData) {
        $notification.notify('images/icons-2x/success.png', title, content, userData);
      },
      warning: function (title, content, userData) {
        $notification.notify('images/icons-2x/warning.png', title, content, userData);
      }
    }
  });
