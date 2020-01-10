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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _NjHTMap = _interopRequireDefault(require("../../../webMap/NjHTMap"));

var InitMap =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(InitMap, _React$Component);

  function InitMap() {
    (0, _classCallCheck2.default)(this, InitMap);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InitMap).apply(this, arguments));
  }

  (0, _createClass2.default)(InitMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var dataSource = this.props.dataSource;
      new _NjHTMap.default(dataSource);
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
        className: "htht-initMap"
      }, _react.default.createElement("div", {
        id: "mapContainer",
        style: style
      }));
    }
  }]);
  return InitMap;
}(_react.default.Component);

var _default = InitMap;
exports.default = _default;