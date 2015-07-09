(function() {
  'use strict';

  angular
    .module('app')
    .config(config)

  config.$inject = ['$routeProvider','$locationProvider','$resourceProvider'];

  function config($routeProvider,$locationProvider,$resourceProvider) {
    $routeProvider

      .when('/', {
        templateUrl: '/js/app/home/home.html',
        controller: 'HomeController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser();
          },
        }
      })
      .when('/add', {
        templateUrl: '/js/app/add/add.html',
        controller: 'AddController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser({ error_location: '/login'});
          }
        }
      })
      .when('/login', {
        templateUrl: '/js/app/login/login.html',
        controller: 'LoginController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser({ success_location: '/settings'});
          }
        }
      })
      .when('/settings', {
        templateUrl: '/js/app/settings/settings.html',
        controller: 'SettingsController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser({ error_location: '/login'});
          }
        }
      })
      .when('/recover/:token', {
        templateUrl: '/js/app/recover/recover.html',
        controller: 'RecoverController'
      });
  }

}());
