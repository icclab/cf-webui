angular.module('app.sidebar').controller('SidebarCtrl', ['$rootScope', '$scope', '$location', 'organizationService', 'spaceService', function ($rootScope, $scope, $location, organizationService, spaceService) {
  $rootScope.rootFields.showContent = false;
  
  $scope.organizations = [];

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

      $scope.organizations.push(objectOrganization);
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

        for (var j = 0; j < $scope.organizations.length; j++) {
          if ($scope.organizations[j].id === objectSpace.organizationId) {
            $scope.organizations[j].spaces.push(objectSpace);
            break;
          }
        }
      });
    }, function (err) {
      // TODO: error handling
    });
  }, function (err) {
    // TODO: error handling
  });
  
  $scope.isActive = function(path) {
    return ($location.path().indexOf(path) > -1);
  };
  
}]);