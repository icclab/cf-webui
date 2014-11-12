var app = angular.module('app', [
  'ngRoute',
  'ngResource',

  'ui.bootstrap',

  'logIn',
  'organization',
  'space'
]);

app.constant('UAA_ENDPOINT', 'https://uaa.run.pivotal.io');
app.constant('API_ENDPOINT', 'https://api.run.pivotal.io');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/logIn/logIn.tpl.html',
      controller: 'LogInCtrl'
    })
    
    .when('/organizations', {
      templateUrl: 'app/organization/organizationPreview.tpl.html',
      controller: 'OrganizationPreviewCtrl'
    })

    .when('/organizations/:organizationId', {
      templateUrl: 'app/organization/organizationDetails.tpl.html',
      controller: 'OrganizationDetailsCtrl'
    })
    
    .otherwise({
      redirectTo: '/organizations'
    });
}]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
}]);

app.run(['$rootScope', '$location', 'authService', function($rootScope, $location, authService) {
  authService.fillAuthData();

  // redirect the user to the login page if he is not logged in
  $rootScope.$on('$routeChangeStart', function(event) {
    var authentication = authService.authentication;
    if (!authentication.isAuth && $location.path() != '/login') {
      $location.path('/login');
    }
  })
}]);

app.controller('MainCtrl', ['$scope', function($scope) {
  
}]);

// toggle side bar
app.directive('toggleSidebar', function () {
  return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $(element).click(function (e) {
          e.preventDefault();
                
          // hide sidebar
          if ($('#page-sidebar').is(':visible')) {
            $('#sidebar-minimize span').removeClass('fa-dedent').addClass('fa-indent');
            
            $('#page-sidebar').animate({'width': 0}, 400, function() {
              $('#page-sidebar').hide();
            });
            $('#page-content').animate({'marginLeft': 0}, 400);
            
          // show sidebar
          } else {
            $('#sidebar-minimize span').removeClass('fa-indent').addClass('fa-dedent');
            
            $('#page-sidebar').show();
            $('#page-sidebar').animate({'width': '220px'}, 400);
            $('#page-content').animate({'marginLeft': '220px'}, 400);
          }
        });
      }
  };
});

// toggle subnavi
app.directive('toggleSubnavi', function () {
  return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $(element).click(function (e) {
          e.preventDefault();
                
          var subNavi = $(element).next();
          if (subNavi.is(':visible')) {
            subNavi.slideUp();
          } else {
            subNavi.slideDown();
          }
        });
      }
  };
});