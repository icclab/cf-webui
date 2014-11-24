angular.module('app.application').controller('ApplicationDetailsCtrl', ['$scope', '$routeParams', '$modal', 'applicationService', 'routeService', function($scope, $routeParams, $modal, applicationService, routeService) {
  
  $scope.summary = {};
  $scope.stack = {};
  $scope.environmentVariables = {};
  $scope.userEnvironmentVariables = {};
  $scope.systemEnvironmentVariables = '';
  
  $scope.name = '';
  $scope.organizationId = $routeParams.organizationId;
  $scope.spaceId = $routeParams.spaceId;
  $scope.applicationId = $routeParams.applicationId;
  $scope.stackId = 0;

  $scope.nrOfInstances = 0;
  $scope.nrOfServices = 0;
  $scope.nrOfRoutes = 0;
  $scope.nrOfUserEnvVars = 0;
  $scope.diskQuota = 0;
  $scope.memory = 0;
  $scope.lastPush = 0;
  
  $scope.buildPack = '';
  $scope.startCommand = '';
  $scope.packageState = '';
  
  $scope.services = [];
  $scope.serviceBindings = [];
  $scope.routes = [];
  $scope.domains = [];
  
  // app summary
  $scope.getApplicationSummary = function() {
    var getApplicationSummaryPromise = applicationService.getApplicationSummary($scope.applicationId);
    getApplicationSummaryPromise.then(function(response) {
      $scope.summary = response.data;
      
      $scope.stackId = response.data.stack_guid;
      $scope.name = response.data.name;
      $scope.nrOfInstances = response.data.instances;
      $scope.diskQuota = response.data.disk_quota;
      $scope.memory = response.data.memory;
      $scope.lastPush = response.data.package_updated_at;
      
      $scope.buildPack = response.data.buildPack;
      $scope.startCommand = response.data.detected_start_command;
      $scope.packageState = response.data.package_state;
      
      $scope.services = response.data.services;
      angular.forEach($scope.services, function(service, i) {
        service.isCollapsed = true;
      });
      $scope.nrOfServices = $scope.services.length;
      
      $scope.routes = response.data.routes;
      $scope.nrOfRoutes = $scope.routes.length;
      
      $scope.domains = response.data.available_domains;

      // get stack
      applicationService.getStack($scope.stackId).then(function(stackResponse) {
        $scope.stack = stackResponse.data;
      }, function(err) {
        messageService.addMessage('danger', 'Stack load failed: ' + err);
      });
      
      // get environment variables
      applicationService.getEnvironmentVariables($scope.applicationId).then(function(envVarResponse) {
        $scope.environmentVariables = envVarResponse.data;
        $scope.systemEnvironmentVariables = $scope.environmentVariables.system_env_json;
        angular.forEach(envVarResponse.data.environment_json, function(key, value) {
          $scope.nrOfUserEnvVars += 1;
        });
      }, function(err) {
        messageService.addMessage('danger', 'Could not load environment variables: ' + err);
      });

      // get service bindings and add to the service the credentials
      var getServiceBindingsPromise = applicationService.getServiceBindings($scope.applicationId);
      getServiceBindingsPromise.then(function(response) {
        angular.forEach(response.data.resources, function(serviceBinding, i) {

          var keepGoing = true;
          angular.forEach($scope.services, function(service, k) {
            if (keepGoing) {
              if (service.guid === serviceBinding.entity.service_instance_guid) {
                // pretty-printed json
                var credentials = serviceBinding.entity.credentials;
                credentials = JSON.stringify(credentials, null, '  ');

                service.serviceBindingId = serviceBinding.metadata.guid;
                service.credentials = credentials;
                keepGoing = false;
              }
            }
          });

        });
      }, function(err) {
        messageService.addMessage('danger', 'The service bindings have not been loaded: ' + err);
      });

    }, function(err) {
      messageService.addMessage('danger', 'The application summary has not been loaded: ' + err);
    });
  };
  $scope.getApplicationSummary();
  
  $scope.editApplication = function() {
    
    var application = {
      'id' : $scope.applicationId,
      'name' : $scope.name
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
      $scope.name = editedApplication.name;
    });
  };
  
  $scope.deleteApplication = function() {
    
    var application = {
      'id' : $scope.applicationId,
      'name' : $scope.name
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
      window.location = '#/organizations/' + $scope.organizationId + '/spaces/' + $scope.spaceId;
    });
  };
  
  $scope.unmapRoute = function(route) {
    
    // applicationID injection
    route.applicationID = $scope.applicationId;
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/route/routeUnmap.tpl.html',
      controller: 'RouteUnmapCtrl',
      resolve: {
        route: function() {
          return route;
        }
      }
    });

    modalInstance.result.then(function(unmappedRoute) {
      // adjust route table information
      var indexOfRouteToRemove = $scope.routes.indexOf(unmappedRoute);
      $scope.routes.splice(indexOfRouteToRemove, 1);
      $scope.nrOfRoutes -=1;
    });
  };

  $scope.addServiceBinding = function(alreadyBoundServices) {
    var config = {
      applicationId: $scope.applicationId,
      spaceId: $scope.spaceId,
      alreadyBoundServices: alreadyBoundServices
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/serviceBinding/serviceBindingAdd.tpl.html',
      controller: 'ServiceBindingAddCtrl',
      resolve: {
        config: function() {
          return config;
        }
      }
    });

    modalInstance.result.then(function(addedServiceBinding) {
      // reload page
      $scope.getApplicationSummary();
    });
  };

  $scope.deleteServiceBinding = function(service) {
    console.log(service);

    var modalInstance = $modal.open({
      templateUrl: 'app/components/serviceBinding/serviceBindingDelete.tpl.html',
      controller: 'ServiceBindingDeleteCtrl',
      resolve: {
        service: function() {
          return service;
        }
      }
    });

    modalInstance.result.then(function(deletedServiceBinding) {
      // reload page
      $scope.getApplicationSummary();
    });
  };
  
}]);