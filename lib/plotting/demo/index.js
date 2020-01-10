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

var _BasePlottingInfo = _interopRequireDefault(require("../../../webMap/entity/BasePlottingInfo"));

var _plotting_type_enum = require("../../../webMap/enum/plotting_type_enum");

var ButtonGroup = _button.default.Group;

var Plotting =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Plotting, _React$Component);

  function Plotting() {
    var _this;

    (0, _classCallCheck2.default)(this, Plotting);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Plotting).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "drawPlotting", function () {
      var data = [];

      for (var i = 0; i < 100; i++) {
        var info = {
          'dataInfo': {
            AT: 208,
            CH: 99999,
            CL: 0,
            CM: 99999,
            DP24: 99999,
            DT24: 99999,
            H: 700,
            INVALID_VALUE: 99999,
            N: 20,
            NH: 20,
            OP: 99999,
            P3: 99999,
            R6: 99999,
            TD: -23,
            VV: 80,
            WD: 225,
            WG1: 99999,
            WG2: 99999,
            WS: 40,
            WW: 0
          },
          'id': i,
          'name': i,
          'position': {
            'altitude': 0,
            'latitude': Math.random() * 90,
            'longitude': Math.random() * 180
          }
        };
        var plottingInfo = new _BasePlottingInfo.default({
          id: info.id,
          name: info.name,
          position: [info.position.longitude, info.position.latitude],
          dataInfo: info.dataInfo
        });
        data.push(plottingInfo);

        _this.statMap.set(info.id, plottingInfo);
      }

      _this.myMap.drawPlotting('plottingData', data, _plotting_type_enum.plottingTypeEnum.GROUND, 10);
    });
    _this.myMap = "";
    _this.statMap = new Map(); // 填图数据的map

    return _this;
  }

  (0, _createClass2.default)(Plotting, [{
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
        onClick: this.drawPlotting
      }, "\u7ED8\u5236\u586B\u56FE"))), _react.default.createElement("div", {
        id: "mapContainer",
        style: style
      }));
    }
  }]);
  return Plotting;
}(_react.default.Component);

var _default = Plotting;
exports.default = _default;