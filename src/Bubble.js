var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Text, Clipboard, StyleSheet, TouchableWithoutFeedback, View, ViewPropTypes } from 'react-native';

import MessageText from './MessageText';
import MessageImage from './MessageImage';
import Time from './Time';

import { isSameUser, isSameDay, warnDeprecated } from './utils';

var Bubble = function (_React$Component) {
  _inherits(Bubble, _React$Component);

  function Bubble(props) {
    _classCallCheck(this, Bubble);

    var _this = _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).call(this, props));

    _this.onLongPress = _this.onLongPress.bind(_this);
    return _this;
  }

  _createClass(Bubble, [{
    key: 'handleBubbleToNext',
    value: function handleBubbleToNext() {
      if (isSameUser(this.props.currentMessage, this.props.nextMessage) && isSameDay(this.props.currentMessage, this.props.nextMessage)) {
        return StyleSheet.flatten([styles[this.props.position].containerToNext, this.props.containerToNextStyle[this.props.position]]);
      }
      return null;
    }
  }, {
    key: 'handleBubbleToPrevious',
    value: function handleBubbleToPrevious() {
      if (isSameUser(this.props.currentMessage, this.props.previousMessage) && isSameDay(this.props.currentMessage, this.props.previousMessage)) {
        return StyleSheet.flatten([styles[this.props.position].containerToPrevious, this.props.containerToPreviousStyle[this.props.position]]);
      }
      return null;
    }
  }, {
    key: 'renderMessageText',
    value: function renderMessageText() {
      if (this.props.currentMessage.text) {
        var _props = this.props,
            containerStyle = _props.containerStyle,
            wrapperStyle = _props.wrapperStyle,
            messageTextProps = _objectWithoutProperties(_props, ['containerStyle', 'wrapperStyle']);

        if (this.props.renderMessageText) {
          return this.props.renderMessageText(messageTextProps);
        }
        return React.createElement(MessageText, messageTextProps);
      }
      return null;
    }
  }, {
    key: 'renderMessageImage',
    value: function renderMessageImage() {
      if (this.props.currentMessage.image) {
        var _props2 = this.props,
            containerStyle = _props2.containerStyle,
            wrapperStyle = _props2.wrapperStyle,
            messageImageProps = _objectWithoutProperties(_props2, ['containerStyle', 'wrapperStyle']);

        if (this.props.renderMessageImage) {
          return this.props.renderMessageImage(messageImageProps);
        }
        return React.createElement(MessageImage, messageImageProps);
      }
      return null;
    }
  }, {
    key: 'renderTicks',
    value: function renderTicks() {
      var currentMessage = this.props.currentMessage;

      if (this.props.renderTicks) {
        return this.props.renderTicks(currentMessage);
      }
      if (currentMessage.user._id !== this.props.user._id) {
        return;
      }
      if (currentMessage.sent || currentMessage.received) {
        return React.createElement(
          View,
          { style: styles.tickView },
          currentMessage.sent && React.createElement(
            Text,
            { style: [styles.tick, this.props.tickStyle] },
            '\u2713'
          ),
          currentMessage.received && React.createElement(
            Text,
            { style: [styles.tick, this.props.tickStyle] },
            '\u2713'
          )
        );
      }
    }
  }, {
    key: 'renderTime',
    value: function renderTime() {
      if (this.props.currentMessage.createdAt) {
        var _props3 = this.props,
            containerStyle = _props3.containerStyle,
            wrapperStyle = _props3.wrapperStyle,
            timeProps = _objectWithoutProperties(_props3, ['containerStyle', 'wrapperStyle']);

        if (this.props.renderTime) {
          return this.props.renderTime(timeProps);
        }
        return React.createElement(Time, timeProps);
      }
      return null;
    }
  }, {
    key: 'renderCustomView',
    value: function renderCustomView() {
      if (this.props.renderCustomView) {
        return this.props.renderCustomView(this.props);
      }
      return null;
    }
  }, {
    key: 'onLongPress',
    value: function onLongPress() {
      var _this2 = this;

      if (this.props.onLongPress) {
        this.props.onLongPress(this.context, this.props.currentMessage);
      } else {
        if (this.props.currentMessage.text) {
          var options = ['Copy Text', 'Cancel'];
          var cancelButtonIndex = options.length - 1;
          this.context.actionSheet().showActionSheetWithOptions({
            options: options,
            cancelButtonIndex: cancelButtonIndex
          }, function (buttonIndex) {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(_this2.props.currentMessage.text);
                break;
            }
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        View,
        { style: [styles[this.props.position].container, this.props.containerStyle[this.props.position]] },
        React.createElement(
          View,
          { style: [styles[this.props.position].wrapper, this.props.wrapperStyle[this.props.position], this.handleBubbleToNext(), this.handleBubbleToPrevious()] },
          React.createElement(
            TouchableWithoutFeedback,
            Object.assign({
              onLongPress: this.onLongPress,
              accessibilityTraits: 'text'
            }, this.props.touchableProps),
            React.createElement(
              View,
              null,
              this.renderCustomView(),
              this.renderMessageImage(),
              this.renderMessageText(),
              React.createElement(
                View,
                { style: [styles.bottom, this.props.bottomContainerStyle[this.props.position]] },
                this.renderTime(),
                this.renderTicks()
              )
            )
          )
        )
      );
    }
  }]);

  return Bubble;
}(React.Component);

export default Bubble;


var styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start'
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#f0f0f0',
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end'
    },
    containerToNext: {
      borderBottomLeftRadius: 3
    },
    containerToPrevious: {
      borderTopLeftRadius: 3
    }
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end'
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#0084ff',
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end'
    },
    containerToNext: {
      borderBottomRightRadius: 3
    },
    containerToPrevious: {
      borderTopRightRadius: 3
    }
  }),
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  tick: {
    fontSize: 10,
    backgroundColor: 'transparent',
    color: 'white'
  },
  tickView: {
    flexDirection: 'row',
    marginRight: 10
  }
};

Bubble.contextTypes = {
  actionSheet: React.PropTypes.func
};

Bubble.defaultProps = {
  touchableProps: {},
  onLongPress: null,
  renderMessageImage: null,
  renderMessageText: null,
  renderCustomView: null,
  renderTime: null,
  position: 'left',
  currentMessage: {
    text: null,
    createdAt: null,
    image: null
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  bottomContainerStyle: {},
  tickStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},
  //TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser)
};

Bubble.propTypes = {
  touchableProps: React.PropTypes.object,
  onLongPress: React.PropTypes.func,
  renderMessageImage: React.PropTypes.func,
  renderMessageText: React.PropTypes.func,
  renderCustomView: React.PropTypes.func,
  renderTime: React.PropTypes.func,
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  nextMessage: React.PropTypes.object,
  previousMessage: React.PropTypes.object,
  containerStyle: React.PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  wrapperStyle: React.PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  bottomContainerStyle: React.PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  tickStyle: Text.propTypes.style,
  containerToNextStyle: React.PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  containerToPreviousStyle: React.PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  //TODO: remove in next major release
  isSameDay: React.PropTypes.func,
  isSameUser: React.PropTypes.func
};