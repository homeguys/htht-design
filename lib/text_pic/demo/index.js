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

var TextAndPic =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(TextAndPic, _React$Component);

  function TextAndPic() {
    var _this;

    (0, _classCallCheck2.default)(this, TextAndPic);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TextAndPic).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "text", function () {
      for (var i = 0; i < 100; i++) {
        _this.myMap.text("data".concat(i), 0.5, [118, 32 + 0.1 * i], [255, 0, 0, 1]);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "addPic", function () {
      _this.myMap.addPic('myPic', './data/320000000000.png', [118, 32, 133, 45]);
    });
    _this.myMap = "";
    return _this;
  }

  (0, _createClass2.default)(TextAndPic, [{
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
        className: "htht-text-pic"
      }, _react.default.createElement("div", {
        className: "bans"
      }, _react.default.createElement(ButtonGroup, null, _react.default.createElement(_button.default, {
        onClick: this.text
      }, "\u6587\u5B57"), _react.default.createElement(_button.default, {
        onClick: this.addPic
      }, "\u8D34\u56FE"))), _react.default.createElement("div", {
        id: "mapContainer",
        style: style
      }));
    }
  }]);
  return TextAndPic;
}(_react.default.Component);

var _default = TextAndPic;
exports.default = _default;