angular.module('app.sidebar').controller('SidebarCtrl', ['$rootScope', '$routeParams', '$scope', '$location', '$log', 'organizationService', 'spaceService', function ($rootScope, $routeParams, $scope, $location, $log, organizationService, spaceService) {
  $rootScope.rootFields.showContent = false;
  
  $rootScope.organizations = [];
  $rootScope.orgIdx = -1;

  // get all spaces
  var getSpacesPromise = spaceService.getSpaces();

  // get all organizations
  organizationService.getOrganizations().then(function(response) {
    var data = response.data;

    // create organization objects
    angular.forEach(data.resources, function(organization, i) {
      var objectOrganization = {
        id: organization.metadata.guid,
        name: organization.entity.name,
        spaces: []
      };

      $rootScope.organizations.push(objectOrganization);
    });

    // push the space objects to the organizations
    getSpacesPromise.then(function(response) {
      var data = response.data;

      // create space objects
      angular.forEach(data.resources, function(space, i) {
        var objectSpace = {
          id: space.metadata.guid,
          organizationId: space.entity.organization_guid,
          name: space.entity.name
        };

        for (var j = 0; j < $rootScope.organizations.length; j++) {
          if ($rootScope.organizations[j].id === objectSpace.organizationId) {
            $rootScope.organizations[j].spaces.push(objectSpace);
            break;
          }
        }
      });
    }, function (err) {
      $log.error(err);
    });
  }, function (err) {
    $log.error(err);
  });
  
  $scope.isActive = function(path) {
    for (var j = 0; j < $rootScope.organizations.length; j++) {
      if ($rootScope.organizations[j].id === $routeParams.organizationId) {
        $rootScope.orgIdx = j;
        break;
      }
    }
    return ($location.path().indexOf(path) > -1);
  };
  
}]);