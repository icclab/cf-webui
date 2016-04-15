angular.module('app.sidebar').controller('SidebarCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$log', 'organizationService', 'spaceService', function ($rootScope, $scope, $routeParams, $location, $log, organizationService, spaceService) {
  $rootScope.rootFields.showContent = false;
  
  $scope.organizationsSidebar = [];
  
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

      $scope.organizationsSidebar.push(objectOrganization);
    });

    // push the space objects to the organizations
    spaceService.getSpaces().then(function(response) {
      var data = response.data;

      // create space objects
      angular.forEach(data.resources, function(space, i) {
        var objectSpace = {
          id: space.metadata.guid,
          organizationId: space.entity.organization_guid,
          name: space.entity.name
        };

        for (var j = 0; j < $scope.organizationsSidebar.length; j++) {
          if ($scope.organizationsSidebar[j].id === objectSpace.organizationId) {
            $scope.organizationsSidebar[j].spaces.push(objectSpace);
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
    //console.log($scope);
    for (var j = 0; j < $scope.organizationsSidebar.length; j++) {
      if ($scope.organizationsSidebar[j].id === $routeParams.organizationId) {
        $rootScope.orgIdx = j;
        for (var i = 0; i < $scope.organizationsSidebar[j].spaces.length; i++) {
          if ($scope.organizationsSidebar[j].spaces[i].id === $routeParams.spaceId) {
            $rootScope.spaceIdx = i;
            break;
          }
        }
        break;
      }
    }
    //console.log($location.path().indexOf(path) > -1);
    return ($location.path().indexOf(path) > -1);
  };
  
}]);