var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';

var Actions = function (_React$Component) {
  _inherits(Actions, _React$Component);

  function Actions(props) {
    _classCallCheck(this, Actions);

    var _this = _possibleConstructorReturn(this, (Actions.__proto__ || Object.getPrototypeOf(Actions)).call(this, props));

    _this.onActionsPress = _this.onActionsPress.bind(_this);
    return _this;
  }

  _createClass(Actions, [{
    key: 'onActionsPress',
    value: function onActionsPress() {
      var _this2 = this;

      var options = Object.keys(this.props.options);
      var cancelButtonIndex = Object.keys(this.props.options).length - 1;
      this.context.actionSheet().showActionSheetWithOptions({
        options: options,
        cancelButtonIndex: cancelButtonIndex,
        tintColor: this.props.optionTintColor
      }, function (buttonIndex) {
        var i = 0;
        for (var key in _this2.props.options) {
          if (_this2.props.options.hasOwnProperty(key)) {
            if (buttonIndex === i) {
              _this2.props.options[key](_this2.props);
              return;
            }
            i++;
          }
        }
      });
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon() {
      if (this.props.icon) {
        return this.props.icon();
      }
      return React.createElement(
        View,
        {
          style: [styles.wrapper, this.props.wrapperStyle]
        },
        React.createElement(
          Text,
          {
            style: [styles.iconText, this.props.iconTextStyle]
          },
          '+'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        TouchableOpacity,
        {
          style: [styles.container, this.props.containerStyle],
          onPress: this.props.onPressActionButton || this.onActionsPress
        },
        this.renderIcon()
      );
    }
  }]);

  return Actions;
}(React.Component);

export default Actions;


var styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
});

Actions.contextTypes = {
  actionSheet: React.PropTypes.func
};

Actions.defaultProps = {
  onSend: function onSend() {},
  options: {},
  optionTintColor: '#007AFF',
  icon: null,
  containerStyle: {},
  iconTextStyle: {}
};

Actions.propTypes = {
  onSend: React.PropTypes.func,
  options: React.PropTypes.object,
  optionTintColor: React.PropTypes.string,
  icon: React.PropTypes.func,
  onPressActionButton: React.PropTypes.func,
  containerStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style
};