angular.module('app.breadcrumb').controller('BreadcrumbCtrl', ['$rootScope', '$scope', '$location', '$log', 'organizationService', 'spaceService', 'applicationService', 'serviceService', function ($rootScope, $scope, $location, $log, organizationService, spaceService, applicationService, serviceService) {
  $rootScope.rootFields.showContent = false;
  
  $scope.elements = [];
  
  var organizationPath = '';
  var spacePath = '';
  var servicePath = '';

  // get all spaces
  var getSpacesPromise = spaceService.getSpaces();
  
  // get all applications
  var getApplicationsPromise = applicationService.getApplications();

  // get all services
  var getServicesPromise = serviceService.getServices();

  // get all plans for the services
  var getServicePlansPromise = serviceService.getServicePlans();


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
      $log.error(err);
    });

    

    // push the services to the breadcrumb
    getServicesPromise.then(function(response) {
      data = response.data;
      // push the marketplace to the breadcrumb
      if ($location.path().indexOf('/marketplace') > -1) {
        var objectOrganization = {
          link: '#/marketplace',
          name: 'Marketplace'
        };

        $scope.elements.push(objectOrganization);
      }

      angular.forEach(data.resources, function(service, i) {
        var extraData = JSON.parse(service.entity.extra);
        if ($location.path().indexOf(spacePath + '/marketplace/' + service.metadata.guid) > -1) {
          var objectService = {
            link: '#/marketplace/' + service.metadata.guid,
            name: (extraData && extraData.displayName) ? extraData.displayName : service.entity.label
          };
          
          $scope.elements.push(objectService);
          servicePath = '/marketplace/' + service.metadata.guid;
        }
      });

      // push the service plans to the breadcrumb
      getServicePlansPromise.then(function(response) {
        data = response.data;

        angular.forEach(data.resources, function(servicePlan, i) {
          if ($location.path().indexOf(servicePath + '/plan/' + servicePlan.metadata.guid) > -1) {
            var objectServicePlan = {
              link: '#' + servicePath + '/plan/' + servicePlan.metadata.guid,
              name: servicePlan.entity.name
            };
            
            $scope.elements.push(objectServicePlan);
          }
        });
      });

    });

  }, function (err) {
    $log.error(err);
  });
  
}]);