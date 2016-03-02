angular.module('app', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'ngWebSocket',
  'ngCookies',

  'ui.bootstrap',
  'angular-loading-bar',

  // shared
  'app.sidebar',
  'app.topbar',
  'app.breadcrumb',
  'app.message',

  // components
  'app.info',
  'app.application',
  'app.auth',
  'app.logIn',
  'app.organization',
  'app.space',
  'app.service',
  'app.serviceInstance',
  'app.user',
  'app.domain',
  'app.routes',
  'app.serviceBinding',
  'app.marketplace',
  'app.featureFlag',
  'app.log'
]);