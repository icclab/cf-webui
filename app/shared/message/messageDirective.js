angular.module('app.message').directive('messages', [function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/message/messages.tpl.html'
  };
}]);