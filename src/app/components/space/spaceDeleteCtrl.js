angular.module('app.space').controller('SpaceDeleteCtrl', ['$q', '$route', '$scope', '$modalInstance', '$log', 'space', 'spaceService', 'applicationService', 'serviceBindingService', 'serviceInstanceService', 'routeService', 'messageService', function($q, $route, $scope, $modalInstance, $log, space, spaceService, applicationService, serviceBindingService, serviceInstanceService, routeService, messageService) {

  $scope.space = space;


  $scope.ok = function () {
    $scope.emptySpace().then(function(response){
      spaceService.deleteSpace($scope.space).then(function(response) {
        messageService.addMessage('success', 'The space has been successfully deleted.', true);
        $modalInstance.close($scope.space);
      }, function(err) {
        messageService.addMessage('danger', 'The space has not been deleted.', true);
        $log.error(err.data.description);
        $modalInstance.close($scope.space);
      });
    });
    
  };

  $scope.deleteServiceBindings = function (app) {
    var deferred = $q.defer();
    applicationService.getServiceBindings(app.metadata.guid).then(function(responseServiceBinding){
      if (responseServiceBinding.data.total_results ===0) deferred.resolve(0);
      angular.forEach(responseServiceBinding.data.resources, function(serviceBinding, i) {
        serviceBindingService.deleteServiceBinding(serviceBinding.metadata.guid).then(function(response) { 
          if ((i+1)===responseServiceBinding.data.total_results) deferred.resolve(response);
        });
      });
    });
    return deferred.promise;
  };

  $scope.deleteApplications = function () {
    var deferred = $q.defer();
    spaceService.getApplicationsForTheSpace($scope.space.id).then(function(responseApp){
      if (responseApp.data.total_results ===0) deferred.resolve(0);
      angular.forEach(responseApp.data.resources, function(app, i) {
        $scope.deleteServiceBindings(app).then(function(promise){
          applicationService.deleteApplication(app.metadata.guid).then(function(response) {
            if ((i+1)===responseApp.data.total_results) deferred.resolve(response);
          });
        });
      });
    }); 
    return deferred.promise;
  };

  $scope.deleteServiceInstances = function () {
    var deferred = $q.defer();
    spaceService.getServicesInstancesForTheSpace($scope.space.id).then(function(responseServiceInstance){
      if (responseServiceInstance.data.total_results ===0) deferred.resolve(0);
      angular.forEach(responseServiceInstance.data.resources, function(serviceInstance, i) {
        serviceInstanceService.deleteServiceInstance(serviceInstance.metadata.guid).then(function(response) {
          if ((i+1)===responseServiceInstance.data.total_results) deferred.resolve(response);
        });
      });
    });
    return deferred.promise;
  };

  $scope.deleteRoutes = function () {
    var deferred = $q.defer();
    routeService.getRoutesForTheSpace($scope.space.id).then(function(responseRoute){
      if (responseRoute.data.total_results === 0) deferred.resolve(0);
      angular.forEach(responseRoute.data.resources, function(route, i) {
        routeService.deleteRoute(route.metadata.guid).then(function(response) {
          if ((i+1)===responseRoute.data.total_results) deferred.resolve(response);
        });
      });
    });
    return deferred.promise;
  };

  $scope.emptySpace = function () {
    var deferred = $q.defer();
    $scope.deleteApplications().then(function(responseApplication){
      $scope.deleteServiceInstances().then(function(responseServiceInstance){
        $scope.deleteRoutes().then(function(responseRoute){
          deferred.resolve(responseRoute);
        }, function(err){
          $log.error(err.data.description);
          deferred.reject(err);
        });
      }, function(err){
        $log.error(err.data.description);
        deferred.reject(err);
      });
    }, function(err){
      $log.error(err.data.description);
      deferred.reject(err);
    });
    return deferred.promise;
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);