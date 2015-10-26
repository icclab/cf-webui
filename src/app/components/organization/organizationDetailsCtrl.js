angular.module('app.organization').controller('OrganizationDetailsCtrl', ['$route', '$rootScope', '$scope', '$routeParams', '$modal', '$log', 'organizationService', 'spaceService', function($route, $rootScope, $scope, $routeParams, $modal, $log, organizationService, spaceService) {
  $rootScope.rootFields.showContent = false;
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
  //$scope.allUsersForOrganization = [];

  $scope.currentUser = {
    name: sessionStorage.getItem('userName'),
    currentManager: false
  };

  // get particular organization
  organizationService.getOrganization($scope.id).then(function(response) {
    var data = response.data;
    $scope.name = data.entity.name;
    $scope.quotaDefID = data.entity.quota_definition_guid;
    
    // get organization quota
    organizationService.getQuotaForTheOrganization($scope.quotaDefID).then(function(response) {
      var data = response.data;
      
      angular.forEach(data.resources, function(organization, i) {
        if($scope.quotaDefID === organization.metadata.guid){
          $scope.organizationTotalQuota += organization.entity.memory_limit;
        }
      });
      
    }, function(err) {
      $log.error(err);
    });
  }, function (err) {
    $log.error(err);
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
        $scope.spaces.push(space.metadata.guid);

        spaceService.getSpaceSummary(space.metadata.guid).then(function(responseSpace) {
          var dataSpace = responseSpace.data;

          // calculate space memory and stopped or started apps
          var memory = 0;
          var nrOfStartedApps = 0;
          var nrOfStoppedApps = 0;
          angular.forEach(dataSpace.apps, function(application, i) {
            memory += application.memory * application.instances;

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

          //$scope.spaces.push(objectSpace);

          for (var j = 0; j < $scope.spaces.length; j++) {
            if ($scope.spaces[j] === objectSpace.id) {
              $scope.spaces[j]=objectSpace;
              break;
            }
          }
          
          $scope.spacesTotalQuota += memory;
          $scope.setOrganizationQuota();
        }, function(err) {
          $log.error(err);
        });
      });
    }, function(err) {
      $log.error(err);
    });
  };
  $scope.getSpacesForTheOrganization();
  
  // get organization sharedDomains
  organizationService.getSharedDomainsForTheOrganization($scope.id).then(function(response) {
    var data = response.data;
    $scope.nrOfDomains += 1;
    $scope.sharedDomains = (data.resources);
  }, function(err) {
    $log.error(err);
  });
  
  // get organization privateDomains
  organizationService.getPrivateDomainsForTheOrganization($scope.id).then(function(response) {
    var data = response.data;
    $scope.nrOfDomains += data.total_results;
    $scope.privateDomains = data.resources;
  }, function(err) {
    $log.error(err);
  });

  $scope.retrieveRolesOfAllUsersForTheOrganization = function() {
    // clear spaces array on reload
    if ($scope.users.length > 0) {
      $scope.users.length = 0;
    }

    organizationService.retrieveRolesOfAllUsersForTheOrganization($scope.id).then(function(response){
      var data = response.data;
      $scope.nrOfOrganizationUsers = data.total_results;
      var userRoles = [];

      angular.forEach(data.resources, function(user, key) {

          var orgManager = false;
          var orgAuditor = false;
          var billingManager = false;

          angular.forEach(user.entity.organization_roles, function(userRole, key) {        

            if (userRole === 'org_manager'){
              orgManager = true;
            }
            if (userRole === 'org_auditor'){
              orgAuditor = true;
            }
            if (userRole === 'billing_manager'){
              billingManager = true;
            }

            var objectRole = {
              role: userRole
            };

            userRoles.push(objectRole);

          });

          var objectUser = {
            id: user.metadata.guid,
            name: user.entity.username,
            userRoles: userRoles,
            orgManager: orgManager,
            orgAuditor: orgAuditor,
            billingManager: billingManager,
            currentUser: $scope.currentUser.name === user.entity.username
          };
          $scope.users.push(objectUser);

          if ($scope.currentUser.name === user.entity.username){
            $scope.currentUser.currentManager = orgManager;
          }

      });
    }, function(err) {
    $log.error(err);
    });

  };
  $scope.retrieveRolesOfAllUsersForTheOrganization();

  
  
  // get all users for the organization
  /*organizationService.getAllUsersForTheOrganization($scope.id).then(function(response) {
     
    var data = response.data;
    $scope.nrOfOrganizationUsers = data.total_results;
    $scope.allUsersForOrganization = data.resources;
    
    
    // get summary for each user
    angular.forEach(data.resources, function(user, key) {
      
        var objectUser = {
          id: user.metadata.guid,
          name: user.entity.username,
        };



        $scope.users.push(objectUser);

    });
    
  }, function(err) {
    $log.error(err);
  });*/
  
  $scope.setOrganizationQuota = function() {
    if ($scope.organizationTotalQuota > 0) {
      $scope.usedQuotaPercent = (($scope.spacesTotalQuota / $scope.organizationTotalQuota)*100);
    }
  };

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
      'name' : $scope.name,
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
  
  $scope.deleteOrganization = function() {
    
    var organization = {
      'id' : $scope.id,
      'name' : $scope.name,
      'quota_definition_guid' : $scope.quotaDefID
    };
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationDelete.tpl.html',
      controller: 'OrganizationDeleteCtrl',
      resolve: {
        organization: function() {
          return organization;
        }
      }
    });
    
    modalInstance.result.then(function(response) {
      // redirect to organizations overview
      window.location = "../#/organizations";
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
      //$route.reload();
      $scope.getSpacesForTheOrganization();
      //$scope.organizations.spaces=$scope.spaces;
      
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
    
    modalInstance.result.then(function(newDomainResponseObject) {
      // adjust domain table information
      $scope.nrOfDomains += 1;
      $scope.privateDomains.push(newDomainResponseObject);
    });

  };
  
  // delete domain
  $scope.deleteDomain = function (domain) {
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/domain/domainDelete.tpl.html',
      controller: 'DomainDeleteCtrl',
      resolve: {
        domain: function() {
          return domain;
        }
      }
    });
    
    modalInstance.result.then(function() {
      // adjust domain table information
      var indexOfDomainToRemove = $scope.privateDomains.indexOf(domain);
      $scope.privateDomains.splice(indexOfDomainToRemove, 1);
      $scope.nrOfDomains -=1;
    });
    
  };
  
  // delete space
  $scope.deleteSpace = function (space) {
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceDelete.tpl.html',
      controller: 'SpaceDeleteCtrl',
      resolve: {
        space: function() {
          return space;
        }
      }
    });
    
    modalInstance.result.then(function() {
      // adjust space table information
      var indexOfSpaceToRemove = $scope.spaces.indexOf(space);
      $scope.spaces.splice(indexOfSpaceToRemove, 1);
      $scope.nrOfSpaces -=1;
    });
    
  };

  $scope.addUser = function() {

    /*var user = {
      'organizationId': $scope.id
    };*/

    var spaces = $scope.spaces;

    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationAssociateUser.tpl.html',
      controller: 'OrganizationAssociateUserCtrl',
      resolve: {
        spaces: function() {
          return spaces;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheOrganization();
    });

  };

  $scope.disassociateUser = function(userId) {

    var user = {
      'organizationId': $scope.id,
      'userId': userId
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationDeleteUser.tpl.html',
      controller: 'OrganizationDeleteUserCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheOrganization();
    });

  };

  $scope.addManager = function(username) {

    var user = {
      'organizationId': $scope.id,
      'name': username
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationAddManager.tpl.html',
      controller: 'OrganizationAddManagerCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheOrganization();
    });

  };

  $scope.deleteManager = function(userId) {

    var user = {
      'organizationId': $scope.id,
      'userId': userId
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationDeleteManager.tpl.html',
      controller: 'OrganizationDeleteManagerCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheOrganization();
    });

  };

  $scope.addBillingManager = function(username) {

    var user = {
      'organizationId': $scope.id,
      'name': username
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationAddBillingManager.tpl.html',
      controller: 'OrganizationAddBillingManagerCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheOrganization();
    });

  };

  $scope.deleteBillingManager = function(userId) {

    var user = {
      'organizationId': $scope.id,
      'userId': userId
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationDeleteBillingManager.tpl.html',
      controller: 'OrganizationDeleteBillingManagerCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheOrganization();
    });

  };

  $scope.addAuditor = function(username) {

    var user = {
      'organizationId': $scope.id,
      'name': username
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationAddAuditor.tpl.html',
      controller: 'OrganizationAddAuditorCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheOrganization();
    });

  };

  $scope.deleteAuditor = function(userId) {

    var user = {
      'organizationId': $scope.id,
      'userId': userId
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationDeleteAuditor.tpl.html',
      controller: 'OrganizationDeleteAuditorCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheOrganization();
    });

  };
  
  // delete user
  $scope.deleteUser = function (user) {
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/user/userDelete.tpl.html',
      controller: 'UserDeleteCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    
    modalInstance.result.then(function() {
      // adjust user table information
      var indexOfUserToRemove = $scope.users.indexOf(user);
      $scope.users.splice(indexOfUserToRemove, 1);
      $scope.nrOfOrganizationUsers -=1;
    });
    
  };
  
}]);