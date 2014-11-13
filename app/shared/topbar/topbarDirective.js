angular.module('app.topbar').directive('topbar', [function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/topbar/topbar.tpl.html'
  };
}]);