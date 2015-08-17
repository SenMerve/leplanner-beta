(function() {
  'use strict';

  angular
    .module('app')
    .factory('scenarioService', scenarioServiceFactory);

  scenarioServiceFactory.$inject = ['$http'];

  function scenarioServiceFactory($http) {
    return {
      addComment: addComment,
      addRemoveFavorite: addRemoveFavorite,
      createScenario: createScenario,
      deleteComment: deleteComment,
      getComments: getComments,
      getDashScenarios: getDashScenarios,
      getEditDataSingleScenario: getEditDataSingleScenario,
      getSingleScenario: getSingleScenario,
      getUserScenarios: getUserScenarios,
      getWidgetScenarios: getWidgetScenarios,
      saveScenario: saveScenario,
      searchScenarios: searchScenarios
    };

    function addComment(params) {
      return $http.post('/api/scenario/add-comment',params)
        .then(function(response) {
          return response.data;
        });
    }

    function addRemoveFavorite(params) {
      return $http.post('/api/scenario/add-remove-favorite',params)
        .then(function(response) {
          return response.data;
        });
    }

    function createScenario(params) {
      return $http.post('/api/scenario/create',params)
        .then(function(response) {
          return response.data;
        });
    }

    function deleteComment(params) {
      return $http.post('/api/scenario/delete-comment',params)
        .then(function(response) {
          return response.data;
        });
    }

    function getComments(params) {
      return $http.post('/api/scenario/comments',params)
        .then(function(response) {
          return response.data;
        });
    }

    function getDashScenarios(query) {
      return $http.post('/api/scenario/scenarios-dash-list',query)
        .then(function(response) {
          return response.data;
        });
    }

    function getEditDataSingleScenario(query) {
      return $http.post('/api/scenario/get-edit-data-single-scenario',query)
        .then(function(response) {
          return response.data;
        });
    }

    function getSingleScenario(params) {
      return $http.post('/api/scenario/single-scenario',params)
        .then(function(response) {
          return response.data;
        });
    }

    function getUserScenarios(query) {
      return $http.post('/api/scenario/list',query)
        .then(function(response) {
          return response.data;
        });
    }

    function getWidgetScenarios(query) {
      return $http.post('/api/scenario/widget-list',query)
        .then(function(response) {
          return response.data;
        });
    }

    function saveScenario(params) {
      return $http.post('/api/scenario/save',params)
        .then(function(response) {
          return response.data;
        });
    }

    function searchScenarios(query) {
      return $http.post('/api/scenario/search',query)
        .then(function(response) {
          return response.data;
        });
    }

  }
}());
