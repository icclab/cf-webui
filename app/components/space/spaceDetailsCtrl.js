angular.module('app.space').controller('SpaceDetailsCtrl', ['$scope', '$routeParams', '$modal', 'spaceService', 'messageService', function($scope, $routeParams, $modal, spaceService, messageService) {
  $scope.name = '';
  $scope.organizationId = $routeParams.organizationId;
  $scope.id = $routeParams.spaceId;
  $scope.spaceId = $routeParams.spaceId;

  $scope.applications = [];
  $scope.nrOfApplications = 0;
  $scope.services = [];
  $scope.nrOfServices = 0;

  // service summary from api
  var getSpaceSummaryPromise = spaceService.getSpaceSummary($scope.id);
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

        $scope.services.push(objectService);
      });
    }
  }, function(err) {
    messageService.addMessage('danger', 'The space summary has not been loaded: ' + err);
  });




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