/**
 * @file index_controller.js
 * Downloadsspace Index Controller
 * @desc This module manage AngularJS Downloads index operations
 */


/**
 * @desc  Downloads Index controller
 * @param object $scope - The controller scope var
 * @param object $state - The controller state route var
 */
angular.module('IntrepidJS').controller('DownloadsIndexController',
    [
        '$scope',
        '$state',
        '$interval',
        function ($scope, $state, $interval) {
            var interval = null;

            $scope.generateLink = function() {
                var count = 0;
                angular.element(".download-btn").addClass('hide');
                angular.element(".progress").removeClass('hide');
                interval = $interval(function() {
                    angular.element(".progress-bar").css({"width": count + "%"});
                    count += 1;
                    console.log(count);
                    if (count > 100) {
                        $scope.$emit('destroyInterval');
                    }
                }, 50);
            };

            $scope.$on('destroyInterval', function() {
                $interval.cancel(interval);
                angular.element(".download-link").removeClass('hide');
            });
            
        }
    ]
);
