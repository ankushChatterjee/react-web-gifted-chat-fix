var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Linking, StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import ParsedText from 'react-native-parsed-text';

var MessageText = function (_React$Component) {
  _inherits(MessageText, _React$Component);

  function MessageText(props) {
    _classCallCheck(this, MessageText);

    var _this = _possibleConstructorReturn(this, (MessageText.__proto__ || Object.getPrototypeOf(MessageText)).call(this, props));

    _this.onUrlPress = _this.onUrlPress.bind(_this);
    _this.onPhonePress = _this.onPhonePress.bind(_this);
    _this.onEmailPress = _this.onEmailPress.bind(_this);
    return _this;
  }

  _createClass(MessageText, [{
    key: 'onUrlPress',
    value: function onUrlPress(url) {
      Linking.openURL(url);
    }
  }, {
    key: 'onPhonePress',
    value: function onPhonePress(phone) {
      var options = ['Text', 'Call', 'Cancel'];
      var cancelButtonIndex = options.length - 1;
      this.context.actionSheet().showActionSheetWithOptions({
        options: options,
        cancelButtonIndex: cancelButtonIndex
      }, function (buttonIndex) {
        // switch (buttonIndex) {
        //   case 0:
        //     Communications.phonecall(phone, true);
        //     break;
        //   case 1:
        //     Communications.text(phone);
        //     break;
        // }
      });
    }
  }, {
    key: 'onEmailPress',
    value: function onEmailPress(email) {
      //Communications.email(email, null, null, null, null);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        View,
        { style: [styles[this.props.position].container, this.props.containerStyle[this.props.position]] },
        React.createElement(
          ParsedText,
          {
            style: [styles[this.props.position].text, this.props.textStyle[this.props.position]],
            parse: [{ type: 'url', style: StyleSheet.flatten([styles[this.props.position].link, this.props.linkStyle[this.props.position]]), onPress: this.onUrlPress }, { type: 'phone', style: StyleSheet.flatten([styles[this.props.position].link, this.props.linkStyle[this.props.position]]), onPress: this.onPhonePress }, { type: 'email', style: StyleSheet.flatten([styles[this.props.position].link, this.props.linkStyle[this.props.position]]), onPress: this.onEmailPress }]
          },
          this.props.currentMessage.text
        )
      );
    }
  }]);

  return MessageText;
}(React.Component);

export default MessageText;


var textStyle = {
  fontSize: 16,
  lineHeight: 20,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 10,
  marginRight: 10
};

var styles = {
  left: StyleSheet.create({
    container: {},
    text: Object.assign({
      color: 'black'
    }, textStyle),
    link: {
      color: 'black',
      textDecorationLine: 'underline'
    }
  }),
  right: StyleSheet.create({
    container: {},
    text: Object.assign({
      color: 'white'
    }, textStyle),
    link: {
      color: 'white',
      textDecorationLine: 'underline'
    }
  })
};

MessageText.contextTypes = {
  actionSheet: React.PropTypes.func
};

MessageText.defaultProps = {
  position: 'left',
  currentMessage: {
    text: ''
  },
  containerStyle: {},
  textStyle: {},
  linkStyle: {}
};

MessageText.propTypes = {
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  containerStyle: React.PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  textStyle: React.PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style
  }),
  linkStyle: React.PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style
  })
};