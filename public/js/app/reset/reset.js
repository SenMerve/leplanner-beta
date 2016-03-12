(function() {
  'use strict';

  angular
    .module('app')
    .controller('ResetController', ['$scope','$location','$rootScope','$routeParams','$timeout','requestService','$translate',
    function($scope,$location,$rootScope,$routeParams,$timeout,requestService,$translate) {

        $translate('PAGE.PASSWORD_RESET').then(function (t) {
           $rootScope.title = t+' | Leplanner beta';
        });


      $scope.reset = function(user){

        if(
           typeof user.new_password != 'undefined' &&
           typeof user.new_password_twice != 'undefined'
          ){
            if(user.new_password == user.new_password_twice){

                // Save new password
                user.token = $routeParams.token;

                requestService.post('/user/reset-password', user)
                  .then(function(data) {
                    if(data.success){
                      $location.path('/login');
                    }

                    if(data.error){
                      switch(data.error.id) {
                        case 5:
                          $scope.reset_error = 'Password has to be min 8 chars long';
                          break;
                        case 7:
                          $scope.reset_error = 'Please enter all fields';
                          break;
                        case 9:
                          $scope.reset_error = 'New passwords dont match';
                          break;
                        case 10:
                          $scope.reset_error = 'Request new token';
                          break;
                        case 11:
                          $scope.reset_error = 'Token expired';
                          break;
                        default:
                          $scope.reset_error = 'Unknown error';
                      }
                      $timeout(function() { $scope.reset_error = null; }, 2000);
                    }

                });

            }else{
              $scope.reset_error = 'New passwords dont match';
              $timeout(function() { $scope.reset_error = null; }, 2000);
            }

        }else{
          $scope.reset_error = 'All fields are required';
          $timeout(function() { $scope.reset_error = null; }, 2000);
        }

      };

  }]); // ResetController end
}());
