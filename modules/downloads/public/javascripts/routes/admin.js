/**
 * @file admin.js
 * Downloadsspace Downloads admin angular routes
 * @desc Downloads admin angular routes
 */


angular.module('IntrepidJS').config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider.
                state('admin.modules.downloads', {
                    url: '/downloads',
                    views: {
                        "actions_parent_content":
                            {
                                templateUrl: "/downloads/admin/parent",
                                controller: "DownloadsAdminIndexController"
                            }
                    }
                });
        }
    ]
);