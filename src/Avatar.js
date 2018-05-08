var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { Image, StyleSheet, View, ViewPropTypes } from "react-native";
import GiftedAvatar from "./GiftedAvatar";
import { isSameUser, isSameDay, warnDeprecated } from "./utils";

var Avatar = function (_React$Component) {
  _inherits(Avatar, _React$Component);

  function Avatar() {
    _classCallCheck(this, Avatar);

    return _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).apply(this, arguments));
  }

  _createClass(Avatar, [{
    key: "renderAvatar",
    value: function renderAvatar() {
      var _this2 = this;

      if (this.props.renderAvatar) {
        var _props = this.props,
            renderAvatar = _props.renderAvatar,
            avatarProps = _objectWithoutProperties(_props, ["renderAvatar"]);

        return this.props.renderAvatar(avatarProps);
      }
      return React.createElement(GiftedAvatar, {
        avatarStyle: StyleSheet.flatten([styles[this.props.position].image, this.props.imageStyle[this.props.position]]),
        user: this.props.currentMessage.user,
        onPress: function onPress() {
          return _this2.props.onPressAvatar && _this2.props.onPressAvatar(_this2.props.currentMessage.user);
        },
        onClick: function onClick() {
          return _this2.props.onPressAvatar && _this2.props.onPressAvatar(_this2.props.currentMessage.user);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var renderAvatarOnTop = this.props.renderAvatarOnTop;
      var messageToCompare = renderAvatarOnTop ? this.props.previousMessage : this.props.nextMessage;
      var computedStyle = renderAvatarOnTop ? "onTop" : "onBottom";

      if (this.props.renderAvatar === null) {
        return null;
      }

      if (isSameUser(this.props.currentMessage, messageToCompare) && isSameDay(this.props.currentMessage, messageToCompare)) {
        return React.createElement(
          View,
          { style: [styles[this.props.position].container, this.props.containerStyle[this.props.position]] },
          React.createElement(GiftedAvatar, {
            avatarStyle: StyleSheet.flatten([styles[this.props.position].image, this.props.imageStyle[this.props.position]])
          })
        );
      }

      return React.createElement(
        View,
        {
          style: [styles[this.props.position].container, styles[this.props.position][computedStyle], this.props.containerStyle[this.props.position]] },
        this.renderAvatar()
      );
    }
  }]);

  return Avatar;
}(React.Component);

export default Avatar;


var styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8
    },
    onTop: {
      alignSelf: "flex-start"
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18
    }
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8
    },
    onTop: {
      alignSelf: "flex-start"
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18
    }
  })
};

Avatar.defaultProps = {
  renderAvatarOnTop: false,
  position: 'left',
  currentMessage: {
    user: null
  },
  nextMessage: {},
  containerStyle: {},
  imageStyle: {},
  //TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser)
};

Avatar.propTypes = {
  renderAvatarOnTop: React.PropTypes.bool,
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  nextMessage: React.PropTypes.object,
  onPressAvatar: React.PropTypes.func,
  containerStyle: React.PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  imageStyle: React.PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  //TODO: remove in next major release
  isSameDay: React.PropTypes.func,
  isSameUser: React.PropTypes.func
};