angular.module('app.organization').controller('OrganizationDetailsCtrl', ['$scope', '$routeParams', '$modal', 'organizationService', 'spaceService', 'userService', 'domainService', function($scope, $routeParams, $modal, organizationService, spaceService, userService, domainService) {
  $scope.name = '';
  $scope.id = $routeParams.organizationId;
  
  // organizations
  $scope.quotaDefID = 0;
  $scope.organizationTotalQuota = 0;
  $scope.usedQuotaPercent = 0.0;

  // space info
  $scope.spaces = [];
  $scope.nrOfSpaces = 0;
  $scope.spacesTotalQuota = 0;
  
  // domain info
  $scope.sharedDomains = [];
  $scope.privateDomains = [];
  $scope.nrOfDomains = 0;
  
  // users
  $scope.users = [];
  $scope.nrOfOrganizationUsers = 0;
  $scope.allUsersForOrganization = [];

  // get particular organization
  organizationService.getOrganization($scope.id).then(function(response) {
    var data = response.data;
    $scope.name = data.entity.name;
    $scope.quotaDefID = data.entity.quota_definition_guid;
  }, function (err) {
    console.log('Error: ' + err);
  });

  // get spaces for the organization
  $scope.getSpacesForTheOrganization = function() {
    // clear spaces array on reload
    if ($scope.spaces.length > 0) {
      $scope.spaces.length = 0;
    }

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
            $scope.spacesTotalQuota += memory;

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
  };
  $scope.getSpacesForTheOrganization();
  
  // get organization quota
  organizationService.getQuotaForTheOrganization($scope.quotaDefID).then(function(response) {
    var data = response.data;
    
    angular.forEach(data.resources, function(organization, i) {
      if($scope.quotaDefID === organization.metadata.guid){
        $scope.organizationTotalQuota += organization.entity.memory_limit;
      }
    });
    
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
  
  // get all users for the organization
  organizationService.getAllUsersForTheOrganization($scope.id).then(function(response) {
     
    var data = response.data;
    $scope.nrOfOrganizationUsers = data.total_results;
    $scope.allUsersForOrganization = data.resources;
    
    
    // get summary for each user
    angular.forEach(data.resources, function(user, key) {
      
      userService.getUserSummary(user.metadata.guid).then(function(responseUser) {
        // ... not authorized
      }, function(err) {
        console.log('Error: ' + err);
      });
    });
    
  }, function(err) {
    console.log('Error: ' + err);
  });

  $scope.open = function(space) {
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
      $scope.editedSpace = editedSpace;
    });
  };
  
  $scope.editOrganization = function() {
    
    var organization = {
      'id' : $scope.id,
      'name' : name,
      'quota_definition_guid' : $scope.quotaDefID
    };
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationEdit.tpl.html',
      controller: 'OrganizationEditCtrl',
      resolve: {
        organization: function() {
          return organization;
        }
      }
    });

    modalInstance.result.then(function(editedOrganization) {
      $scope.name = editedOrganization.name;
    });

  };

  // add space
  $scope.addSpace = function() {
    var space = {
      'organizationId': $scope.id
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceAdd.tpl.html',
      controller: 'SpaceAddCtrl',
      resolve: {
        space: function() {
          return space;
        }
      }
    });

    modalInstance.result.then(function() {
      // reload the spaces table
      $scope.getSpacesForTheOrganization();
    });
  };
  
  // new domain
  $scope.newDomain = function() {
    var domain = {
      'organizationID' : $scope.id
    };
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/domain/domainAdd.tpl.html',
      controller: 'DomainAddCtrl',
      resolve: {
        domain: function() {
          return domain;
        }
      }
    });

  };
  
  // delete Organization
  $scope.deleteDomain = function (domain) {
    
    domainService.deleteDomain(domain).then(function(response) {
      var indexOfDomainToRemove = $scope.privateDomains.indexOf(domain);
      $scope.privateDomains.splice(indexOfDomainToRemove, 1);
    }, function(err) {
      console.log('Error: ' + err);
    });
    
  };
  
}]);