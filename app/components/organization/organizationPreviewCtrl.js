angular.module('app.organization').controller('OrganizationPreviewCtrl', ['$scope', 'organizationService', function($scope, organizationService) {
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
    // TODO: error handling
  });
}]);