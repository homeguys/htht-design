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

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

var _NjHTMap = _interopRequireDefault(require("../../../webMap/NjHTMap"));

var _map_type_enum = require("../../../webMap/enum/map_type_enum");

var Option = _select.default.Option;
var ButtonGroup = _button.default.Group;

var SwitchMap =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(SwitchMap, _React$Component);

  function SwitchMap() {
    var _this;

    (0, _classCallCheck2.default)(this, SwitchMap);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SwitchMap).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "switchMap", function (value) {
      var cutLayer = _this.state.cutLayer;

      if (cutLayer === value) {
        return;
      }

      _this.setState({
        cutLayer: value
      });

      _this.myMap.switchBaseMap(value);
    });
    _this.state = {
      cutLayer: _map_type_enum.mapTypeEnum[0].key
    };
    _this.myMap = "";
    return _this;
  }

  (0, _createClass2.default)(SwitchMap, [{
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
      var cutLayer = this.state.cutLayer;
      return _react.default.createElement("div", {
        className: "htht-switch-map"
      }, _react.default.createElement("div", {
        className: "bans"
      }, _react.default.createElement(ButtonGroup, null, _react.default.createElement(_select.default, {
        value: cutLayer,
        style: {
          width: 120
        },
        onChange: this.switchMap
      }, _map_type_enum.mapTypeEnum.map(function (value) {
        return _react.default.createElement(Option, {
          key: value.key,
          value: value.key
        }, value.name);
      })))), _react.default.createElement("div", {
        id: "mapContainer",
        style: style
      }));
    }
  }]);
  return SwitchMap;
}(_react.default.Component);

var _default = SwitchMap;
exports.default = _default;