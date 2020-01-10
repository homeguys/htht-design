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

var _axios = _interopRequireDefault(require("axios"));

var _NjHTMap = _interopRequireDefault(require("../../../webMap/NjHTMap"));

var ButtonGroup = _button.default.Group;

var ContourLine =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ContourLine, _React$Component);

  function ContourLine() {
    var _this;

    (0, _classCallCheck2.default)(this, ContourLine);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ContourLine).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "contourLine", function () {
      _axios.default.get('./data/line.json').then(function (res) {
        _this.myMap.contourLine('line', res.data);
      });
    });
    _this.myMap = "";
    return _this;
  }

  (0, _createClass2.default)(ContourLine, [{
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
        className: "htht-contour-line"
      }, _react.default.createElement("div", {
        className: "bans"
      }, _react.default.createElement(ButtonGroup, null, _react.default.createElement(_button.default, {
        onClick: this.contourLine
      }, "\u7B49\u503C\u7EBF"))), _react.default.createElement("div", {
        id: "mapContainer",
        style: style
      }));
    }
  }]);
  return ContourLine;
}(_react.default.Component);

var _default = ContourLine;
exports.default = _default;