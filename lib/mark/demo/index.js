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

var _BaseStaInfo = _interopRequireDefault(require("../../../webMap/entity/BaseStaInfo"));

var _mark_type_enum = require("../../../webMap/enum/mark_type_enum");

var ButtonGroup = _button.default.Group;

var Mark =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Mark, _React$Component);

  function Mark() {
    var _this;

    (0, _classCallCheck2.default)(this, Mark);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Mark).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "addMark", function () {
      var data = [];

      for (var i = 0; i < 180; i += 10) {
        for (var j = 0; j < 90; j += 10) {
          var info = {
            cityName: "".concat(i, ",").concat(j),
            cityid: "".concat(i, ",").concat(j),
            lat: j,
            lon: i
          };
          var staInfo = new _BaseStaInfo.default({
            id: info.cityid,
            name: info.cityName,
            // eslint-disable-next-line global-require,import/no-unresolved
            picUrl: require('../../../images/weatherIcons/c00.gif'),
            lon: info.lon,
            lat: info.lat
          });
          data.push(staInfo);

          _this.citeMap.set(info.cityid, staInfo);
        }
      }

      _this.myMap.addMark('city', data, _mark_type_enum.markTypeEnum.PICANDTEXT);
    });
    _this.myMap = "";
    _this.citeMap = new Map(); // 城市的map

    return _this;
  }

  (0, _createClass2.default)(Mark, [{
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
        onClick: this.addMark
      }, "\u52A0\u8F7D\u7AD9\u70B9"))), _react.default.createElement("div", {
        id: "mapContainer",
        style: style
      }));
    }
  }]);
  return Mark;
}(_react.default.Component);

var _default = Mark;
exports.default = _default;