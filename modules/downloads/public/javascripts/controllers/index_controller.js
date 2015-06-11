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
        'restService',
        function ($scope, $state, $interval, restService) {
            var interval = null;
            $scope.show = false;
            $scope.domain = null;
            getData();

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



            function getData() {
                restService.get(
                    {},
                    apiPrefix + '/comcloud',
                    function(data, status, headers, config) {
                        if (data.response == 'ok') {
                            if (data.doc) {
                                $scope.show = true;
                                $scope.domain = data.doc.domain;
                            }
                        }
                    },
                    function(data, status, headers, config) {
                        
                    }
                );
            }
            
        }
    ]
);
