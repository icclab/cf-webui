var app = angular.module('app', [
  'ngRoute',
  
  'login',
  'dashboard'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/login/login.tpl.html',
      controller: 'LoginCtrl'
    })
    
    .when('/dashboard', {
      templateUrl: 'app/dashboard/dashboard.tpl.html',
      controller: 'DashboardCtrl'
    })
    
    .otherwise({
      redirectTo: '/dashboard'
    });
}]);

// toggle side bar
app.directive( 'toggleSidebar', function () {
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
app.directive( 'toggleSubnavi', function () {
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
