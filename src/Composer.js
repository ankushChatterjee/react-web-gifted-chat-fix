var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';

var Composer = function (_React$Component) {
  _inherits(Composer, _React$Component);

  function Composer() {
    _classCallCheck(this, Composer);

    return _possibleConstructorReturn(this, (Composer.__proto__ || Object.getPrototypeOf(Composer)).apply(this, arguments));
  }

  _createClass(Composer, [{
    key: 'onChange',
    value: function onChange(e) {
      var contentSize = e.nativeEvent.contentSize;
      if (!this.contentSize) {
        this.contentSize = contentSize;
        this.props.onInputSizeChanged(this.contentSize);
      } else if (this.contentSize.width !== contentSize.width || this.contentSize.height !== contentSize.height) {
        this.contentSize = contentSize;
        this.props.onInputSizeChanged(this.contentSize);
      }
    }
  }, {
    key: 'onChangeText',
    value: function onChangeText(text) {
      this.props.onTextChanged(text);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(TextInput, Object.assign({
        placeholder: this.props.placeholder,
        placeholderTextColor: this.props.placeholderTextColor,
        multiline: this.props.multiline,

        onContentSizeChange: function onContentSizeChange(e) {
          return _this2.onChange(e);
        },
        onChangeText: function onChangeText(text) {
          return _this2.onChangeText(text);
        },

        style: [styles.textInput, this.props.textInputStyle, { height: this.props.composerHeight }],

        value: this.props.text,
        accessibilityLabel: this.props.text || this.props.placeholder,
        enablesReturnKeyAutomatically: true,
        underlineColorAndroid: 'transparent'
      }, this.props.textInputProps));
    }
  }]);

  return Composer;
}(React.Component);

export default Composer;


var styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    marginTop: Platform.select({
      ios: 6,
      android: 0
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3
    })
  }
});

Composer.defaultProps = {
  onChange: function onChange() {},
  composerHeight: Platform.select({
    ios: 33,
    android: 41
  }), // TODO SHARE with GiftedChat.js and tests
  text: '',
  placeholder: 'Type a message...',
  placeholderTextColor: '#b2b2b2',
  textInputProps: null,
  multiline: true,
  textInputStyle: {},
  onTextChanged: function onTextChanged() {},
  onInputSizeChanged: function onInputSizeChanged() {}
};

Composer.propTypes = {
  onChange: React.PropTypes.func,
  composerHeight: React.PropTypes.number,
  text: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  placeholderTextColor: React.PropTypes.string,
  textInputProps: React.PropTypes.object,
  onTextChanged: React.PropTypes.func,
  onInputSizeChanged: React.PropTypes.func,
  multiline: React.PropTypes.bool,
  textInputStyle: TextInput.propTypes.style
};