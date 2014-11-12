var organization = angular.module('organization', []);

organization.controller('OrganizationPreviewCtrl', ['$scope', 'organizationService', function($scope, organizationService) {
  // organization info
  $scope.organizations = [];
  $scope.nrOfOrganizations = 0;

  organizationService.getOrganizations().then(function(response) {
    var data = response.data;
    $scope.nrOfOrganizations = data.total_results;

    // create organization objects
    angular.forEach(data.resources, function(organization, i) {
      var objectOrganization = {
        id: organization.metadata.guid,
        name: organization.entity.name,
        status: organization.entity.status
      };

      $scope.organizations.push(objectOrganization);
    });
  }, function (err) {
    console.log('Error: ' + err);
  });
}]);

organization.controller('OrganizationDetailsCtrl', ['$scope', '$routeParams', '$modal', 'organizationService', 'spaceService', function($scope, $routeParams, $modal, organizationService, spaceService) {
  $scope.name = '';
  $scope.id = $routeParams.organizationId;

  // space info
  $scope.spaces = [];
  $scope.nrOfSpaces = 0;
  
  // domain info
  $scope.sharedDomains = [];
  $scope.privateDomains = [];
  $scope.nrOfDomains = 0;

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
  
  // get organization quota
  organizationService.getQuotaForTheOrganization($scope.id).then(function(response) {
    var data = response.data;
    
    
  }, function(err) {
    console.log('Error: ' + err);
  });
  
  // get organization sharedDomains
  organizationService.getSharedDomainsForTheOrganization($scope.id).then(function(response) {
    var data = response.data;
    $scope.nrOfDomains += 1;
    $scope.sharedDomains = (data.resources);
  }, function(err) {
    console.log('Error: ' + err);
  });
  
  // get organization privateDomains
  organizationService.getPrivateDomainsForTheOrganization($scope.id).then(function(response) {
    var data = response.data;
    $scope.nrOfDomains += data.total_results;
    $scope.privateDomains = data.resources;
  }, function(err) {
    console.log('Error: ' + err);
  });
  
  // get organization members
  organizationService.getMembersForTheOrganization($scope.id).then(function(response) {
    
  }, function(err) {
    console.log('Error: ' + err);
  });

  $scope.open = function (space) {

    var modalInstance = $modal.open({
      templateUrl: 'app/space/spaceEdit.tpl.html',
      controller: 'SpaceEditCtrl',
      resolve: {
        space: function () {
          return space;
        }
      }
    });

    modalInstance.result.then(function (editedSpace) {
      $scope.editedSpace = editedSpace;
    });
  };
}]);