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

var _toast = _interopRequireDefault(require("../../utils/toast"));

var _warn_box = _interopRequireDefault(require("../../utils/warn_box"));

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
      var _this$props = _this.props,
          form = _this$props.form,
          times = _this$props.times;
      var setFieldsValue = form.setFieldsValue,
          getFieldValue = form.getFieldValue;
      var currentDay = getFieldValue('switch_date').valueOf();
      var currentTime = getFieldValue('switch_time');
      var timeIndex = times.indexOf(currentTime);
      className = className.replace(/iconfont /, '');

      switch (className) {
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
              (0, _toast.default)(_message2.default, '已经是最小时次', 'info');
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
              (0, _toast.default)(_message2.default, '已经是最大时次', 'info');
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
              (0, _toast.default)(_message2.default, '日期不能超过今天', 'info');
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
        style: {
          width: '1.4rem'
        },
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
      }), _react.default.createElement("span", {
        className: "iconfont icon_pre_time",
        title: "\u524D\u4E00\u65F6\u6B21"
      }), _react.default.createElement("span", {
        className: "iconfont icon_recover",
        title: "\u6062\u590D"
      }), _react.default.createElement("span", {
        className: "iconfont icon_next_time",
        title: "\u540E\u4E00\u65F6\u6B21"
      }), _react.default.createElement("span", {
        className: "iconfont icon_next_day",
        title: "\u540E\u4E00\u5929"
      })));
    }
  }]);
  return TimeSwitch;
}(_react.default.Component);

var _default = TimeSwitch;
exports.default = _default;