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

var _productConfig = require("../../../webMap/config/productConfig");

var _product_enum = require("../../../webMap/enum/product_enum");

var ButtonGroup = _button.default.Group;

var GeoserveService =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(GeoserveService, _React$Component);

  function GeoserveService() {
    var _this;

    (0, _classCallCheck2.default)(this, GeoserveService);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GeoserveService).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "loadServer", function () {
      var style = (0, _productConfig.returnEleStyle)(_product_enum.productEnum.NDVI);
      var searchInfo = '2019-09-21T12:00:00.003Z'; // NDVI

      _this.myMap.loadServer('NDVI', _productConfig.ELECONFIG.NDVI.url, _productConfig.ELECONFIG.NDVI.layerName, searchInfo, style);
    });
    _this.myMap = "";
    return _this;
  }

  (0, _createClass2.default)(GeoserveService, [{
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
        className: "htht-initMap"
      }, _react.default.createElement("div", {
        className: "bans"
      }, _react.default.createElement(ButtonGroup, null, _react.default.createElement(_button.default, {
        onClick: this.loadServer
      }, "\u52A0\u8F7D\u586B\u5145\u56FE\u670D\u52A1"))), _react.default.createElement("div", {
        id: "mapContainer",
        style: style
      }));
    }
  }]);
  return GeoserveService;
}(_react.default.Component);

var _default = GeoserveService;
exports.default = _default;