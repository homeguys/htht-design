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

require("echarts/lib/chart/bar");

require("echarts/lib/component/tooltip");

require("echarts/lib/component/title");

var _utils = require("../../../utils/utils");

var ChartBar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ChartBar, _React$Component);

  function ChartBar(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ChartBar);
    // console.log('aa')
    debugger;
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ChartBar).call(this, props));
    _this.state = {};
    _this.hash = (0, _utils.createHash)(6);
    _this.option = {
      backgroundColor: '#2c343c',
      tooltip: {
        trigger: 'item'
      },
      grid: {
        left: '7%',
        bottom: '0%',
        top: '8%',
        right: '5%',
        containLabel: true
      },
      xAxis: {
        axisLabel: {
          textStyle: {
            color: '#FFF'
          },
          rotate: 30
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#454A5C'
          }
        }
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: '#454A5C'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#FFF'
          }
        }
      },
      series: [{
        type: 'bar',
        barWidth: 30,
        itemStyle: {
          normal: {
            color: new _echarts.default.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#83bff6'
            }, {
              offset: 0.5,
              color: '#188df0'
            }, {
              offset: 1,
              color: '#188df0'
            }])
          },
          emphasis: {
            color: new _echarts.default.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#2378f7'
            }, {
              offset: 0.7,
              color: '#2378f7'
            }, {
              offset: 1,
              color: '#83bff6'
            }])
          }
        }
      } // {
      //   // For shadow
      //   type: 'bar',
      //   itemStyle: {
      //     normal: { color: '#595A62' }
      //   },
      //   barGap: '-100%',
      //   barCategoryGap: '50%',
      //   data: dataShadow
      // }
      ]
    };
    return _this;
  }

  (0, _createClass2.default)(ChartBar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props = this.props,
          dataSource = _this$props.dataSource,
          option = _this$props.option;

      var myChart = _echarts.default.init(document.getElementById("htht-chart-bar-".concat(this.hash)));

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
        className: "htht-chart-bar",
        id: "htht-chart-bar-".concat(this.hash)
      });
    }
  }]);
  return ChartBar;
}(_react.default.Component);

var _default = ChartBar;
exports.default = _default;