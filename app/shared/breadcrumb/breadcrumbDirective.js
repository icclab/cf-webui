var breadcrumbDirective = angular.module('breadcrumbDirective', []);

breadcrumbDirective.directive('breadcrumb', [function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/breadcrumb/breadcrumb.tpl.html'
  };
}]);