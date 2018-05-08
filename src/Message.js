var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';

import Avatar from './Avatar';
import Bubble from './Bubble';
import Day from './Day';

import { isSameUser, isSameDay } from './utils';

var Message = function (_React$Component) {
  _inherits(Message, _React$Component);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
  }

  _createClass(Message, [{
    key: 'getInnerComponentProps',
    value: function getInnerComponentProps() {
      var _props = this.props,
          containerStyle = _props.containerStyle,
          props = _objectWithoutProperties(_props, ['containerStyle']);

      return Object.assign({}, props, {
        isSameUser: isSameUser,
        isSameDay: isSameDay
      });
    }
  }, {
    key: 'renderDay',
    value: function renderDay() {

      console.log(this.props.currentMessage,this.props.currentMessage.createdAt);

      if (this.props.currentMessage.createdAt) {
        var dayProps = this.getInnerComponentProps();
        if (this.props.renderDay) {
          return this.props.renderDay(dayProps);
        }
        return React.createElement(Day, dayProps);
      }
      return null;
    }
  }, {
    key: 'renderBubble',
    value: function renderBubble() {
      var bubbleProps = this.getInnerComponentProps();
      if (this.props.renderBubble) {
        return this.props.renderBubble(bubbleProps);
      }
      return React.createElement(Bubble, bubbleProps);
    }
  }, {
    key: 'renderAvatar',
    value: function renderAvatar() {
      if (this.props.user._id !== this.props.currentMessage.user._id) {
        var avatarProps = this.getInnerComponentProps();
        return React.createElement(Avatar, avatarProps);
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        View,
        null,
        this.renderDay(),
        React.createElement(
          View,
          { style: [styles[this.props.position].container, {
              marginBottom: isSameUser(this.props.currentMessage, this.props.nextMessage) ? 2 : 10
            }, this.props.containerStyle[this.props.position]] },
          this.props.position === 'left' ? this.renderAvatar() : null,
          this.renderBubble(),
          this.props.position === 'right' ? this.renderAvatar() : null
        )
      );
    }
  }]);

  return Message;
}(React.Component);

export default Message;


var styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0
    }
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8
    }
  })
};

Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  position: 'left',
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {}
};

Message.propTypes = {
  renderAvatar: React.PropTypes.func,
  renderBubble: React.PropTypes.func,
  renderDay: React.PropTypes.func,
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  nextMessage: React.PropTypes.object,
  previousMessage: React.PropTypes.object,
  user: React.PropTypes.object,
  containerStyle: React.PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  })
};