var topbarDirective = angular.module('topbarDirective', []);

topbarDirective.directive('topbar', [function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/topbar/topbar.tpl.html'
  };
}]);