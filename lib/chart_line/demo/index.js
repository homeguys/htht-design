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

var _echarts = _interopRequireDefault(require("echarts/lib/echarts"));

require("echarts/lib/chart/line");

require("echarts/lib/component/tooltip");

require("echarts/lib/component/title");

var _utils = require("../../../utils/utils");

var ChartLine =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ChartLine, _React$Component);

  function ChartLine(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ChartLine);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ChartLine).call(this, props));
    _this.state = {};
    _this.hash = (0, _utils.createHash)(6);
    _this.option = {
      backgroundColor: '#2c343c',
      xAxis: {
        type: 'category',
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        type: 'line',
        areaStyle: {
          color: '#00cccd'
        },
        lineStyle: {
          color: '#00cccd'
        }
      }]
    };
    return _this;
  }

  (0, _createClass2.default)(ChartLine, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props = this.props,
          dataSource = _this$props.dataSource,
          option = _this$props.option;

      var myChart = _echarts.default.init(document.getElementById("htht-chart-line-".concat(this.hash)));

      var newOption = (0, _utils.deepObjectMerge)(this.option, option);
      newOption.xAxis.data = dataSource.xAxisData;
      newOption.series[0].data = dataSource.seriesData; // 绘制图表

      myChart.setOption(newOption);
      this.screenChange();
    }
    /** echants响应屏幕改变 */

  }, {
    key: "screenChange",
    value: function screenChange() {
      var _this2 = this;

      window.addEventListener('resize', function () {
        _this2.chartPie.resize();
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "htht-chart-line",
        id: "htht-chart-line-".concat(this.hash)
      });
    }
  }]);
  return ChartLine;
}(_react.default.Component);

var _default = ChartLine;
exports.default = _default;