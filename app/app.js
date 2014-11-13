angular.module('app', [
  'ngRoute',
  'ngResource',

  'ui.bootstrap',

  // shared
  'app.sidebar',
  'app.topbar',
  'app.breadcrumb',
  'app.message',

  // components
  'app.auth',
  'app.logIn',
  'app.organization',
  'app.space'
]);