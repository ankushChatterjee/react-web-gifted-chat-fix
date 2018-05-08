var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Animated, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// import ActionSheet from '@expo/react-native-action-sheet';
import moment from 'moment/min/moment-with-locales.min';
import uuid from 'uuid';

import * as utils from './utils';
import Actions from './Actions';
import Avatar from './Avatar';
import Bubble from './Bubble';
import MessageImage from './MessageImage';
import MessageText from './MessageText';
import Composer from './Composer';
import Day from './Day';
import InputToolbar from './InputToolbar';
import LoadEarlier from './LoadEarlier';
import Message from './Message';
import MessageContainer from './MessageContainer';
import Send from './Send';
import Time from './Time';
import GiftedAvatar from './GiftedAvatar';
import GiftedChatInteractionManager from './GiftedChatInteractionManager';

// Min and max heights of ToolbarInput and Composer
// Needed for Composer auto grow and ScrollView animation
// TODO move these values to Constants.js (also with used colors #b2b2b2)
var MIN_COMPOSER_HEIGHT = 41;
var MAX_COMPOSER_HEIGHT = 100;

var GiftedChat = function (_React$Component) {
  _inherits(GiftedChat, _React$Component);

  function GiftedChat(props) {
    _classCallCheck(this, GiftedChat);

    // default values
    var _this = _possibleConstructorReturn(this, (GiftedChat.__proto__ || Object.getPrototypeOf(GiftedChat)).call(this, props));

    _this._isMounted = false;
    _this._keyboardHeight = 0;
    _this._bottomOffset = 0;
    _this._maxHeight = null;
    _this._isFirstLayout = true;
    _this._locale = 'en';
    _this._messages = [];

    _this.state = {
      isInitialized: false, // initialization will calculate maxHeight before rendering the chat
      composerHeight: MIN_COMPOSER_HEIGHT,
      messagesContainerHeight: null,
      typingDisabled: false
    };

    _this.onKeyboardWillShow = _this.onKeyboardWillShow.bind(_this);
    _this.onKeyboardWillHide = _this.onKeyboardWillHide.bind(_this);
    _this.onKeyboardDidShow = _this.onKeyboardDidShow.bind(_this);
    _this.onKeyboardDidHide = _this.onKeyboardDidHide.bind(_this);
    _this.onSend = _this.onSend.bind(_this);
    _this.getLocale = _this.getLocale.bind(_this);
    _this.onInputSizeChanged = _this.onInputSizeChanged.bind(_this);
    _this.onInputTextChanged = _this.onInputTextChanged.bind(_this);
    _this.onMainViewLayout = _this.onMainViewLayout.bind(_this);
    _this.onInitialLayoutViewLayout = _this.onInitialLayoutViewLayout.bind(_this);

    _this.invertibleScrollViewProps = {
      inverted: true,
      keyboardShouldPersistTaps: _this.props.keyboardShouldPersistTaps,
      onKeyboardWillShow: _this.onKeyboardWillShow,
      onKeyboardWillHide: _this.onKeyboardWillHide,
      onKeyboardDidShow: _this.onKeyboardDidShow,
      onKeyboardDidHide: _this.onKeyboardDidHide
    };
    return _this;
  }

  _createClass(GiftedChat, [{
    key: 'componentWillMount',


    // getChildContext() {
    //   return {
    //     actionSheet: () => this._actionSheetRef,
    //     getLocale: this.getLocale,
    //   };
    // }

    value: function componentWillMount() {
      this.setIsMounted(true);
      this.initLocale();
      this.initMessages(this.props.messages);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setIsMounted(false);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.initMessages(nextProps.messages);
    }
  }, {
    key: 'initLocale',
    value: function initLocale() {
      if (this.props.locale === null || moment.locales().indexOf(this.props.locale) === -1) {
        this.setLocale('en');
      } else {
        this.setLocale(this.props.locale);
      }
    }
  }, {
    key: 'initMessages',
    value: function initMessages() {
      var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this.setMessages(messages);
    }
  }, {
    key: 'setLocale',
    value: function setLocale(locale) {
      this._locale = locale;
    }
  }, {
    key: 'getLocale',
    value: function getLocale() {
      return this._locale;
    }
  }, {
    key: 'setMessages',
    value: function setMessages(messages) {
      this._messages = messages;
    }
  }, {
    key: 'getMessages',
    value: function getMessages() {
      return this._messages;
    }
  }, {
    key: 'setMaxHeight',
    value: function setMaxHeight(height) {
      this._maxHeight = height;
    }
  }, {
    key: 'getMaxHeight',
    value: function getMaxHeight() {
      return this._maxHeight;
    }
  }, {
    key: 'setKeyboardHeight',
    value: function setKeyboardHeight(height) {
      this._keyboardHeight = 0;
    }
  }, {
    key: 'getKeyboardHeight',
    value: function getKeyboardHeight() {
      return 0;
    }
  }, {
    key: 'setBottomOffset',
    value: function setBottomOffset(value) {
      this._bottomOffset = value;
    }
  }, {
    key: 'getBottomOffset',
    value: function getBottomOffset() {
      return this._bottomOffset;
    }
  }, {
    key: 'setIsFirstLayout',
    value: function setIsFirstLayout(value) {
      this._isFirstLayout = value;
    }
  }, {
    key: 'getIsFirstLayout',
    value: function getIsFirstLayout() {
      return this._isFirstLayout;
    }
  }, {
    key: 'setIsTypingDisabled',
    value: function setIsTypingDisabled(value) {
      this.setState({
        typingDisabled: value
      });
    }
  }, {
    key: 'getIsTypingDisabled',
    value: function getIsTypingDisabled() {
      return this.state.typingDisabled;
    }
  }, {
    key: 'setIsMounted',
    value: function setIsMounted(value) {
      this._isMounted = value;
    }
  }, {
    key: 'getIsMounted',
    value: function getIsMounted() {
      return this._isMounted;
    }

    // TODO
    // setMinInputToolbarHeight

  }, {
    key: 'getMinInputToolbarHeight',
    value: function getMinInputToolbarHeight() {
      return this.props.renderAccessory ? this.props.minInputToolbarHeight * 2 : this.props.minInputToolbarHeight;
    }
  }, {
    key: 'calculateInputToolbarHeight',
    value: function calculateInputToolbarHeight(composerHeight) {
      return composerHeight + (this.getMinInputToolbarHeight() - MIN_COMPOSER_HEIGHT);
    }

    /**
     * Returns the height, based on current window size, without taking the keyboard into account.
     */

  }, {
    key: 'getBasicMessagesContainerHeight',
    value: function getBasicMessagesContainerHeight() {
      var composerHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.composerHeight;

      return this.getMaxHeight() - this.calculateInputToolbarHeight(composerHeight);
    }

    /**
     * Returns the height, based on current window size, taking the keyboard into account.
     */

  }, {
    key: 'getMessagesContainerHeightWithKeyboard',
    value: function getMessagesContainerHeightWithKeyboard() {
      var composerHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.composerHeight;

      return this.getBasicMessagesContainerHeight(composerHeight) - this.getKeyboardHeight() + this.getBottomOffset();
    }
  }, {
    key: 'prepareMessagesContainerHeight',
    value: function prepareMessagesContainerHeight(value) {
      if (this.props.isAnimated === true) {
        return new Animated.Value(value);
      }
      return value;
    }
  }, {
    key: 'onKeyboardWillShow',
    value: function onKeyboardWillShow(e) {
      this.setIsTypingDisabled(true);
      this.setKeyboardHeight(e.endCoordinates ? e.endCoordinates.height : e.end.height);
      this.setBottomOffset(this.props.bottomOffset);
      var newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard();
      if (this.props.isAnimated === true) {
        Animated.timing(this.state.messagesContainerHeight, {
          toValue: newMessagesContainerHeight,
          duration: 210
        }).start();
      } else {
        this.setState({
          messagesContainerHeight: newMessagesContainerHeight
        });
      }
    }
  }, {
    key: 'onKeyboardWillHide',
    value: function onKeyboardWillHide() {
      this.setIsTypingDisabled(true);
      this.setKeyboardHeight(0);
      this.setBottomOffset(0);
      var newMessagesContainerHeight = this.getBasicMessagesContainerHeight();
      if (this.props.isAnimated === true) {
        Animated.timing(this.state.messagesContainerHeight, {
          toValue: newMessagesContainerHeight,
          duration: 210
        }).start();
      } else {
        this.setState({
          messagesContainerHeight: newMessagesContainerHeight
        });
      }
    }
  }, {
    key: 'onKeyboardDidShow',
    value: function onKeyboardDidShow(e) {
      if (Platform.OS === 'android') {
        this.onKeyboardWillShow(e);
      }
      this.setIsTypingDisabled(false);
    }
  }, {
    key: 'onKeyboardDidHide',
    value: function onKeyboardDidHide(e) {
      if (Platform.OS === 'android') {
        this.onKeyboardWillHide(e);
      }
      this.setIsTypingDisabled(false);
    }
  }, {
    key: 'scrollToBottom',
    value: function scrollToBottom() {
      var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this._messageContainerRef === null) {
        return;
      }
      this._messageContainerRef.scrollTo({
        y: 0,
        animated: animated
      });
    }
  }, {
    key: 'renderMessages',
    value: function renderMessages() {
      var _this2 = this;

      return React.createElement(
        'div',
        { style: {
            height: this.state.messagesContainerHeight,
            display: 'flex'
          } },
        React.createElement(MessageContainer, Object.assign({}, this.props, {
          invertibleScrollViewProps: this.invertibleScrollViewProps,
          messages: this.getMessages(),
          ref: function ref(component) {
            return _this2._messageContainerRef = component;
          }
        })),
        this.renderChatFooter()
      );
    }
  }, {
    key: 'onSend',
    value: function onSend() {
      var _this3 = this;

      var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var shouldResetInputToolbar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!Array.isArray(messages)) {
        messages = [messages];
      }

      messages = messages.map(function (message) {
        return Object.assign({}, message, {
          user: _this3.props.user,
          createdAt: new Date(),
          _id: _this3.props.messageIdGenerator()
        });
      });
      console.log(messages);
      if (shouldResetInputToolbar === true) {
        this.setIsTypingDisabled(true);
        this.resetInputToolbar();
      }

      this.props.onSend(messages);
      this.scrollToBottom();

      if (shouldResetInputToolbar === true) {
        setTimeout(function () {
          if (_this3.getIsMounted() === true) {
            _this3.setIsTypingDisabled(false);
          }
        }, 100);
      }
    }
  }, {
    key: 'resetInputToolbar',
    value: function resetInputToolbar() {
      if (this.textInput) {
        this.textInput.clear();
      }
      var newComposerHeight = MIN_COMPOSER_HEIGHT;
      var newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
      this.setState({
        text: '',
        composerHeight: newComposerHeight,
        messagesContainerHeight: this.prepareMessagesContainerHeight(newMessagesContainerHeight)
      });
    }
  }, {
    key: 'onInputSizeChanged',
    value: function onInputSizeChanged(size) {
      var newComposerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(MAX_COMPOSER_HEIGHT, size.height));
      var newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
      this.setState({
        composerHeight: newComposerHeight,
        messagesContainerHeight: this.prepareMessagesContainerHeight(newMessagesContainerHeight)
      });
    }
  }, {
    key: 'onInputTextChanged',
    value: function onInputTextChanged(text) {
      if (this.getIsTypingDisabled()) {
        return;
      }
      if (this.props.onInputTextChanged) {
        this.props.onInputTextChanged(text);
      }
      this.setState({ text: text });
    }
  }, {
    key: 'onInitialLayoutViewLayout',
    value: function onInitialLayoutViewLayout(e) {
      var layout = e.nativeEvent.layout;
      if (layout.height <= 0) {
        return;
      }
      this.setMaxHeight(1000);
      var newComposerHeight = '100%';
      var newMessagesContainerHeight = newComposerHeight; // this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
      this.setState({
        isInitialized: true,
        text: '',
        composerHeight: newComposerHeight,
        messagesContainerHeight: this.prepareMessagesContainerHeight(newMessagesContainerHeight)
      });
    }
  }, {
    key: 'onMainViewLayout',
    value: function onMainViewLayout(e) {
      // // fix an issue when keyboard is dismissing during the initialization
      // const layout = e.nativeEvent.layout;
      // if (this.getMaxHeight() !== layout.height || this.getIsFirstLayout() === true) {
      //   this.setMaxHeight(layout.height);
      //   this.setState({
      //     messagesContainerHeight: this.prepareMessagesContainerHeight(this.getBasicMessagesContainerHeight()),
      //   });
      // }
      // if (this.getIsFirstLayout() === true) {
      //   this.setIsFirstLayout(false);
      // }
    }
  }, {
    key: 'renderInputToolbar',
    value: function renderInputToolbar() {
      var _this4 = this;

      var inputToolbarProps = Object.assign({}, this.props, {
        text: this.state.text,
        onSend: this.onSend,
        onInputSizeChanged: this.onInputSizeChanged,
        onTextChanged: this.onInputTextChanged,
        textInputProps: Object.assign({}, this.props.textInputProps, {
          ref: function ref(textInput) {
            return _this4.textInput = textInput;
          },
          maxLength: this.getIsTypingDisabled() ? 0 : this.props.maxInputLength
        })
      });
      if (this.getIsTypingDisabled()) {
        inputToolbarProps.textInputProps.maxLength = 0;
      }
      if (this.props.renderInputToolbar) {
        return this.props.renderInputToolbar(inputToolbarProps);
      }
      return React.createElement(InputToolbar, inputToolbarProps);
    }
  }, {
    key: 'renderChatFooter',
    value: function renderChatFooter() {
      if (this.props.renderChatFooter) {
        var footerProps = Object.assign({}, this.props);
        return this.props.renderChatFooter(footerProps);
      }
      return null;
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      if (this.props.renderLoading) {
        return this.props.renderLoading();
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.isInitialized === true) {
        return React.createElement(
          View,
          { style: styles.container, onLayout: this.onMainViewLayout },
          this.renderMessages(),
          this.renderInputToolbar()
        );
      }
      return React.createElement(
        View,
        { style: styles.container, onLayout: this.onInitialLayoutViewLayout },
        this.renderLoading()
      );
    }
  }], [{
    key: 'append',
    value: function append() {
      var currentMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var messages = arguments[1];

      if (!Array.isArray(messages)) {
        messages = [messages];
      }
      console.log('dbg',messages,currentMessages);
      return currentMessages.concat(messages);

    }
  }, {
    key: 'prepend',
    value: function prepend() {
      var currentMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var messages = arguments[1];

      if (!Array.isArray(messages)) {
        messages = [messages];
      }
      return currentMessages.concat(messages);
    }
  }]);

  return GiftedChat;
}(React.Component);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  }
});

GiftedChat.childContextTypes = {
  getLocale: React.PropTypes.func
};

GiftedChat.defaultProps = {
  messages: [],
  onSend: function onSend() {},
  loadEarlier: false,
  onLoadEarlier: function onLoadEarlier() {},
  locale: null,
  isAnimated: false,
  keyboardShouldPersistTaps: 'never',
  renderAccessory: null,
  renderActions: null,
  renderAvatar: undefined,
  renderBubble: null,
  renderFooter: null,
  renderChatFooter: null,
  renderMessageText: null,
  renderMessageImage: null,
  renderComposer: null,
  renderCustomView: null,
  renderDay: null,
  renderInputToolbar: null,
  renderLoadEarlier: null,
  renderLoading: null,
  renderMessage: null,
  renderSend: null,
  renderTime: null,
  user: {},
  bottomOffset: 0,
  minInputToolbarHeight: 44,
  isLoadingEarlier: false,
  messageIdGenerator: function messageIdGenerator() {
    return uuid.v4();
  },
  maxInputLength: null
};

GiftedChat.propTypes = {
  messages: React.PropTypes.array,
  onSend: React.PropTypes.func,
  onInputTextChanged: React.PropTypes.func,
  loadEarlier: React.PropTypes.bool,
  onLoadEarlier: React.PropTypes.func,
  locale: React.PropTypes.string,
  isAnimated: React.PropTypes.bool,
  renderAccessory: React.PropTypes.func,
  renderActions: React.PropTypes.func,
  renderAvatar: React.PropTypes.func,
  renderBubble: React.PropTypes.func,
  renderFooter: React.PropTypes.func,
  renderChatFooter: React.PropTypes.func,
  renderMessageText: React.PropTypes.func,
  renderMessageImage: React.PropTypes.func,
  renderComposer: React.PropTypes.func,
  renderCustomView: React.PropTypes.func,
  renderDay: React.PropTypes.func,
  renderInputToolbar: React.PropTypes.func,
  renderLoadEarlier: React.PropTypes.func,
  renderLoading: React.PropTypes.func,
  renderMessage: React.PropTypes.func,
  renderSend: React.PropTypes.func,
  renderTime: React.PropTypes.func,
  user: React.PropTypes.object,
  bottomOffset: React.PropTypes.number,
  minInputToolbarHeight: React.PropTypes.number,
  isLoadingEarlier: React.PropTypes.bool,
  messageIdGenerator: React.PropTypes.func,
  keyboardShouldPersistTaps: React.PropTypes.oneOf(['always', 'never', 'handled'])
};

export { GiftedChat, Actions, Avatar, Bubble, MessageImage, MessageText, Composer, Day, InputToolbar, LoadEarlier, Message, MessageContainer, Send, Time, GiftedAvatar, utils };