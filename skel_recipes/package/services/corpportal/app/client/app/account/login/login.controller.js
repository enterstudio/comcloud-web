'use strict';

angular.module('corpPortalApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      console.log(document.domain);
      localStorage.setItem('config', '{"jid":"casuser@FQDN_HERE","server":"FQDN_HERE","wsURL":"ws://FQDN_HERE:5280/xmpp-websocket/","boshURL":"","transport":"websocket","credentials":{"password":""}}');

      console.log(localStorage);
      if(form.$valid) {
        Auth.login({
          name: $scope.user.name,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = 'Invalid credentials. ' + err;
        });
      }
    };

  });
