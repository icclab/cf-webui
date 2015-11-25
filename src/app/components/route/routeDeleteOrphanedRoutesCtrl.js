angular.module('app.routes').controller('RouteDeleteOrphanedRoutesCtrl', ['$q', '$scope', '$modalInstance', '$log', 'routes', 'routeService', 'messageService', function($q, $scope, $modalInstance, $log, routes, routeService, messageService) {
  
  $scope.routes = routes;
  $scope.orphanedRoutes = [];

  angular.forEach(routes, function(route, key){
    if (route.apps.length===0) $scope.orphanedRoutes.push(route);
  });

  $scope.ok = function () {
    $scope.deleteOrphanedRoutes().then(function(response) {
      messageService.addMessage('success', 'The routes have been successfully deleted.');
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The routes have not been deleted.');
      $log.error(err);
      $modalInstance.dismiss('cancel');
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.deleteOrphanedRoutes = function () {

    var promises = [];

    angular.forEach($scope.orphanedRoutes, function(orphanedRoute, key){
      promises.push(routeService.deleteRoute(orphanedRoute.id));
    });

    return $q.all(promises);
  };

}]);