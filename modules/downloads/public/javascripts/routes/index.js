/**
 * @file index.js
 * Downloadsspace Downloads angular routes
 * @desc Downloads angular routes
 */


angular.module('IntrepidJS').config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            
            $stateProvider.
                state('downloads', {
                    url: '/downloads',
                    views: {
                        "main_content":
                            {
                                templateUrl: "/downloads",
                                controller: 'DownloadsIndexController'
                            }
                    }
                });
        }
    ]
);