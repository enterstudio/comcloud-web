'use strict';

angular.module('corpPortalApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {

    // if user hasn't previous session, redirect to login page
    $scope.isLoggedIn = Auth.isLoggedIn;
    if($scope.isLoggedIn()===false){
      $scope.loggedIn=false;
    }else{
      $scope.loggedIn=true;
      $scope.services = [];

      $http.get('/api/service').success(function(services) {
        var aux = [];
        for (var x in services){
          if (services[x].active){
            aux.push(services[x])
          }
        }
        $scope.services = aux;
      });
    }
  });
