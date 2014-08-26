'use strict';

angular.module('islcAngularApp')
  .service('bookmarkService', function bookmarkService($localStorage, $state, notificationService) {
    return {
      setLastPage: function (friendlyName) {
        $localStorage.lastPage = { name: $state.current.name, params: $state.params, options: $state.options, friendlyName: friendlyName};
      },

      getLastPage: function () {
        return $localStorage.lastPage
      },

      goToLastPage: function () {

        if ($localStorage.lastPage) {
          var page = $localStorage.lastPage;
          $state.go(page.name, page.params, page.options);
        }

      },

      setBookmark: function (friendlyName) {
        $localStorage.bookmark = { name: $state.current.name, params: $state.params, options: $state.options, friendlyName: friendlyName};
        notificationService.success('Bookmark Set');
      },

      getBookmark: function () {
        return $localStorage.bookmark
      },

      goToBookmark: function () {
        if ($localStorage.bookmark) {
          var page = $localStorage.bookmark;
          $state.go(page.name, page.params, page.options);
        }

      }
    }
  });
