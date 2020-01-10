"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/date-picker/style/css");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireDefault(require("react"));

var _varibles = require("../../../config/varibles");

var FormItem = _form.default.Item;

var TimeChoice =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(TimeChoice, _React$Component);

  function TimeChoice() {
    (0, _classCallCheck2.default)(this, TimeChoice);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TimeChoice).apply(this, arguments));
  }

  (0, _createClass2.default)(TimeChoice, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          style = _this$props.style,
          mode = _this$props.mode;
      var dateStyle = style || {
        width: '1.4rem'
      };
      return _react.default.createElement("div", {
        className: "htht-time-choice"
      }, _react.default.createElement("span", {
        className: "title"
      }, "\u65F6\u95F4\u9009\u62E9\uFF1A"), _react.default.createElement(FormItem, null, getFieldDecorator('startTime', {
        rules: [{
          required: true,
          message: '请输入开始时间！'
        }]
      })(_react.default.createElement(_datePicker.default, {
        showToday: false,
        format: "YYYY-MM-DD",
        allowClear: false,
        onChange: function onChange(e) {
          return _this.handleChange(e, 'startTime');
        },
        style: dateStyle
      }))), _react.default.createElement("span", {
        className: "gap"
      }, "-"), _react.default.createElement(FormItem, null, getFieldDecorator('endTime', {
        rules: [{
          required: true,
          message: '请输入结束时间！'
        }]
      })(_react.default.createElement(_datePicker.default, {
        showToday: false,
        format: "YYYY-MM-DD",
        allowClear: false,
        onChange: function onChange(e) {
          return _this.handleChange(e, 'endTime');
        },
        style: dateStyle
      }))));
    }
  }]);
  return TimeChoice;
}(_react.default.Component);

var _default = TimeChoice;
exports.default = _default;