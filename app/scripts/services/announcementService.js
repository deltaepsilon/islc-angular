'use strict';

angular.module('islcAngularApp')
  .service('announcementService', function announcementService($q, paramsService, $firebase) {

    return {
      get: function () {
        return paramsService.get().then(function (params) {
          var deferred = $q.defer(),
            announcementsRef = $firebase(new Firebase(params.firebase + '/islc/announcements'));

          deferred.resolve(announcementsRef);

          return deferred.promise;
        });
      }
    }
  });
