'use strict';

angular.module('corpPortalApp')
  .factory('Auth', function Auth($location, $rootScope, $http, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('CASTUSER')) {
      currentUser.name = $cookieStore.get('CASTUSER');
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/cas', {
          username: user.name,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('CASTGC', data.castgc);
          $cookieStore.put('CASTUSER', data.user);
          $http.defaults.withCredentials = true;
          $http({
            url: "http://comclouddh.wtelecom.es:8083/login.json",
            method: "POST",
            data: "username=casuser&password=MellonMellon",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data,responseCode, headers, req) {
            console.log(data);
            //console.log(responseCode);
            //console.log(headers());
            //console.log(req);
          });

          currentUser = {name: data.user};
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('CASTGC');
        $cookieStore.remove('CASTUSER');
        currentUser = {};
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        if(currentUser.name){
          return true;
        }else{
          return false;
        }
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.name) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return false;
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('CASTGC');
      }
    };
  });
