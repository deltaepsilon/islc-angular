'use strict';

angular.module('islcAngularApp')
  .service('notificationService', function notificationService($notification) {
//    $notification.enableHtml5Mode();
    $notification.setSetting('custom', {duration: 10000, enabled: true});

    var service = {
      info: function (title, content, userData) {
        $notification.notify(null, title, content, userData, 'notify');
      },
      error: function (title, content, userData) {
        $notification.notify(null, title, content, userData, 'error');
      },
      success: function (title, content, userData) {
        $notification.notify(null, title, content, userData, 'success');
      },
      warning: function (title, content, userData) {
        $notification.notify(null, title, content, userData, 'warning');
      }
    };

//    service.info('Notification', 'This is an info message');
//    service.warning('Notification', 'This is an warning message');
//    service.error('Notification', 'This is an error message');
//    service.success('Notification', 'This is an success message');

    return service;
  });
