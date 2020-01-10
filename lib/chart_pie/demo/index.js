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

var ChartPie =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ChartPie, _React$Component);

  function ChartPie(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ChartPie);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ChartPie).call(this, props));
    _this.state = {};
    _this.hash = (0, _utils.createHash)(6);
    _this.option = {
      backgroundColor: '#2c343c',
      title: {
        text: 'This is a Pie!',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      color: '#c23531',
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '55%'],
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function animationDelay() {
          return Math.random() * 200;
        }
      }]
    };
    return _this;
  }

  (0, _createClass2.default)(ChartPie, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props = this.props,
          dataSource = _this$props.dataSource,
          option = _this$props.option;

      var myChart = _echarts.default.init(document.getElementById("htht-chart-pie-".concat(this.hash)));

      var newOption = (0, _utils.deepObjectMerge)(this.option, option);
      newOption.series[0].data = dataSource;
      console.warn(newOption); // 绘制图表

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
        className: "htht-chart-pie",
        id: "htht-chart-pie-".concat(this.hash)
      });
    }
  }]);
  return ChartPie;
}(_react.default.Component);

var _default = ChartPie;
exports.default = _default;