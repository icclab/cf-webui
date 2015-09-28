angular.module('app.sidebar').directive('toggleSubnavi', [function() {
  return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $(element).click(function(e) {
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
}]);