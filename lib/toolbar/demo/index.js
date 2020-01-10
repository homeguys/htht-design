"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("antd/lib/cascader/style/css");

var _cascader = _interopRequireDefault(require("antd/lib/cascader"));

require("antd/lib/dropdown/style/css");

var _dropdown = _interopRequireDefault(require("antd/lib/dropdown"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

require("antd/lib/menu/style/css");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../../../utils/utils");

var Toolbar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Toolbar, _React$Component);

  function Toolbar(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Toolbar);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Toolbar).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "toolbarMethod", function (e) {
      // const { baseMap } = this.props
      var target = (0, _utils.getParents)(e.target, 'LI');

      if (target && target.tagName === 'LI') {
        var className = target.className;

        switch (className) {
          case 'zoomOut':
            console.warn('放大');
            break;

          case 'zoomIn':
            console.warn('缩小');
            break;

          case 'recover':
            console.warn('恢复');
            break;

          case 'probe':
            console.warn('探针');
            break;

          default:
            break;
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dropdownClick", function (e) {
      /**
       * 工具栏下拉所有click事件
       */
      // const { baseMap } = this.props
      switch (e.key) {
        case 'st':
          console.warn('影像图');
          break;

        case 'road':
          console.warn('交通图');
          break;

        case 'terrain':
          console.warn('地形图');
          break;

        case 'distance':
          console.warn('测量距离');
          break;

        case 'area':
          console.warn('测量面积');
          break;

        case 'clear':
          console.warn('清除测量');
          break;

        default:
          break;
      }
    });
    _this.hash = (0, _utils.createHash)(6);
    return _this;
  }

  (0, _createClass2.default)(Toolbar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var toolbarList = document.getElementsByClassName("toolbar-list-".concat(this.hash))[0];
      /**
       * 工具栏一级目录所有click事件
       */

      toolbarList.addEventListener('click', this.toolbarMethod, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var toolbarList = document.getElementsByClassName("toolbar-list-".concat(this.hash))[0];
      toolbarList.removeEventListener('click', this.toolbarMethod);
    } // 组装下拉元素

  }, {
    key: "getMenu",
    value: function getMenu(data) {
      return _react.default.createElement(_menu.default, {
        onClick: this.dropdownClick
      }, data.map(function (item) {
        return _react.default.createElement(_menu.default.Item, {
          key: item.value
        }, item.name);
      }));
    } // 工具栏方法集

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          dataSource = _this$props.dataSource,
          options = _this$props.options,
          hasRegion = _this$props.hasRegion,
          position = _this$props.position;
      var list = [];
      var data = dataSource ? dataSource.map(function (item) {
        return !item.children ? _react.default.createElement("li", {
          key: item.name,
          className: item.value
        }, item.icon, _react.default.createElement("span", null, item.name)) : _react.default.createElement("li", {
          key: item.name
        }, item.icon, _react.default.createElement(_dropdown.default, {
          overlay: _this2.getMenu(item.children),
          trigger: ['click'],
          placement: "bottomCenter"
        }, _react.default.createElement("span", null, item.name, " ", _react.default.createElement(_icon.default, {
          type: "down"
        }))));
      }) : [];
      var cascader = [_react.default.createElement("li", {
        key: "cascader"
      }, _react.default.createElement(_cascader.default, {
        options: options,
        onChange: this.onChange,
        placeholder: "\u8BF7\u9009\u62E9"
      }))];
      var style = position === 'left' ? {
        left: '0.6rem'
      } : {
        right: '0.6rem'
      };

      if (!dataSource || dataSource.length === 0) {
        list.push(_react.default.createElement("li", null, "\u6682\u65E0\u6570\u636E"));
      } else if (dataSource && hasRegion) {
        list = [].concat(cascader, (0, _toConsumableArray2.default)(data));
      } else {
        list = data;
      }

      return _react.default.createElement("div", {
        className: "htht-toolbar",
        style: style
      }, _react.default.createElement("ul", {
        className: "toolbar-list toolbar-list-".concat(this.hash)
      }, list));
    }
  }]);
  return Toolbar;
}(_react.default.Component);

var _default = Toolbar;
exports.default = _default;