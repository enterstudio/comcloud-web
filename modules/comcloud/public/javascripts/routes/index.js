/**
 * @file index.js
 * Comcloudspace Comcloud angular routes
 * @desc Comcloud angular routes
 */


angular.module('IntrepidJS').config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            
            $stateProvider.
                state('comcloud', {
                    url: '/comcloud',
                    views: {
                        "main_content":
                            {
                                templateUrl: "/comcloud",
                                controller: 'ComcloudIndexController'
                            }
                    }
                }).
                state('comcloud.wizard', {
                    url: '/wizard/step/:step',
                    views: {
                        "wizard_content":
                            {
                                templateUrl: function ($stateParams) {
                                    return '/comcloud/wizard/step/' + $stateParams.step;
                                },
                                controller: 'ComcloudWizardController',
                                params: ['step']
                            }
                    }
                });
        }
    ]
);