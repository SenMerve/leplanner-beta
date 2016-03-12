(function() {
  'use strict';

  angular
    .module('app')
    .controller('CreateController', ['$scope','$rootScope','$timeout','$location','requestService','$translate',
    function($scope,$rootScope,$timeout,$location,requestService, $translate) {

      $translate('PAGE.CREATE').then(function (t) {
        $rootScope.title = t+' | Leplanner beta';
      });

      $scope.createScenario = function(scenario){

        $scope.saving_in_progress = true;

        if(!scenario || typeof scenario.name == 'undefined' || scenario.name === '' || scenario.name.length <= 2){
          $scope.errorMessage = 'Scenario name has to be atleast 3 chars long!';
          $scope.saving_in_progress = undefined;
          $timeout(function() { $scope.errorMessage = null; }, 2000);
          return;
        }

        if(typeof scenario.description == 'undefined' || scenario.description === '' || scenario.description.length <= 2){
          $scope.errorMessage = 'Scenario description has to be atleast 3 chars long!';
          $scope.saving_in_progress = undefined;
          $timeout(function() { $scope.errorMessage = null; }, 2000);
          return;
        }

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario: scenario
        };

        $scope.saving = true;

        requestService.post('/scenario/create', params)
          .then(function(data) {

            $scope.saving_in_progress = undefined;

            if(data.scenario){

              $scope.errorMessage = null;

              $location.path('/edit-details/'+data.scenario._id);

            }

            if(data.error){
              console.log(data.error);
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                case 0:
                  $scope.errorMessage = 'Scenario name has to be atlest 3 chars long';
                  break;
                case 1:
                  $scope.errorMessage = 'Scenario description has to be atlest 3 chars long';
                  break;
                default:
                  $scope.errorMessage = 'Unknown error';
              }

              $timeout(function() { $scope.errorMessage = null; }, 2000);

            }

        });

      };

  }]); // CreateController
}());
