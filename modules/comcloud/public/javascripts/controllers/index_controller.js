/**
 * @file index_controller.js
 * Comcloudspace Index Controller
 * @desc This module manage AngularJS Comcloud index operations
 */


/**
 * @desc  Comcloud Index controller
 * @param object $scope - The controller scope var
 * @param object $state - The controller state route var
 */
angular.module('IntrepidJS').controller('ComcloudIndexController',
    [
        '$scope',
        '$state',
        function ($scope, $state) {
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if (toState.name == "comcloud") {
                    $state.go('comcloud.wizard', {step: 1});
                }
            });
        }
    ]
);
