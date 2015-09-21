angular.module('app', [
  'ngRoute',
  'ngResource',
  'ngAnimate',

  'ui.bootstrap',
  'angular-loading-bar',

  // shared
  'app.sidebar',
  'app.topbar',
  'app.breadcrumb',
  'app.message',

  // components
  'app.application',
  'app.auth',
  'app.logIn',
  'app.organization',
  'app.space',
  'app.service',
  'app.serviceInstance',
  'app.user',
  'app.domain',
  'app.route',
  'app.serviceBinding',
  'app.marketplace'
]);