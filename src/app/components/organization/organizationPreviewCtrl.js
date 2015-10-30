angular.module('app.organization').controller('OrganizationPreviewCtrl', ['$rootScope', '$scope', '$modal', '$log', 'organizationService', 'featureFlagService', function($rootScope, $scope, $modal, $log, organizationService, featureFlagService) {
  $rootScope.rootFields.showContent = false;
  
  // organization info
  $scope.showContent = false;
  $scope.showOrgCreation = false;
  $scope.organizations = [];
  $scope.nrOfOrganizations = 0;

  organizationService.getOrganizations().then(function(response) {
    var data = response.data;
    $scope.nrOfOrganizations = data.total_results;

    // create organization objects
    angular.forEach(data.resources, function(organization, i) {
      
      var objectOrganization = {
        id: organization.metadata.guid,
        quota_definition_guid: organization.entity.quota_definition_guid,
        name: organization.entity.name,
        status: organization.entity.status
      };

      $scope.organizations.push(objectOrganization);
    });
  }, function (err) {
    $log.error(err);
  });

  featureFlagService.getUserOrgCreationFeatureFlag().then(function(response) {
    $scope.showOrgCreation = response.data.enabled;
  }, function(err) {
    $log.error(err);
  });
  
  $scope.addOrganization = function() {
    
    var organization = { };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/organization/organizationAdd.tpl.html',
      controller: 'OrganizationAddCtrl',
      resolve: {
        organization: function() {
          return organization;
        }
      }
    });

    modalInstance.result.then(function(addedOrganization) {
      
      if(addedOrganization !== undefined){
        
        var createdOrganization = {
          id: addedOrganization.data.resources.metadata.guid,
          quota_definition_guid: addedOrganization.data.resources.entity.quota_definition_guid,
          name: addedOrganization.data.resources.entity.name,
          status: addedOrganization.data.resources.entity.status
        };
        
        $scope.organizations.push(createdOrganization);
      }
      
    });
  };

  $scope.showOrg = function(orgId) {
    window.location = '#/organizations/' + orgId;
  };
  
  $scope.editOrganization = function(org) {
    
    var organization = {
      'id' : org.id,
      'name' : org.name,
      'quota_definition_guid' : org.quota_definition_guid
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
      var orgIdx = $scope.organizations.indexOf(org);
      $scope.organizations[orgIdx].name = editedOrganization.name;
    });
  };
  
  $scope.deleteOrganization = function(org) {
    
    var organization = {
      'id' : org.id,
      'name' : org.name,
      'quota_definition_guid' : org.quota_definition_guid
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
  
}]);