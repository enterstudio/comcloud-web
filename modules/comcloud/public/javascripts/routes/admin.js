/**
 * @file admin.js
 * Comcloudspace Comcloud admin angular routes
 * @desc Comcloud admin angular routes
 */


angular.module('IntrepidJS').config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider.
                state('admin.modules.comcloud', {
                    url: '/comcloud',
                    views: {
                        "actions_parent_content":
                            {
                                templateUrl: "/comcloud/admin/parent",
                                controller: "ComcloudAdminIndexController"
                            }
                    }
                });
        }
    ]
);