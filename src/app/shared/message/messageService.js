angular.module('app.message').factory('messageService', ['$rootScope', function($rootScope) {
  var messageServiceFactory = {};

  var _messages = [];

  var _addMessage = function(type, msg, avoidDelete) {
    console.log('Avoid delete: ' + avoidDelete);
    if (avoidDelete !== true) _removeAllMessages();
    var message = {
      type: type,
      msg: msg
    };
    console.log(message);
    _messages.push(message);
  };

  var _removeAllMessages = function(messageObject) {
    if (_messages.length > 0){
      _messages.length = 0;
    }
    console.log('Remove all');
  };

  var _removeMessage = function(messageObject) {
    var index = _messages.indexOf(messageObject);
    _messages.splice(index, 1);
    console.log('Remove one');
  };

  messageServiceFactory.messages = _messages;
  messageServiceFactory.addMessage = _addMessage;
  messageServiceFactory.removeMessage = _removeMessage;
  messageServiceFactory.removeAllMessages = _removeAllMessages;

  return messageServiceFactory;
}]);