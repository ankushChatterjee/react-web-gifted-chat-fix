var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';

import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';

var InputToolbar = function (_React$Component) {
  _inherits(InputToolbar, _React$Component);

  function InputToolbar() {
    _classCallCheck(this, InputToolbar);

    return _possibleConstructorReturn(this, (InputToolbar.__proto__ || Object.getPrototypeOf(InputToolbar)).apply(this, arguments));
  }

  _createClass(InputToolbar, [{
    key: 'renderActions',
    value: function renderActions() {
      if (this.props.renderActions) {
        return this.props.renderActions(this.props);
      } else if (this.props.onPressActionButton) {
        return React.createElement(Actions, this.props);
      }
      return null;
    }
  }, {
    key: 'renderSend',
    value: function renderSend() {
      if (this.props.renderSend) {
        return this.props.renderSend(this.props);
      }
      return React.createElement(Send, this.props);
    }
  }, {
    key: 'renderComposer',
    value: function renderComposer() {
      if (this.props.renderComposer) {
        return this.props.renderComposer(this.props);
      }

      return React.createElement(Composer, this.props);
    }
  }, {
    key: 'renderAccessory',
    value: function renderAccessory() {
      if (this.props.renderAccessory) {
        return React.createElement(
          View,
          { style: [styles.accessory, this.props.accessoryStyle] },
          this.props.renderAccessory(this.props)
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        View,
        { style: [styles.container, this.props.containerStyle] },
        React.createElement(
          View,
          { style: [styles.primary, this.props.primaryStyle] },
          this.renderActions(),
          this.renderComposer(),
          this.renderSend()
        ),
        this.renderAccessory()
      );
    }
  }]);

  return InputToolbar;
}(React.Component);

export default InputToolbar;


var styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#b2b2b2',
    backgroundColor: '#FFFFFF'
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  accessory: {
    height: 44
  }
});

InputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {}
};

InputToolbar.propTypes = {
  renderAccessory: React.PropTypes.func,
  renderActions: React.PropTypes.func,
  renderSend: React.PropTypes.func,
  renderComposer: React.PropTypes.func,
  onPressActionButton: React.PropTypes.func,
  containerStyle: ViewPropTypes.style,
  primaryStyle: ViewPropTypes.style,
  accessoryStyle: ViewPropTypes.style
};