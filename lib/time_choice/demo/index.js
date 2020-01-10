"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/date-picker/style/css");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _react = _interopRequireWildcard(require("react"));

var _warn_box = _interopRequireDefault(require("../../utils/warn_box"));

function TimeChoice(props) {
  var form = props.form,
      mode = props.mode; // 没传mode或者传horizontal和vertical之外的值，默认是horizontal

  var checked = mode && mode === 'vertical'; // 没传form的话警告，form必传

  if (!form) {
    return _react.default.createElement(_warn_box.default, {
      title: "\u8BF7\u4F20\u5165form"
    });
  } // 判断横向还是纵向来赋值class名


  var className = checked ? 'htht-time-choice-vertical' : 'htht-time-choice-horizontal';
  var getFieldDecorator = form.getFieldDecorator;
  return _react.default.createElement("div", {
    className: "htht-time-choice ".concat(className)
  }, _react.default.createElement("div", {
    className: "item"
  }, checked ? _react.default.createElement("span", {
    className: "title"
  }, "\u5F00\u59CB\u65F6\u95F4\uFF1A") : _react.default.createElement("span", {
    className: "title"
  }, "\u65F6\u95F4\u9009\u62E9\uFF1A"), _react.default.createElement(_form.default.Item, null, getFieldDecorator('startTime', {
    rules: [{
      required: true,
      message: '请输入开始时间！'
    }]
  })(_react.default.createElement(_datePicker.default, {
    showToday: false,
    format: "YYYY-MM-DD",
    allowClear: false,
    style: {
      width: '1.4rem'
    }
  }))), !checked ? _react.default.createElement(_react.Fragment, null, _react.default.createElement("span", {
    className: "gap"
  }, "-"), _react.default.createElement(_form.default.Item, null, getFieldDecorator('endTime', {
    rules: [{
      required: true,
      message: '请输入结束时间！'
    }]
  })(_react.default.createElement(_datePicker.default, {
    showToday: false,
    format: "YYYY-MM-DD",
    allowClear: false,
    style: {
      width: '1.4rem'
    }
  })))) : null), checked ? _react.default.createElement("div", {
    className: "item"
  }, _react.default.createElement("span", {
    className: "title"
  }, "\u7ED3\u675F\u65F6\u95F4\uFF1A"), _react.default.createElement(_form.default.Item, null, getFieldDecorator('endTime', {
    rules: [{
      required: true,
      message: '请输入结束时间！'
    }]
  })(_react.default.createElement(_datePicker.default, {
    showToday: false,
    format: "YYYY-MM-DD",
    allowClear: false,
    style: {
      width: '1.4rem'
    }
  })))) : null);
}

var _default = TimeChoice;
exports.default = _default;