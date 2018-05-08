var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Image, StyleSheet, View, ViewPropTypes, Dimensions } from 'react-native';

var MessageImage = function (_React$Component) {
  _inherits(MessageImage, _React$Component);

  function MessageImage() {
    _classCallCheck(this, MessageImage);

    return _possibleConstructorReturn(this, (MessageImage.__proto__ || Object.getPrototypeOf(MessageImage)).apply(this, arguments));
  }

  _createClass(MessageImage, [{
    key: 'render',
    value: function render() {
      var _Dimensions$get = Dimensions.get('window'),
          width = _Dimensions$get.width,
          height = _Dimensions$get.height;

      return React.createElement(
        View,
        { style: [styles.container, this.props.containerStyle] },
        React.createElement(Image, Object.assign({}, this.props.imageProps, {
          style: [styles.image, this.props.imageStyle],
          source: { uri: this.props.currentMessage.image }
        }))
      );
    }
  }]);

  return MessageImage;
}(React.Component);

export default MessageImage;


var styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover'
  },
  imageActive: {
    resizeMode: 'contain'
  }
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {}
};

MessageImage.propTypes = {
  currentMessage: React.PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: React.PropTypes.object,
  lightboxProps: React.PropTypes.object
};