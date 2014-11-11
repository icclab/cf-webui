var organization = angular.module('organization', []);

organization.controller('OrganizationPreviewCtrl', ['$scope', 'organizationService', function($scope, organizationService) {
  // organization info
  $scope.organizations = [];
  $scope.nrOfOrganizations = 0;

  organizationService.getOrganizations().then(function(response) {
    var data = response.data;
    $scope.organizations = data.resources;
    $scope.nrOfOrganizations = data.total_results;
  }, function (err) {
    console.log('Error: ' + err);
  });
}]);

organization.controller('OrganizationDetailsCtrl', ['$scope', '$routeParams', 'organizationService', 'spaceService', function($scope, $routeParams, organizationService, spaceService) {
  $scope.name = '';
  $scope.id = $routeParams.organizationId;

  // space info
  $scope.spaces = [];
  $scope.nrOfSpaces = 0;

  // get particular organization
  organizationService.getOrganization($scope.id).then(function(response) {
    var data = response.data;
    $scope.name = data.entity.name;
  }, function (err) {
    console.log('Error: ' + err);
  });

  // get spaces for the organization
  organizationService.getSpacesForTheOrganization($scope.id).then(function(response) {
    var data = response.data;
    $scope.nrOfSpaces = data.total_results;

    // get summary for each space
    angular.forEach(data.resources, function(space, key) {
      spaceService.getSpaceSummary(space.metadata.guid).then(function(responseSpace) {
        var dataSpace = responseSpace.data;

        // calculate space memory and stopped or started apps
        var memory = 0;
        var nrOfStartedApps = 0;
        var nrOfStoppedApps = 0;
        angular.forEach(dataSpace.apps, function(application, i) {
          memory += application.memory;

          // started apps
          if (application.state === 'STARTED') {
            nrOfStartedApps++;
          }

          // stopped apps
          if (application.state === 'STOPPED') {
            nrOfStoppedApps++;
          }
        });

        var objectSpace = {
          id: dataSpace.guid,
          name: dataSpace.name,
          memory: memory,
          nrOfStartedApps: nrOfStartedApps,
          nrOfStoppedApps: nrOfStoppedApps,
          nrOfServices: dataSpace.services.length
        };

        $scope.spaces.push(objectSpace);
      }, function(err) {
        console.log('Error: ' + err);
      });
    });
  }, function(err) {
    console.log('Error: ' + err);
  });  
}]);