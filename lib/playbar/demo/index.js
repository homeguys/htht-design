"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/slider/style/css");

var _slider = _interopRequireDefault(require("antd/lib/slider"));

require("antd/lib/message/style/css");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../../../utils/utils");

var Playbar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Playbar, _React$Component);

  function Playbar(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Playbar);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Playbar).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "autoPlay", function () {
      _this.setState(function (previous) {
        return {
          isPlay: !previous.isPlay
        };
      }, function () {
        var _this$state = _this.state,
            isPlay = _this$state.isPlay,
            value = _this$state.value;

        if (isPlay) {
          _this.setAutoPlayInterval();
        } else {
          _this.resetAutoPlay(value);
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setAutoPlayInterval", function () {
      clearInterval(_this.timer);
      var value = _this.state.value;
      var _this$state2 = _this.state,
          marks = _this$state2.marks,
          autoplaySpeed = _this$state2.autoplaySpeed;
      var max = Object.keys(marks).length - 1;
      _this.timer = setInterval(function () {
        if (value >= max) {
          value = 0;

          _this.resetAutoPlay(value);
        } else {
          /**
           * 相对应的操作
           */
          value++;

          _this.setState({
            value: value
          });

          _this.onChange && _this.onChange(value);
        }
      }, autoplaySpeed);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetAutoPlay", function (value) {
      clearInterval(_this.timer);

      _this.setState({
        isPlay: false,
        value: value
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "previousPlay", function () {
      var value = _this.state.value;

      if (value > 0) {
        value -= 1;

        _this.setState({
          value: value
        });

        _this.onChange && _this.onChange(value);
      } else {
        (0, _utils.toast)(_message2.default, '已经是第一个', 'info');
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "nextPlay", function () {
      var value = _this.state.value;
      var marks = _this.state.marks;
      var max = Object.keys(marks).length - 1;

      if (value < max) {
        value += 1;

        _this.setState({
          value: value
        });

        _this.onChange && _this.onChange(value);
      } else {
        (0, _utils.toast)(_message2.default, '已经是最后一个', 'info');
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "firstPlay", function () {
      var value = _this.state.value;

      if (value !== 0) {
        _this.onChange && _this.onChange(0);

        _this.setState({
          value: 0
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dragSlider", function (value) {
      _this.setState({
        value: value
      });

      _this.onChange && _this.onChange(value);
    });
    _this.state = {
      isPlay: false,
      value: 0,
      marks: props.marks,
      autoplaySpeed: props.autoplaySpeed
    };
    _this.timer = null;
    _this.onChange = props.onChange;
    return _this;
  }

  (0, _createClass2.default)(Playbar, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.resetAutoPlay();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          isPlay = _this$state3.isPlay,
          value = _this$state3.value,
          marks = _this$state3.marks;
      var max = marks ? Object.keys(marks).length - 1 : 0;
      console.warn(this.state);
      return _react.default.createElement("div", {
        className: "htht-playbar"
      }, _react.default.createElement("div", {
        className: "play-btn"
      }, _react.default.createElement("span", {
        className: "play-switch",
        onClick: this.autoPlay
      }, isPlay ? _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16"
      }, _react.default.createElement("path", {
        d: "M686.480358 119.560026c0-32.377408 26.325575-58.644655 58.644655-58.644655 32.386618 0 58.645678 26.420743 58.645678 58.644655l0 781.930779c0 32.376385-26.325575 58.644655-58.645678 58.644655-32.385595 0-58.644655-26.419719-58.644655-58.644655L686.480358 119.560026zM217.321072 119.560026c0-32.377408 26.325575-58.644655 58.645678-58.644655 32.385595 0 58.644655 26.420743 58.644655 58.644655l0 781.930779c0 32.376385-26.325575 58.644655-58.644655 58.644655-32.385595 0-58.645678-26.419719-58.645678-58.644655L217.321072 119.560026z",
        "p-id": "4269",
        fill: "#00afff"
      })) : _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16"
      }, _react.default.createElement("path", {
        fill: "#00afff",
        d: "M811.46758467 406.92421513C903.11135557 464.95534326 903.06176768 559.07379424 811.46758467 617.07352344L309.75390635 934.77118115C218.11013633 992.80231192 143.81818174 955.01631113 143.81818174 850.49963633L143.81818174 173.49810224C143.81818174 68.9250834 218.15972422 31.22682646 309.75390635 89.22655479L811.46758467 406.92421513 811.46758467 406.92421513Z"
      })), _react.default.createElement("i", {
        className: "top-left"
      }), _react.default.createElement("i", {
        className: "top-right"
      }), _react.default.createElement("i", {
        className: "bottom-left"
      }), _react.default.createElement("i", {
        className: "bottom-right"
      })), _react.default.createElement("span", {
        className: "first-play",
        onClick: this.firstPlay
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16"
      }, _react.default.createElement("path", {
        fill: "#00afff",
        d: "M716.8 290.133333c-110.933333-102.4-281.6-106.666667-396.8-12.8S170.666667 537.6 247.466667 665.6c59.733333 106.666667 179.2 166.4 302.933333 149.333333s221.866667-102.4 256-221.866666c8.533333-34.133333 42.666667-51.2 76.8-42.666667 34.133333 8.533333 51.2 42.666667 42.666667 76.8-68.266667 226.133333-302.933333 354.133333-524.8 290.133333C174.933333 853.333333 42.666667 618.666667 106.666667 392.533333c42.666667-145.066667 153.6-256 298.666666-298.666666s298.666667 0 405.333334 102.4l81.066666-81.066667c8.533333-8.533333 21.333333-12.8 34.133334-8.533333 4.266667 12.8 12.8 21.333333 12.8 34.133333v264.533333c0 17.066667-12.8 29.866667-29.866667 29.866667h-260.266667c-12.8 0-25.6-8.533333-29.866666-17.066667s0-25.6 8.533333-34.133333l89.6-93.866667z"
      }))), _react.default.createElement("span", {
        className: "previous-play",
        onClick: this.previousPlay
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16"
      }, _react.default.createElement("path", {
        fill: "#fff",
        d: "M212.53241532 617.07578487C120.88864443 559.04465674 120.93823232 464.92620576 212.53241533 406.92647656L714.24609365 89.22881885C805.88986367 31.19768808 880.18181826 68.98368886 880.18181826 173.50036367L880.18181826 850.50189776C880.18181826 955.0749166 805.84027578 992.77317354 714.24609365 934.77344521L212.53241532 617.07578487 212.53241532 617.07578487Z"
      }))), _react.default.createElement("span", {
        className: "next-play",
        onClick: this.nextPlay
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16"
      }, _react.default.createElement("path", {
        fill: "#fff",
        d: "M811.46758467 406.92421513C903.11135557 464.95534326 903.06176768 559.07379424 811.46758467 617.07352344L309.75390635 934.77118115C218.11013633 992.80231192 143.81818174 955.01631113 143.81818174 850.49963633L143.81818174 173.49810224C143.81818174 68.9250834 218.15972422 31.22682646 309.75390635 89.22655479L811.46758467 406.92421513 811.46758467 406.92421513Z"
      })))), _react.default.createElement("div", {
        className: "slider-contanier"
      }, _react.default.createElement(_slider.default, {
        min: 0,
        max: max,
        marks: marks,
        value: value,
        onChange: this.dragSlider
      })), _react.default.createElement("div", {
        className: "download"
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: "32",
        height: "32"
      }, _react.default.createElement("path", {
        fill: "#fff",
        d: "M384 448V128h256v320h192l-320 320-320-320h192z m-192 384h640v64H192v-64z"
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var marks = props.marks,
          _props$autoplaySpeed = props.autoplaySpeed,
          autoplaySpeed = _props$autoplaySpeed === void 0 ? 1000 : _props$autoplaySpeed;

      if (marks !== state.marks || autoplaySpeed !== state.autoplaySpeed) {
        return {
          marks: marks,
          autoplaySpeed: autoplaySpeed
        };
      }

      return null;
    }
  }]);
  return Playbar;
}(_react.default.Component);

var _default = Playbar;
exports.default = _default;