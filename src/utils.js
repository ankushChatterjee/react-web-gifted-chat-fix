import moment from 'moment';

var DEPRECATION_MESSAGE = 'isSameUser and isSameDay should be imported from the utils module instead of using the props functions';

export function isSameDay() {
  var currentMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var diffMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  if (!diffMessage.createdAt) {
    return false;
  }

  var currentCreatedAt = moment(currentMessage.createdAt);
  var diffCreatedAt = moment(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function isSameUser() {
  var currentMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var diffMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  return !!(diffMessage.user && currentMessage.user && diffMessage.user._id === currentMessage.user._id);
}

export function warnDeprecated(fn) {

  return function () {
    console.warn(DEPRECATION_MESSAGE);
    return fn.apply(undefined, arguments);
  };
}