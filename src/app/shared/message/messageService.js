angular.module('app.message').factory('messageService', ['$rootScope', function($rootScope) {
  var messageServiceFactory = {};

  var _messages = [];

  var _addMessage = function(type, msg, forceDelete) {
    if (forceDelete === true) $rootScope.rootFields.waitDelete=true;
    var message = {
      type: type,
      msg: msg
    };

    _messages.push(message);
  };

  var _removeAllMessages = function(messageObject) {
    if ($rootScope.rootFields.waitDelete===false && _messages.length > 0){
      _messages.length = 0;
    }
    $rootScope.rootFields.waitDelete=false;
  };

  var _removeMessage = function(messageObject) {
    var index = _messages.indexOf(messageObject);
    _messages.splice(index, 1);
  };

  messageServiceFactory.messages = _messages;
  messageServiceFactory.addMessage = _addMessage;
  messageServiceFactory.removeMessage = _removeMessage;
  messageServiceFactory.removeAllMessages = _removeAllMessages;

  return messageServiceFactory;
}]);