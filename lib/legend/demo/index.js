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

var _utils = require("../../../utils/utils");

var Legend =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Legend, _React$Component);

  function Legend() {
    var _this;

    (0, _classCallCheck2.default)(this, Legend);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Legend).call(this));
    _this.state = {
      width: 150,
      height: 200
    };
    _this.hash = (0, _utils.createHash)(6);
    return _this;
  }

  (0, _createClass2.default)(Legend, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var c = document.querySelector(".myLegend-".concat(this.hash));
      var ctx = c.getContext("2d");
      var dataSource = this.props.dataSource;
      var isHorizontal = dataSource.isHorizontal,
          isLableOnLine = dataSource.isLableOnLine,
          isGradient = dataSource.isGradient,
          title = dataSource.title,
          value = dataSource.value,
          valueMaxLength = dataSource.valueMaxLength,
          color = dataSource.color;
      var titleLength = title.length; // 标题字符数

      var colorLength = isGradient ? color.length - 1 : color.length; // 颜色数量

      if (isHorizontal) {
        var xNum = colorLength + 1; // X方向份数

        var yNum = 5.5; // y方向份数

        var width = xNum * 20;
        var height = yNum * 20;
        var xStep = width / xNum;
        var yStep = height / yNum;
        var xS = xStep / 2;
        var yS = yStep * 1.5; // eslint-disable-next-line radix

        var titleFontSize = parseInt(xStep * (xNum - 1) / titleLength); // eslint-disable-next-line radix

        var valueFontSize = parseInt(xStep);
        this.setState({
          width: width,
          height: height
        }, function () {
          ctx.font = "".concat(titleFontSize, "px Arial"); // ctx.textAlign='center'

          ctx.fillText(title, xS, yS);
          yS += yStep / 2;

          for (var i = 0; i < colorLength; i++) {
            if (isGradient) {
              var grd = ctx.createLinearGradient(xS, yS, xS + xStep, yS);
              grd.addColorStop(0, color[i]);
              grd.addColorStop(1, color[i + 1]);
              ctx.fillStyle = grd;
            } else {
              ctx.fillStyle = color[i];
            }

            ctx.fillRect(xS, yS, xStep, yStep * 1.5);
            xS += xStep;
          }

          ctx.font = "".concat(valueFontSize, "px Arial");

          if (isLableOnLine) {
            xS = xStep * 1.25;
            yS = yStep * 5;

            for (var _i = 0; _i < value.length; _i++) {
              ctx.fillText(value[_i], xS, yS);
              xS += xStep;
            }
          } else {
            xS = xStep * 0.75;
            yS = yStep * 5;

            for (var _i2 = 0; _i2 < value.length; _i2++) {
              ctx.fillText(value[_i2], xS, yS);
              xS += xStep;
            }
          }
        });
      } else {
        var _xNum = valueMaxLength + 3; // X方向份数


        var _yNum = colorLength + 2.5; // y方向份数


        var _width = _xNum * 20;

        var _height = _yNum * 20;

        var _xStep = _width / _xNum;

        var _yStep = _height / _yNum;

        var _xS = _xStep / 2;

        var _yS = _yStep * 1.5; // eslint-disable-next-line radix


        var _titleFontSize = parseInt(_xStep * (_xNum - 1) / titleLength); // eslint-disable-next-line radix


        var _valueFontSize = parseInt(_yStep);

        this.setState({
          width: _width,
          height: _height
        }, function () {
          ctx.font = "".concat(_titleFontSize, "px Arial");
          ctx.fillText(title, _xS, _yS);
          _yS += _yStep / 2;

          for (var i = 0; i < colorLength; i++) {
            if (isGradient) {
              var grd = ctx.createLinearGradient(_xS, _yS, _xS, _yS + _yStep);
              grd.addColorStop(0, color[i]);
              grd.addColorStop(1, color[i + 1]);
              ctx.fillStyle = grd;
            } else {
              ctx.fillStyle = color[i];
            }

            ctx.fillRect(_xS, _yS, _xStep * 1.5, _yStep);
            _yS += _yStep;
          }

          ctx.font = "".concat(_valueFontSize, "px Arial");

          if (isLableOnLine) {
            _xS += _xStep * 2;
            _yS = _yStep * 3.5;

            for (var _i3 = 0; _i3 < value.length; _i3++) {
              ctx.fillText(value[_i3], _xS, _yS);
              _yS += _yStep;
            }
          } else {
            _xS += _xStep * 2;
            _yS = _yStep * 3;

            for (var _i4 = 0; _i4 < value.length; _i4++) {
              ctx.fillText(value[_i4], _xS, _yS);
              _yS += _yStep;
            }
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          width = _this$state.width,
          height = _this$state.height;
      return _react.default.createElement("div", {
        className: "htht-legend"
      }, _react.default.createElement("canvas", {
        className: "myLegend-".concat(this.hash),
        width: width,
        height: height,
        style: {
          "border": "1px solid #000000"
        }
      }));
    }
  }]);
  return Legend;
}(_react.default.Component);

var _default = Legend;
exports.default = _default;