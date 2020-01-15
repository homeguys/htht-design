"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/date-picker/style/css");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

require("antd/lib/message/style/css");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("../../utils/utils");

var _warn_box = _interopRequireDefault(require("../../utils/warn_box"));

/* eslint-disable no-unused-vars */
var Option = _select.default.Option;

var TimeSwitch =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(TimeSwitch, _React$Component);

  function TimeSwitch(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TimeSwitch);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TimeSwitch).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleChangeDate", function (e) {
      var form = _this.props.form;
      var setFieldsValue = form.setFieldsValue;
      setFieldsValue({
        date: e
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "switchTime", function (e) {
      var className = e.target.className;
      if (className === 'switch-box') return;
      var current = (0, _utils.getParents)(e.target, '.iconfont');
      var _this$props = _this.props,
          form = _this$props.form,
          times = _this$props.times;
      var setFieldsValue = form.setFieldsValue,
          getFieldValue = form.getFieldValue;
      var currentDay = getFieldValue('switch_date').valueOf();
      var currentTime = getFieldValue('switch_time');
      var currentClassName = current.className;
      var timeIndex = times.indexOf(currentTime);
      currentClassName = currentClassName.replace(/iconfont /, '');

      switch (currentClassName) {
        case 'icon_pre_day':
          {
            var newTime = currentDay - 24 * 60 * 60 * 1000;
            var newDate = new Date(newTime);
            setFieldsValue({
              switch_date: (0, _moment.default)(newDate, 'YYYY-MM-DD')
            });
            break;
          }

        case 'icon_pre_time':
          {
            timeIndex -= 1;

            if (timeIndex < 0) {
              (0, _utils.toast)(_message2.default, '已经是最小时次', 'info');
              return;
            }

            setFieldsValue({
              switch_time: times[timeIndex]
            });
            break;
          }

        case 'icon_recover':
          setFieldsValue({
            switch_date: (0, _moment.default)(_this.date, 'YYYY-MM-DD'),
            switch_time: times[0]
          });
          break;

        case 'icon_next_time':
          {
            timeIndex += 1;

            if (timeIndex >= times.length) {
              (0, _utils.toast)(_message2.default, '已经是最大时次', 'info');
              return;
            }

            setFieldsValue({
              switch_time: times[timeIndex]
            });
            break;
          }

        case 'icon_next_day':
          {
            var _newTime = currentDay + 24 * 60 * 60 * 1000;

            if (_newTime > new Date().getTime()) {
              (0, _utils.toast)(_message2.default, '日期不能超过今天', 'info');
              return;
            }

            var _newDate = new Date(_newTime);

            setFieldsValue({
              switch_date: (0, _moment.default)(_newDate, 'YYYY-MM-DD')
            });
            break;
          }

        default:
          break;
      }
    });
    _this.date = new Date();
    return _this;
  }

  (0, _createClass2.default)(TimeSwitch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var switchBox = document.querySelector('.htht-time-switch-vertical .switch-box');

      if (switchBox) {
        switchBox.addEventListener('click', this.switchTime, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var switchBox = document.querySelector('.htht-time-switch-vertical .switch-box');

      if (switchBox) {
        switchBox.removeEventListener('click', this.switchTime, false);
      }
    } // 手动选择时间

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          form = _this$props2.form,
          _this$props2$times = _this$props2.times,
          times = _this$props2$times === void 0 ? [] : _this$props2$times; // 没传form的话警告，form必传

      if (!form) {
        return _react.default.createElement(_warn_box.default, {
          title: "\u8BF7\u4F20\u5165form"
        });
      }

      var getFieldDecorator = form.getFieldDecorator;
      return _react.default.createElement("div", {
        className: "htht-time-switch htht-time-switch-vertical"
      }, _react.default.createElement("div", {
        className: "date-box"
      }, _react.default.createElement("div", {
        className: "item"
      }, _react.default.createElement("span", {
        className: "title"
      }, "\u65F6\u95F4\u9009\u62E9\uFF1A"), _react.default.createElement(_form.default.Item, null, getFieldDecorator('switch_date', {
        rules: [{
          required: true,
          message: '请输入开始时间！'
        }],
        initialValue: (0, _moment.default)(this.date, 'YYYY-MM-DD')
      })(_react.default.createElement(_datePicker.default, {
        showToday: false,
        format: "YYYY-MM-DD",
        allowClear: false,
        onChange: this.handleChangeDate
      })))), _react.default.createElement("div", {
        className: "item"
      }, _react.default.createElement(_form.default.Item, null, getFieldDecorator('switch_time', {
        rules: [{
          required: true,
          message: '请输入时次！'
        }],
        initialValue: times[0] // 默认选中时次数组第一个

      })(_react.default.createElement(_select.default, {
        placeholder: "\u8BF7\u9009\u62E9\u4E0B\u62C9",
        style: {
          width: '100%'
        }
      }, times.map(function (item) {
        return _react.default.createElement(Option, {
          key: item
        }, item);
      })))))), _react.default.createElement("div", {
        className: "switch-box"
      }, _react.default.createElement("span", {
        className: "iconfont icon_pre_day",
        title: "\u524D\u4E00\u5929"
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        width: "18",
        height: "18"
      }, _react.default.createElement("path", {
        d: "M734 153c6-6 11.1-8.1 15.2-6.2 4.1 1.9 6.2 7 6.20000001 15.2L755.40000001 862c0 8.20000001-2.1 13.3-6.20000001 15.2s-9.2-0.2-15.2-6.2l-337.6-337.6c-2.9-2.9-4.9-5.9-6.2-9L390.2 846.8c0 8.20000001-2.99999999 15.4-9 21.4s-13.09999999 9-21.4 9L299 877.2c-8.20000001 0-15.4-2.99999999-21.4-9s-9-13.2-9-21.4l0-669.5c0-8.20000001 2.99999999-15.4 9-21.4s13.2-9 21.4-9l60.9 0c8.20000001 0 15.4 2.99999999 21.4 9s9 13.2 9 21.4L390.3 499.7c1.30000001-3.2 3.3-6.2 6.2-9L734 153z",
        fill: "#333"
      }))), _react.default.createElement("span", {
        className: "iconfont icon_pre_time",
        title: "\u524D\u4E00\u65F6\u6B21"
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        width: "18",
        height: "18"
      }, _react.default.createElement("path", {
        d: "M857.2 153c6-6 11.1-8.1 15.2-6.2 4.1 1.9 6.2 7 6.2 15.2L878.6 862c0 8.20000001-2.1 13.3-6.2 15.2-4.1 1.9-9.2-0.2-15.2-6.2l-337.6-337.6c-2.9-2.9-4.9-5.9-6.2-9L513.4 862c0 8.20000001-2.1 13.3-6.2 15.2-4.1 1.9-9.2-0.2-15.2-6.2l-337.6-337.6c-6-6-9-13.2-9-21.4s2.99999999-15.4 9-21.4L492 153c6-6 11.1-8.1 15.2-6.2 4.1 1.9 6.2 7 6.2 15.2L513.4 499.70000001c1.30000001-3.2 3.3-6.2 6.2-9.00000001L857.2 153z",
        fill: "#333"
      }))), _react.default.createElement("span", {
        className: "iconfont icon_recover",
        title: "\u6062\u590D"
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        width: "18",
        height: "18"
      }, _react.default.createElement("path", {
        d: "M785.42434169 597.16362208S706.10548597 872.19557483 500.73031871 750.63324903c0 0-66.0615963-31.90730189-94.37370973-131.44909536l122.46112309-97.96889817L141.21142578 456.95125381v373.00085094l112.34965422-97.96889818A399.51536976 399.51536976 0 0 0 571.28590148 882.75644234c208.97035645-4.26928716 229.1932942-193.91550245 214.13844021-285.59282026zM400.06502862 426.16744855S479.60858367 150.91079646 685.88254822 272.69782087c0 0 66.0615963 31.68260256 94.37370972 131.44909533L658.01983419 501.89111506l386.48280966 64.48870174V193.37896514l-112.34965422 97.74419887A400.18946772 400.18946772 0 0 0 614.42816814 141.24872551c-208.97035645 3.59518919-229.1932942 193.24140519-214.36313951 284.91872304z",
        fill: "#333"
      }))), _react.default.createElement("span", {
        className: "iconfont icon_next_time",
        title: "\u540E\u4E00\u65F6\u6B21"
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        width: "18",
        height: "18"
      }, _react.default.createElement("path", {
        d: "M166.8 871c-6 6-11.1 8.1-15.2 6.2-4.1-1.9-6.2-7-6.2-15.2V162c0-8.2 2.1-13.3 6.2-15.2 4.1-1.9 9.2 0.2 15.2 6.2l337.6 337.6c2.9 2.9 4.9 5.9 6.2 9V162c0-8.2 2.1-13.3 6.2-15.2 4.1-1.9 9.2 0.2 15.2 6.2l337.6 337.6c6 6 9 13.2 9 21.4s-3 15.4-9 21.4L532 871c-6 6-11.1 8.1-15.2 6.2-4.1-1.9-6.2-7-6.2-15.2V524.3c-1.3 3.2-3.3 6.2-6.2 9L166.8 871z",
        fill: "#333"
      }))), _react.default.createElement("span", {
        className: "iconfont icon_next_day",
        title: "\u540E\u4E00\u5929"
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024",
        width: "18",
        height: "18"
      }, _react.default.createElement("path", {
        d: "M290 871c-6 6-11.1 8.1-15.2 6.2-4.1-1.9-6.2-7-6.20000001-15.2L268.59999999 162c0-8.20000001 2.1-13.3 6.20000001-15.2s9.2 0.2 15.2 6.2l337.6 337.6c2.9 2.9 4.9 5.9 6.2 9L633.8 177.2c0-8.20000001 2.99999999-15.4 9-21.4s13.09999999-9 21.4-9L725 146.8c8.20000001 0 15.4 2.99999999 21.4 9s9 13.2 9 21.4l0 669.5c0 8.20000001-2.99999999 15.4-9 21.4s-13.2 9-21.4 9l-60.9 0c-8.20000001 0-15.4-2.99999999-21.4-9s-9-13.2-9-21.4L633.7 524.3c-1.30000001 3.2-3.3 6.2-6.2 9L290 871z",
        fill: "#333"
      })))));
    }
  }]);
  return TimeSwitch;
}(_react.default.Component);

var _default = TimeSwitch;
exports.default = _default;