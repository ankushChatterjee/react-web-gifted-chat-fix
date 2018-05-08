var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
**  This component will be published in a separate package
*/
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

// TODO
// 3 words name initials
// handle only alpha numeric chars

var GiftedAvatar = function (_React$Component) {
  _inherits(GiftedAvatar, _React$Component);

  function GiftedAvatar() {
    _classCallCheck(this, GiftedAvatar);

    return _possibleConstructorReturn(this, (GiftedAvatar.__proto__ || Object.getPrototypeOf(GiftedAvatar)).apply(this, arguments));
  }

  _createClass(GiftedAvatar, [{
    key: 'setAvatarColor',
    value: function setAvatarColor() {
      var userName = this.props.user.name || '';
      var name = userName.toUpperCase().split(' ');
      if (name.length === 1) {
        this.avatarName = '' + name[0].charAt(0);
      } else if (name.length > 1) {
        this.avatarName = '' + name[0].charAt(0) + name[1].charAt(0);
      } else {
        this.avatarName = '';
      }

      var sumChars = 0;
      for (var i = 0; i < userName.length; i++) {
        sumChars += userName.charCodeAt(i);
      }

      // inspired by https://github.com/wbinnssmith/react-user-avatar
      // colors from https://flatuicolors.com/
      var colors = ['#e67e22', // carrot
      '#2ecc71', // emerald
      '#3498db', // peter river
      '#8e44ad', // wisteria
      '#e74c3c', // alizarin
      '#1abc9c', // turquoise
      '#2c3e50'];

      this.avatarColor = colors[sumChars % colors.length];
    }
  }, {
    key: 'renderAvatar',
    value: function renderAvatar() {
      if (typeof this.props.user.avatar === 'function') {
        return this.props.user.avatar();
      } else if (typeof this.props.user.avatar === 'string') {
        return React.createElement(Image, {
          source: { uri: this.props.user.avatar },
          style: [defaultStyles.avatarStyle, this.props.avatarStyle]
        });
      } else if (typeof this.props.user.avatar === 'number') {
        return React.createElement(Image, {
          source: this.props.user.avatar,
          style: [defaultStyles.avatarStyle, this.props.avatarStyle]
        });
      }
      return null;
    }
  }, {
    key: 'renderInitials',
    value: function renderInitials() {
      return React.createElement(
        Text,
        { style: [defaultStyles.textStyle, this.props.textStyle] },
        this.avatarName
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.user.name && !this.props.user.avatar) {
        // render placeholder
        return React.createElement(View, {
          style: [defaultStyles.avatarStyle, { backgroundColor: 'transparent' }, this.props.avatarStyle],
          accessibilityTraits: 'image'
        });
      }
      if (this.props.user.avatar) {
        return React.createElement(
          TouchableOpacity,
          {
            disabled: this.props.onPress ? false : true,
            onPress: function onPress() {
              var _props = _this2.props,
                  onPress = _props.onPress,
                  other = _objectWithoutProperties(_props, ['onPress']);

              _this2.props.onPress && _this2.props.onPress(other);
            },
            accessibilityTraits: 'image'
          },
          this.renderAvatar()
        );
      }

      if (!this.avatarColor) {
        this.setAvatarColor();
      }

      return React.createElement(
        TouchableOpacity,
        {
          disabled: this.props.onPress ? false : true,
          onPress: function onPress() {
            var _props2 = _this2.props,
                onPress = _props2.onPress,
                other = _objectWithoutProperties(_props2, ['onPress']);

            _this2.props.onPress && _this2.props.onPress(other);
          },
          style: [defaultStyles.avatarStyle, { backgroundColor: this.avatarColor }, this.props.avatarStyle],
          accessibilityTraits: 'image'
        },
        this.renderInitials()
      );
    }
  }]);

  return GiftedAvatar;
}(React.Component);

export default GiftedAvatar;


var defaultStyles = {
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontWeight: '100'
  }
};

GiftedAvatar.defaultProps = {
  user: {
    name: null,
    avatar: null
  },
  onPress: null,
  avatarStyle: {},
  textStyle: {}
};

GiftedAvatar.propTypes = {
  user: React.PropTypes.object,
  onPress: React.PropTypes.func,
  avatarStyle: Image.propTypes.style,
  textStyle: Text.propTypes.style
};