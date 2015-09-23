angular.module('app.space').controller('SpaceDetailsCtrl', ['$rootScope', '$scope', '$routeParams', '$modal', '$log', 'spaceService', 'messageService', function($rootScope, $scope, $routeParams, $modal, $log, spaceService, messageService) {
  $rootScope.rootFields.showContent = false;
  
  $scope.name = '';
  $scope.organizationId = $routeParams.organizationId;
  $scope.id = $routeParams.spaceId;
  $scope.spaceId = $routeParams.spaceId;

  $scope.applications = [];
  $scope.nrOfApplications = 0;
  $scope.services = [];
  $scope.nrOfServices = 0;

  // service summary from api
  var getSpaceSummaryPromise = spaceService.getSpaceSummary($scope.spaceId);
  getSpaceSummaryPromise.then(function(response) {
    $scope.name = response.data.name;

    // populate applications
    if (response.data.apps && response.data.apps.length > 0) {
      $scope.nrOfApplications = response.data.apps.length;

      angular.forEach(response.data.apps, function(app, i) {
        var objectApp = {
          id: app.guid,
          status: (app.state === 'STARTED') ? 'running' : 'stopped',
          name: app.name,
          instances: app.instances,
          memory: app.memory,
          url: app.urls[0] // only the first url
        };

        $scope.applications.push(objectApp);
      });
    }

    // populate services
    if (response.data.services && response.data.services.length > 0) {
      $scope.nrOfServices = response.data.services.length;

      angular.forEach(response.data.services, function(service, i) {
        var objectService = {
          id: service.guid,
          name: service.name,
          servicePlan: service.service_plan.service.label + ', ' + service.service_plan.name,
          nrOfBoundApps: service.bound_app_count,
          dashboardUrl: service.dashboard_url
        };

        $log.error(objectService.name);

        $scope.services.push(objectService);
      });
    }
  }, function(err) {
    messageService.addMessage('danger', 'The space summary has not been loaded.');
    $log.error(err);
  });
  
  $scope.editSpace = function(id) {
    var space = {
      id: $scope.id,
      name: $scope.name
    };
    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceEdit.tpl.html',
      controller: 'SpaceEditCtrl',
      resolve: {
        space: function() {
          return space;
        }
      }
    });

    modalInstance.result.then(function(editedSpace) {
      console.log(editedSpace.name);
      $scope.name = editedSpace.name;
    });
  };
  
  // delete space
  $scope.deleteSpace = function (id) {
    var space = {
      id: $scope.id,
      name: $scope.name
    };
    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceDelete.tpl.html',
      controller: 'SpaceDeleteCtrl',
      resolve: {
        space: function() {
          return space;
        }
      }
    });
    
    modalInstance.result.then(function() {
      // adjust space table information
      window.location = '#/organizations/' + $scope.organizationId;
    });
    
  };
  
  $scope.editApplication = function(application) {

    application = {
      'id' : application.id,
      'name' : application.name
    };
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/application/applicationEdit.tpl.html',
      controller: 'ApplicationEditCtrl',
      resolve: {
        application: function() {
          return application;
        }
      }
    });

    modalInstance.result.then(function(editedApplication) {
      angular.forEach($scope.applications, function(app, i) {
        if(app.id === application.id){
          app.name = editedApplication.name;
        }
      });
      $scope.name = editedApplication.name;
    });
  };
  
  $scope.deleteApplication = function(application) {
    
    application = {
      'id' : application.id,
      'name' : application.name
    };
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/application/applicationDelete.tpl.html',
      controller: 'ApplicationDeleteCtrl',
      resolve: {
        application: function() {
          return application;
        }
      }
    });

    modalInstance.result.then(function() {
      // go to spaces overview
      window.location = '#/organizations/' + $scope.organizationId + '/spaces/' + $scope.id;
    });
  };

  // delete service instance
  $scope.deleteServiceInstance = function(serviceInstance) {
    var modalInstance = $modal.open({
      templateUrl: 'app/components/serviceInstance/serviceInstanceDelete.tpl.html',
      controller: 'ServiceInstanceDeleteCtrl',
      resolve: {
        serviceInstance: function() {
          return serviceInstance;
        }
      }
    });
    
    modalInstance.result.then(function() {
      // adjust service instance table information
      var indexOfServiceInstanceToRemove = $scope.services.indexOf(serviceInstance);
      $scope.services.splice(indexOfServiceInstanceToRemove, 1);
      $scope.nrOfServices -= 1;
    });
  };
}]);