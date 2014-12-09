angular.module('app.breadcrumb').controller('BreadcrumbCtrl', ['$rootScope', '$scope', '$location', 'organizationService', 'spaceService', 'applicationService', function ($rootScope, $scope, $location, organizationService, spaceService, applicationService) {
  $rootScope.rootFields.showContent = false;
  
  $scope.elements = [];
  
  var organizationPath = '';
  var spacePath = '';

  // get all spaces
  var getSpacesPromise = spaceService.getSpaces();
  
  // get all applications
  var getApplicationsPromise = applicationService.getApplications();

  // get all organizations
  organizationService.getOrganizations().then(function(response) {
    $scope.elements.push(
      {
        link: '#/',
        name: 'Home'
      }
    );
    
    var data = response.data;

    // create organization objects
    angular.forEach(data.resources, function(organization, i) {
      if ($location.path().indexOf('/organizations/' + organization.metadata.guid) > -1) {
        var objectOrganization = {
          link: '#/organizations/' + organization.metadata.guid,
          name: organization.entity.name
        };
  
        $scope.elements.push(objectOrganization);
        organizationPath = '/organizations/' + organization.metadata.guid;
      }
    });

    // push the space to the breadcrumb
    getSpacesPromise.then(function(response) {
      data = response.data;

      angular.forEach(data.resources, function(space, i) {
        if ($location.path().indexOf(organizationPath + '/spaces/' + space.metadata.guid) > -1) {
          var objectSpace = {
            link: '#' + organizationPath + '/spaces/' + space.metadata.guid,
            name: space.entity.name
          };
          
          $scope.elements.push(objectSpace);
          spacePath = organizationPath + '/spaces/' + space.metadata.guid;
        }
      });
      
      // push the application to the breadcrumb
      getApplicationsPromise.then(function(response) {
        data = response.data;

        angular.forEach(data.resources, function(application, i) {          
          if ($location.path().indexOf(spacePath + '/applications/' + application.metadata.guid) > -1) {
            var objectApplication = {
              link: '#' + spacePath + '/applications/' + application.metadata.guid,
              name: application.entity.name
            };
            
            $scope.elements.push(objectApplication);
          }
        });
      });
    }, function (err) {
      // TODO: error handling
    });
  }, function (err) {
    // TODO: error handling
  }); 
  
}]);