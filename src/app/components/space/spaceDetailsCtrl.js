angular.module('app.space').controller('SpaceDetailsCtrl', ['$rootScope', '$scope', '$routeParams', '$modal', '$log', 'applicationService', 'spaceService', 'organizationService', 'routeService', 'messageService', function($rootScope, $scope, $routeParams, $modal, $log, applicationService, spaceService, organizationService, routeService, messageService) {
  $rootScope.rootFields.showContent = false;
  
  $scope.name = '';
  $scope.organizationId = $routeParams.organizationId;
  $scope.id = $routeParams.spaceId;
  $scope.spaceId = $routeParams.spaceId;

  $scope.applications = [];
  $scope.nrOfApplications = 0;
  $scope.services = [];
  $scope.nrOfServices = 0;

  $scope.routes = [];
  $scope.nrOfRoutes = 0;

  $scope.users = [];
  $scope.usersOrganization = [];
  $scope.nrOfSpaceUsers = 0;

  $scope.userName = localStorage.getItem('userName');

  $scope.currentUser = {
    name: localStorage.getItem('userName'),
    spaceId: $routeParams.spaceId,
    currentManager: false
  };

  // service summary from api
  $scope.getRoutesForTheSpace = function(){
    if ($scope.routes.length > 0) {
      $scope.routes.length = 0;
    }
    routeService.getRoutesForTheSpace($scope.id).then(function(response){
      var data = response.data;
      $scope.nrOfRoutes = data.total_results;
      angular.forEach(data.resources, function(route, key){
        var objectRoute = {
          id: route.metadata.guid,
          name: route.entity.host,
          apps: []
        };
        for (var j = 0; j < $scope.applications.length; j++) {
          for (var i = 0; i < $scope.applications[j].routes.length; i++) {
            if ($scope.applications[j].routes[i].guid === objectRoute.id) {
              var objectRouteApp = {
                name: $scope.applications[j].name,
                id: $scope.applications[j].id,
              };
              objectRoute.apps.push(objectRouteApp);
            }
          }
        }
        $scope.routes.push(objectRoute);
      });
    }, function(err) {
       messageService.addMessage('danger', 'The routes have not been loaded.');
    });

  };

  $scope.getApplicationsForTheSpace = function() {
    if ($scope.applications.length > 0) {
      $scope.applications.length = 0;
    }

    var getSpaceSummaryPromise = spaceService.getSpaceSummary($scope.spaceId);
    
    q = getSpaceSummaryPromise.then(function(response) {
      //$scope.getRoutesForTheSpace();
      $scope.name = response.data.name;

      // populate applications
      if (response.data.apps && response.data.apps.length > 0) {
        $scope.nrOfApplications = response.data.apps.length;
        $scope.applications = response.data.apps;
        angular.forEach(response.data.apps, function(app, i) {

          var objectApp = {
            id: app.guid,
            status: (app.state === 'STARTED') ? 'running' : 'stopped',
            name: app.name,
            instances: app.instances,
            memory: app.memory,
            url: app.urls[0], // only the first url
            routes: app.routes
          };

          if (app.state === 'STARTED' && (app.instances!==app.running_instances)) objectApp.status = 'crashed';
          
          for (var j = 0; j < response.data.apps.length; j++) {
            if (response.data.apps[j].guid === objectApp.id) {
              $scope.applications[j]=objectApp;
              break;
            }
          }

        });
      }

      // populate services
      if (response.data.services && response.data.services.length > 0) {
        if ($scope.services.length > 0) {
          $scope.services.length = 0;
        }
        $scope.nrOfServices = response.data.services.length;

        angular.forEach(response.data.services, function(service, i) {
          var objectService = {
            id: service.guid,
            name: service.name,
            servicePlan: service.service_plan.service.label + ', ' + service.service_plan.name,
            nrOfBoundApps: service.bound_app_count,
            dashboardUrl: service.dashboard_url,
            supportURL:'https://support.'+service.service_plan.service.label+'.com/',
            docsURL: 'http://docs.run.pivotal.io/marketplace/services/'+service.service_plan.service.label+'.html'
          };

          $scope.services.push(objectService);
        });
      }
      
    }, function(err) {
      //$scope.getRoutesForTheSpace();
      messageService.addMessage('danger', 'The space summary has not been loaded.');
      $log.error(err.data.description);
    });

    return q;
  };
  $scope.getApplicationsForTheSpace().then(function(){
    console.log('boom');
    $scope.getRoutesForTheSpace();

  });

  $scope.retrieveRolesOfAllUsersForTheSpace = function() {
    if ($scope.users.length > 0) {
      $scope.users.length = 0;
    }

    spaceService.retrieveRolesOfAllUsersForTheSpace($scope.id).then(function(response){

      var data = response.data;
      $scope.nrOfSpaceUsers = data.total_results;
      var userRoles = [];

      angular.forEach(data.resources, function(user, key) {

          var spaceDeveloper = false;
          var spaceManager = false;
          var spaceAuditor = false;

          angular.forEach(user.entity.space_roles, function(userRole, key) {       

            if (userRole === 'space_developer'){
              spaceDeveloper = true;
            }
            if (userRole === 'space_manager'){
              spaceManager = true;
            }
            if (userRole === 'space_auditor'){
              spaceAuditor = true;
            }

          });

          var objectUser = {
            id: user.metadata.guid,
            name: user.entity.username,
            spaceDeveloper: spaceDeveloper,
            spaceManager: spaceManager,
            spaceAuditor: spaceAuditor,
            spaceId: $scope.spaceId,
            currentUser: $scope.userName === user.entity.username
          };
          $scope.users.push(objectUser);

    });
      $scope.retrieveRolesOfAllUsers();
    }, function(err) {
      $log.error(err.data.description);
    });
    
  };
  $scope.retrieveRolesOfAllUsersForTheSpace();

  $scope.retrieveRolesOfAllUsers = function() {
  // clear spaces array on reload
  if ($scope.usersOrganization.length > 0) {
    $scope.usersOrganization.length = 0;
  }

  organizationService.retrieveRolesOfAllUsersForTheOrganization($scope.organizationId).then(function(response){
    var data = response.data;

    angular.forEach(data.resources, function(userOrg, key) {

        var orgManager = false;
        var orgAuditor = false;
        var billingManager = false;
        var spaceManager = false;
        var spaceDeveloper = false;
        var spaceAuditor = false;
        var spaceUser = false;

        angular.forEach(userOrg.entity.organization_roles, function(userRole, key) {      
          if (userRole === 'org_manager'){
            orgManager = true;
          }
          if (userRole === 'org_auditor'){
            orgAuditor = true;
          }
          if (userRole === 'billing_manager'){
            billingManager = true;
          }
        });

        angular.forEach($scope.users, function(user, key) { 
          if (user.id === userOrg.metadata.guid){
            spaceManager = user.spaceManager;
            spaceDeveloper = user.spaceDeveloper;
            spaceAuditor = user.spaceAuditor;
            spaceUser = spaceAuditor || spaceDeveloper || spaceManager;
          }
        });

        var objectUser = {
          id: userOrg.metadata.guid,
          name: userOrg.entity.username,
          orgManager: orgManager,
          orgAuditor: orgAuditor,
          billingManager: billingManager,
          spaceDeveloper: spaceDeveloper,
          spaceManager: spaceManager,
          spaceAuditor: spaceAuditor,
          spaceUser: spaceUser,
          orgId: $scope.organizationId,
          spaceId: $scope.id,
          currentUser: $scope.currentUser.name === userOrg.entity.username
        };
        if (!spaceUser){
          $scope.usersOrganization.push(objectUser);
        }

        if ($scope.currentUser.name === userOrg.entity.username){
          $scope.currentUser.currentManager = spaceManager;
        }

    });
  }, function(err) {
  $log.error(err.data.description);
  });

  };
  //$scope.retrieveRolesOfAllUsers();

  $scope.showApp = function(appId) {
    window.location = '#/organizations/' + $scope.organizationId + '/spaces/' + $scope.spaceId + '/applications/' + appId;
  };

  $scope.editSpace = function(id) {
    var space = {
      id: $scope.id,
      name: $scope.name
    };
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
      $scope.name = editedSpace.name;
    });
  };
  
  // delete space
  $scope.deleteSpace = function (id) {
    var space = {
      id: $scope.id,
      name: $scope.name
    };
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
      window.location = '#/organizations/' + $scope.organizationId;
    });
    
  };
  
  $scope.editApplication = function(application) {

    application = {
      'id' : application.id,
      'name' : application.name
    };
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/application/applicationEdit.tpl.html',
      controller: 'ApplicationEditCtrl',
      resolve: {
        application: function() {
          return application;
        }
      }
    });

    modalInstance.result.then(function(editedApplication) {
      angular.forEach($scope.applications, function(app, i) {
        if(app.id === application.id){
          app.name = editedApplication.name;
        }
      });
    });
  };
  
  $scope.deleteApplication = function(applicationId) {

    var modalInstance = $modal.open({
      templateUrl: 'app/components/application/applicationDelete.tpl.html',
      controller: 'ApplicationDeleteCtrl',
      resolve: {
        applicationId: function() {
          return applicationId;
        }
      }
    });

    modalInstance.result.then(function() {
      // go to spaces overview
      //window.location = '#/organizations/' + $scope.organizationId + '/spaces/' + $scope.id;
      $scope.getApplicationsForTheSpace();
    });
  };

  // delete service instance
  $scope.deleteServiceInstance = function(serviceInstance) {
    var modalInstance = $modal.open({
      templateUrl: 'app/components/serviceInstance/serviceInstanceDelete.tpl.html',
      controller: 'ServiceInstanceDeleteCtrl',
      resolve: {
        serviceInstance: function() {
          return serviceInstance;
        }
      }
    });
    
    modalInstance.result.then(function() {
      // adjust service instance table information
      var indexOfServiceInstanceToRemove = $scope.services.indexOf(serviceInstance);
      $scope.services.splice(indexOfServiceInstanceToRemove, 1);
      $scope.nrOfServices -= 1;
    });
  };

    // new route
  $scope.addRoute = function(routeName) {
    var route = {
      domainId: '',
      spaceId: $scope.id,
      host: ''
    };
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/route/routeAdd.tpl.html',
      controller: 'RouteAddCtrl',
      resolve: {
        route: function() {
          return route;
        }
      }
    });
    
    modalInstance.result.then(function() {
      // adjust routes table information
      $scope.getRoutesForTheSpace();
    });

  };

  $scope.deleteRoute = function(route) {

    var routeId = route.id;
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/route/routeDelete.tpl.html',
      controller: 'RouteDeleteCtrl',
      resolve: {
        routeId: function() {
          return routeId;
        }
      }
    });
    
    modalInstance.result.then(function(response) {
      var routeIdx = $scope.routes.indexOf($scope.route);
      $scope.routes.splice(routeIdx, 1);
      $scope.getApplicationsForTheSpace();
    });

  };

  $scope.associateRouteWithApp = function(routeId, applications) {
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/route/routeAssociateWithApp.tpl.html',
      controller: 'RouteAssociateWithAppCtrl',
      resolve: {
        routeId: function() {
          return routeId;
        },
        applications: function() {
          return applications;
        }
      }
    });
    
    modalInstance.result.then(function(application) {
      // adjust routes table information
      console.log(application);
      for (var j = 0; j < $scope.routes.length; j++) {
        if ($scope.routes[j].id === routeId) {
          var objectRouteApp = {
            name: application.name,
            id: application.id,
          };
          $scope.routes[j].apps.push(objectRouteApp);
          break;
        }
      }

      $scope.getApplicationsForTheSpace();
    });
  };

  $scope.disassociateRouteWithApp = function(route) {
    
    var modalInstance = $modal.open({
      templateUrl: 'app/components/route/routeDisassociateFromApp.tpl.html',
      controller: 'RouteUnmapCtrl',
      resolve: {
        route: function() {
          return route;
        }
      }
    });
    
    modalInstance.result.then(function(route, app) {
      // adjust routes table information
      var routeIdx = $scope.routes.indexOf(route);
      var appIdx = $scope.routes[routeIdx].apps.indexOf(app);
      $scope.routes[routeIdx].apps.splice(appIdx, 1);
      $scope.nrOfDomains -=1;
    });
  };

  $scope.addUser = function() {

    var users = $scope.usersOrganization;

    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceAssociateUser.tpl.html',
      controller: 'SpaceAssociateUserCtrl',
      resolve: {
        users: function() {
          return users;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheSpace();
    });

  };

  $scope.deleteUser = function(user) {

    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceDisassociateUser.tpl.html',
      controller: 'SpaceDisassociateUserCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheSpace();
    });

  };

  $scope.addManager = function(username) {

    var user = {
      'spaceId': $scope.id,
      'name': username
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceAddManager.tpl.html',
      controller: 'SpaceAddManagerCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheSpace();
    });

  };

  $scope.deleteManager = function(userId) {

    var user = {
      'spaceId': $scope.id,
      'id': userId
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceDeleteManager.tpl.html',
      controller: 'SpaceDeleteManagerCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheSpace();
    });

  };

  $scope.addDeveloper = function(username) {

    var user = {
      'spaceId': $scope.id,
      'name': username
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceAddDeveloper.tpl.html',
      controller: 'SpaceAddDeveloperCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheSpace();
    });

  };

  $scope.deleteDeveloper = function(userId) {

    var user = {
      'spaceId': $scope.id,
      'id': userId
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceDeleteDeveloper.tpl.html',
      controller: 'SpaceDeleteDeveloperCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheSpace();
    });

  };

  $scope.addAuditor = function(username) {

    var user = {
      'spaceId': $scope.id,
      'name': username
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceAddAuditor.tpl.html',
      controller: 'SpaceAddAuditorCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheSpace();
    });

  };

  $scope.deleteAuditor = function(userId) {

    var user = {
      'spaceId': $scope.id,
      'id': userId
    };

    var modalInstance = $modal.open({
      templateUrl: 'app/components/space/spaceDeleteAuditor.tpl.html',
      controller: 'SpaceDeleteAuditorCtrl',
      resolve: {
        user: function() {
          return user;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.retrieveRolesOfAllUsersForTheSpace();
    });

  };

}]);