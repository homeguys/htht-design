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

require("echarts/lib/chart/pie");

require("echarts/lib/component/tooltip");

require("echarts/lib/component/title");

var _utils = require("../../../utils/utils");

/* eslint-disable no-useless-concat */

/* eslint-disable prefer-template */
var ChartGauge =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ChartGauge, _React$Component);

  function ChartGauge(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ChartGauge);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ChartGauge).call(this, props));
    _this.hash = (0, _utils.createHash)(8);
    return _this;
  }

  (0, _createClass2.default)(ChartGauge, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props = this.props,
          option = _this$props.option,
          color = _this$props.color,
          value = _this$props.value;

      var myChart = _echarts.default.init(document.getElementById("htht-chart-gauge-".concat(this.hash)));

      var innerOption = {
        backgroundColor: '#2c343c',
        grid: {
          left: '0%',
          bottom: '0%',
          right: '0%',
          top: '0%',
          containLabel: true
        },
        color: ['rgba(176, 212, 251, 1)'],
        series: [{
          name: '运行状态',
          type: 'pie',
          clockWise: true,
          radius: ['57%', '67%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [{
            value: value,
            label: {
              normal: {
                rich: {
                  a: {
                    color: '#fff',
                    align: 'center',
                    fontSize: 35,
                    fontWeight: 'bold',
                    fontFamily: '方正粗倩_GBK'
                  },
                  b: {
                    color: color,
                    align: 'center',
                    fontSize: 16
                  },
                  c: {
                    fontSize: 15,
                    fontFamily: '方正粗倩_GBK',
                    fontWeight: 'bold',
                    color: '#fff'
                  }
                },
                formatter: function formatter() {
                  return '{a|' + 30 + '}' + ' {c|%}' + "\n\n{b|".concat('正常', "}");
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'normal',
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                color: color,
                shadowColor: '#82ffff',
                borderWidth: 2,
                shadowBlur: 5
              }
            }
          }, {
            name: '未使用',
            value: 100 - value,
            itemStyle: {
              normal: {
                color: '#154e48',
                borderWidth: 1 //   borderColor: '#073A66'

              }
            }
          }]
        }]
      };
      var newOption = (0, _utils.deepObjectMerge)(innerOption, option); // 绘制图表

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
        className: "htht-chart-gauge",
        id: "htht-chart-gauge-".concat(this.hash)
      });
    }
  }]);
  return ChartGauge;
}(_react.default.Component);

var _default = ChartGauge;
exports.default = _default;