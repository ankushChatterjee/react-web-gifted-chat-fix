var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import { ListView, View, ScrollView } from 'react-native';

import shallowequal from 'shallowequal';
import md5 from 'md5';
import LoadEarlier from './LoadEarlier';
import Message from './Message';

var MessageContainer = function (_React$Component) {
  _inherits(MessageContainer, _React$Component);

  function MessageContainer(props) {
    _classCallCheck(this, MessageContainer);

    var _this = _possibleConstructorReturn(this, (MessageContainer.__proto__ || Object.getPrototypeOf(MessageContainer)).call(this, props));

    _this.renderRow = _this.renderRow.bind(_this);
    _this.renderFooter = _this.renderFooter.bind(_this);
    _this.renderLoadEarlier = _this.renderLoadEarlier.bind(_this);
    _this.renderScrollComponent = _this.renderScrollComponent.bind(_this);

    var dataSource = new ListView.DataSource({
      rowHasChanged: function rowHasChanged(r1, r2) {
        return r1.hash !== r2.hash;
      }
    });

    var messagesData = _this.prepareMessages(props.messages);
    _this.state = {
      dataSource: dataSource.cloneWithRows(messagesData.blob, messagesData.keys)
    };
    return _this;
  }

  _createClass(MessageContainer, [{
    key: 'prepareMessages',
    value: function prepareMessages(messages) {
      return {
        keys: messages.map(function (m) {
          return m._id;
        }),
        blob: messages.reduce(function (o, m, i) {
          var previousMessage = messages[i + 1] || {};
          var nextMessage = messages[i - 1] || {};
          // add next and previous messages to hash to ensure updates
          var toHash = JSON.stringify(m) + previousMessage._id + nextMessage._id;
          o[m._id] = Object.assign({}, m, {
            previousMessage: previousMessage,
            nextMessage: nextMessage,
            hash: md5(toHash)
          });
          return o;
        }, {})
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!shallowequal(this.props, nextProps)) {
        return true;
      }
      if (!shallowequal(this.state, nextState)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.messages === nextProps.messages) {
        return;
      }
      var messagesData = this.prepareMessages(nextProps.messages);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(messagesData.blob, messagesData.keys)
      });
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      if (this.props.renderFooter) {
        var footerProps = Object.assign({}, this.props);
        return this.props.renderFooter(footerProps);
      }
      return null;
    }
  }, {
    key: 'renderLoadEarlier',
    value: function renderLoadEarlier() {
      if (this.props.loadEarlier === true) {
        var loadEarlierProps = Object.assign({}, this.props);
        if (this.props.renderLoadEarlier) {
          return this.props.renderLoadEarlier(loadEarlierProps);
        }
        return React.createElement(LoadEarlier, loadEarlierProps);
      }
      return null;
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo(options) {
      // this._invertibleScrollViewRef.scrollTo(options);
    }
  }, {
    key: 'renderRow',
    value: function renderRow(message, sectionId, rowId) {
      if (!message._id && message._id !== 0) {
        console.warn('GiftedChat: `_id` is missing for message', JSON.stringify(message));
      }
      if (!message.user) {
        console.warn('GiftedChat: `user` is missing for message', JSON.stringify(message));
        message.user = {};
      }
      console.log('rowid ',rowId);
      var messageProps = Object.assign({}, this.props, {
        key: message._id,
        currentMessage: message,
        previousMessage: message.previousMessage,
        nextMessage: message.nextMessage,
        position: message.user._id === this.props.user._id ? 'right' : 'left'
      });

      if (this.props.renderMessage) {
        return this.props.renderMessage(messageProps);
      }
      return React.createElement(Message, messageProps);
    }
  }, {
    key: 'renderScrollComponent',
    value: function renderScrollComponent(props) {
      var invertibleScrollViewProps = this.props.invertibleScrollViewProps;
      return React.createElement(ScrollView, Object.assign({}, props, invertibleScrollViewProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;
      console.log(this._scrollView);
      return React.createElement(
        View,
        { style: { flex: 1 }, onLayout: function onLayout() {
            _this2._scrollView.scrollTo({y:window.innerHeight,animated:true});
          } },
        React.createElement(ListView, Object.assign({
          enableEmptySections: true,
          automaticallyAdjustContentInsets: false,
          initialListSize: 20,
          pageSize: 20,

          ref: function ref(component) {
            if (component) {
              _this2._scrollView = component._scrollViewRef;
            }
          }
        }, this.props.listViewProps, {
          onContentSizeChange: function onContentSizeChange() {
            return _this2._scrollView.scrollTo({y:window.innerHeight,animated:true});
          },
          dataSource: this.state.dataSource,
          renderScrollComponent: this.renderScrollComponent,
          renderRow: this.renderRow,
          renderHeader: this.renderFooter,
          renderFooter: this.renderLoadEarlier
        }))
      );
    }
  }]);

  return MessageContainer;
}(React.Component);

export default MessageContainer;


MessageContainer.defaultProps = {
  messages: [],
  user: {},
  renderFooter: null,
  renderMessage: null,
  listViewProps: {},
  onLoadEarlier: function onLoadEarlier() {}
};

MessageContainer.propTypes = {
  messages: React.PropTypes.array,
  user: React.PropTypes.object,
  renderFooter: React.PropTypes.func,
  renderMessage: React.PropTypes.func,
  onLoadEarlier: React.PropTypes.func,
  listViewProps: React.PropTypes.object
};