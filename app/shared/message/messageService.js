angular.module('app.message').factory('messageService', ['$rootScope', function($rootScope) {
  var messageServiceFactory = {};

  var _messages = [];

  var _addMessage = function(type, msg, forceDelete) {
    console.log(forceDelete);
    if (forceDelete === true) $rootScope.rootFields.waitDelete=true;
    //console.log(waitDelete);
    var message = {
      type: type,
      msg: msg
    };
    console.log('Añado mensaje');

    //$rootScope.rootFields.deleteMessages=true;

    _messages.push(message);
  };

  var _removeMessage = function(messageObject) {
    var index = _messages.indexOf(messageObject);
    _messages.splice(index, 1);
  };

  messageServiceFactory.messages = _messages;
  messageServiceFactory.addMessage = _addMessage;
  messageServiceFactory.removeMessage = _removeMessage;

  return messageServiceFactory;
}]);