angular.module('app.sidebar').directive('sidebar', [function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/sidebar/sidebar.tpl.html'
  };
}]);