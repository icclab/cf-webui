angular.module('app.sidebar').directive('sidebar', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/sidebar/sidebar.tpl.html'
  };
}]);