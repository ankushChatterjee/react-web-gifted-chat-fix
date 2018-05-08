var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';

var LoadEarlier = function (_React$Component) {
  _inherits(LoadEarlier, _React$Component);

  function LoadEarlier() {
    _classCallCheck(this, LoadEarlier);

    return _possibleConstructorReturn(this, (LoadEarlier.__proto__ || Object.getPrototypeOf(LoadEarlier)).apply(this, arguments));
  }

  _createClass(LoadEarlier, [{
    key: 'renderLoading',
    value: function renderLoading() {
      if (this.props.isLoadingEarlier === false) {
        return React.createElement(
          Text,
          { style: [styles.text, this.props.textStyle] },
          this.props.label
        );
      }
      return React.createElement(
        View,
        null,
        React.createElement(
          Text,
          { style: [styles.text, this.props.textStyle, {
              opacity: 0
            }] },
          this.props.label
        ),
        React.createElement(ActivityIndicator, {
          color: 'white',
          size: 'small',
          style: [styles.activityIndicator, this.props.activityIndicatorStyle]
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        TouchableOpacity,
        {
          style: [styles.container, this.props.containerStyle],
          onPress: function onPress() {
            if (_this2.props.onLoadEarlier) {
              _this2.props.onLoadEarlier();
            }
          },
          disabled: this.props.isLoadingEarlier === true,
          accessibilityTraits: 'button'
        },
        React.createElement(
          View,
          { style: [styles.wrapper, this.props.wrapperStyle] },
          this.renderLoading()
        )
      );
    }
  }]);

  return LoadEarlier;
}(React.Component);

export default LoadEarlier;


var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b2b2b2',
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 12
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -16
    })
  }
});

LoadEarlier.defaultProps = {
  onLoadEarlier: function onLoadEarlier() {},
  isLoadingEarlier: false,
  label: 'Load earlier messages',
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  activityIndicatorStyle: {}
};

LoadEarlier.propTypes = {
  onLoadEarlier: React.PropTypes.func,
  isLoadingEarlier: React.PropTypes.bool,
  label: React.PropTypes.string,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  activityIndicatorStyle: ViewPropTypes.style
};