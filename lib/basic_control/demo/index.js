"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _react = _interopRequireDefault(require("react"));

var _NjHTMap = _interopRequireDefault(require("../../../webMap/NjHTMap"));

var ButtonGroup = _button.default.Group;

var BasicControl =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(BasicControl, _React$Component);

  function BasicControl() {
    var _this;

    (0, _classCallCheck2.default)(this, BasicControl);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BasicControl).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "in", function () {
      _this.myMap.in();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "out", function () {
      _this.myMap.out();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "init", function () {
      _this.myMap.init();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setView", function () {
      _this.myMap.setView([118, 33], true);
    });
    _this.myMap = "";
    return _this;
  }

  (0, _createClass2.default)(BasicControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var dataSource = this.props.dataSource;
      this.myMap = new _NjHTMap.default(dataSource);
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        width: "100%",
        height: "100%",
        position: "relative"
      };
      return _react.default.createElement("div", {
        className: "htht-basic-control"
      }, _react.default.createElement("div", {
        className: "bans"
      }, _react.default.createElement(ButtonGroup, null, _react.default.createElement(_button.default, {
        onClick: this.in
      }, " \u653E\u5927"), _react.default.createElement(_button.default, {
        onClick: this.out
      }, " \u7F29\u5C0F"), _react.default.createElement(_button.default, {
        onClick: this.init
      }, " \u6062\u590D"), _react.default.createElement(_button.default, {
        onClick: this.setView
      }, " \u5B9A\u4F4D"))), _react.default.createElement("div", {
        id: "mapContainer",
        style: style
      }));
    }
  }]);
  return BasicControl;
}(_react.default.Component);

var _default = BasicControl;
exports.default = _default;