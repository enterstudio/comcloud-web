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
        function ($scope, $state, $stateParams) {
        	$scope.form = {};
        	$scope.stepData = {};

        	// console.log($stateParams);

        	$scope.next = function(step) {
                // console.log(step);
        		// $scope.stepData[step] = {
        		// 	formData: $scope.form
        		// };
                console.log(step);

        		$state.transitionTo(
        			'comcloud.wizard',
        			{
        				step: parseInt(step)
        			}
        		);
        	};

            $scope.finish = function(step) {
                // $scope.stepData[step] = {
                //     formData: $scope.form
                // };

                $state.transitionTo(
                    'comcloud.wizard',
                    {
                        step: parseInt(step)
                    }
                );
            };
        }
    ]
);
