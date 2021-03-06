/**
 * @file wizard_controller.js
 * Comcloudspace Wizard Controller
 * @desc This module manage AngularJS Comcloud wizard operations
 */


/**
 * @desc  Comcloud Wizard controller
 * @param object $scope - The controller scope var
 * @param object $state - The controller state route var
 */
angular.module('IntrepidJS').controller('ComcloudWizardController',
    [
        '$scope',
        '$state',
        '$stateParams',
        'restService',
        '$upload',
        function ($scope, $state, $stateParams, restService, $upload) {
            $scope.formData = {};
            $scope.stepData = {};

            getData();

            $('input[type=file]').bootstrapFileInput();

            $scope.next = function(step) {
                switch (step) {
                    case "1":
                        if (Object.keys($scope.formData).length >= 4 && $.trim($scope.formData.name) != "") {
                            saveOrUpdateData();
                            if (!angular.element('.error-msg').hasClass('hide')) {
                                angular.element('.error-msg').addClass('hide');
                            }
                        } else {
                            angular.element('.error-msg').removeClass('hide');
                        }
                        break;
                    case "2":
                        if (Object.keys($scope.formData).length >= 9 && ($.trim($scope.formData.communication) != "" && $.trim($scope.formData.info) != "")) {
                            saveOrUpdateData();
                            if (!angular.element('.error-msg').hasClass('hide')) {
                                angular.element('.error-msg').addClass('hide');
                            }
                        } else {
                            angular.element('.error-msg').removeClass('hide');
                        }
                        break;
                    case "3":
                        if (Object.keys($scope.formData).length >= 10 && $.trim($scope.formData.domain) != "") {
                            saveOrUpdateData();

                            if (!angular.element('.error-msg').hasClass('hide')) {
                                angular.element('.error-msg').addClass('hide');
                            }
                            $scope.finish();
                        } else {
                            angular.element('.error-msg').removeClass('hide');
                        }
                        break;
                    default:
                        break;
                }

                if (step != "3") {
                    $state.transitionTo(
                        'comcloud.wizard',
                        {
                            step: parseInt(step) + 1
                        }
                    );
                }
            };

            $scope.finish = function() {
                $state.transitionTo(
                    'downloads'
                );
            };

            function saveOrUpdateData() {
                restService.post(
                    $scope.formData,
                    apiPrefix + '/comcloud',
                    function(data, status, headers, config) {

                        if (data.response == 'ok') {

                        }
                    },
                    function(data, status, headers, config) {

                    }
                );
            }

            function getData() {
                restService.get(
                    {},
                    apiPrefix + '/comcloud',
                    function(data, status, headers, config) {
                        if (data.response == 'ok') {
                            if (data.doc)
                                $scope.formData = data.doc;
                        }
                    },
                    function(data, status, headers, config) {

                    }
                );
            }

            $scope.onFileSelect = function($files) {
                $scope.selectedFile = $files[0];
                $scope.hasFile = true;
                updateImage();
            };

            var updateImage = function(){
                $scope.upload = $upload.upload({
                    url: apiPrefix + '/comcloud',
                    file: $scope.selectedFile
                }).success(function(data, status, headers, config) {
                    console.log(data.doc);
                    $scope.formData = data.doc;
                });
            };
        }
    ]
);
