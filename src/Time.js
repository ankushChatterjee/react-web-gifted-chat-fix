var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import moment from 'moment/min/moment-with-locales.min';

var Time = function (_React$Component) {
  _inherits(Time, _React$Component);

  function Time() {
    _classCallCheck(this, Time);

    return _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).apply(this, arguments));
  }

  _createClass(Time, [{
    key: 'render',
    value: function render() {

      var locale = window.navigator.userLanguage || window.navigator.language;
      return React.createElement(
        View,
        { style: [styles[this.props.position].container, this.props.containerStyle[this.props.position]] },
        React.createElement(
          Text,
          { style: [styles[this.props.position].text, this.props.textStyle[this.props.position]] },
          moment(this.props.currentMessage.createdAt).locale(locale).format('LT')
        )
      );
    }
  }]);

  return Time;
}(React.Component);

export default Time;


var containerStyle = {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 5
};

var textStyle = {
  fontSize: 10,
  backgroundColor: 'transparent',
  textAlign: 'right'
};

var styles = {
  left: StyleSheet.create({
    container: Object.assign({}, containerStyle),
    text: Object.assign({
      color: '#aaa'
    }, textStyle)
  }),
  right: StyleSheet.create({
    container: Object.assign({}, containerStyle),
    text: Object.assign({
      color: '#fff'
    }, textStyle)
  })
};

Time.contextTypes = {
  getLocale: React.PropTypes.func
};

Time.defaultProps = {
  position: 'left',
  currentMessage: {
    createdAt: null
  },
  containerStyle: {},
  textStyle: {}
};

Time.propTypes = {
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  containerStyle: React.PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  textStyle: React.PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style
  })
};