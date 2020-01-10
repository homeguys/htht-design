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

var BasicDraw =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(BasicDraw, _React$Component);

  function BasicDraw() {
    var _this;

    (0, _classCallCheck2.default)(this, BasicDraw);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BasicDraw).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "drawPoint", function () {
      var pointData = [[118, 32], [119, 32]];

      _this.myMap.drawPoint(pointData);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "drawLine", function () {
      var data = [[118, 32], [119, 32], [119, 33]];

      _this.myMap.drawLine(data, [0, 0, 255, 1], 10, false);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "drawPolygon", function () {
      var data = [[118, 32, 0], [119, 32, 0], [119, 33, 0], [118, 32, 0]];

      _this.myMap.drawPolygon(data);
    });
    _this.myMap = "";
    return _this;
  }

  (0, _createClass2.default)(BasicDraw, [{
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
        className: "htht-basic-draw"
      }, _react.default.createElement("div", {
        className: "bans"
      }, _react.default.createElement(ButtonGroup, null, _react.default.createElement(_button.default, {
        onClick: this.drawPoint
      }, "\u753B\u70B9"), _react.default.createElement(_button.default, {
        onClick: this.drawLine
      }, "\u753B\u7EBF"), _react.default.createElement(_button.default, {
        onClick: this.drawPolygon
      }, "\u753B\u9762"))), _react.default.createElement("div", {
        id: "mapContainer",
        style: style
      }));
    }
  }]);
  return BasicDraw;
}(_react.default.Component);

var _default = BasicDraw;
exports.default = _default;