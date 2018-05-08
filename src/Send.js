var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';

var Send = function (_React$Component) {
  _inherits(Send, _React$Component);

  function Send() {
    _classCallCheck(this, Send);

    return _possibleConstructorReturn(this, (Send.__proto__ || Object.getPrototypeOf(Send)).apply(this, arguments));
  }

  _createClass(Send, [{
    key: 'render',

    // shouldComponentUpdate(nextProps, nextState) {
    //   if (this.props.text.trim().length === 0 && nextProps.text.trim().length > 0 || this.props.text.trim().length > 0 && nextProps.text.trim().length === 0) {
    //     return true;
    //   }
    //   return false;
    // }
    value: function render() {
      var _this2 = this;

      if (this.props.text.trim().length > 0) {
        return React.createElement(
          TouchableOpacity,
          {
            style: [styles.container, this.props.containerStyle],
            onPress: function onPress() {
              _this2.props.onSend({ text: _this2.props.text.trim() }, true);
            },
            onClick: function onClick() {
              _this2.props.onSend({ text: _this2.props.text.trim() }, true);
            },
            accessibilityTraits: 'button'
          },
          React.createElement(
            Text,
            { style: [styles.text, this.props.textStyle] },
            this.props.label
          )
        );
      }
      return React.createElement(View, null);
    }
  }]);

  return Send;
}(React.Component);

export default Send;


var styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end'
  },
  text: {
    color: '#0084ff',
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10
  }
});

Send.defaultProps = {
  text: '',
  onSend: function onSend() {},
  label: 'Send',
  containerStyle: {},
  textStyle: {}
};

Send.propTypes = {
  text: React.PropTypes.string,
  onSend: React.PropTypes.func,
  label: React.PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style
};