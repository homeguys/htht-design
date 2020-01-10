"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/input-number/style/css");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _react = _interopRequireDefault(require("react"));

var _warn_box = _interopRequireDefault(require("../../utils/warn_box"));

function SpaceChoice(props) {
  var form = props.form; // 没传form的话警告，form必传

  if (!form) {
    return _react.default.createElement(_warn_box.default, {
      title: "\u8BF7\u4F20\u5165form"
    });
  }

  var getFieldDecorator = form.getFieldDecorator;
  return _react.default.createElement("div", {
    className: "htht-space-choice htht-space-choice-two-line"
  }, _react.default.createElement("span", {
    className: "title"
  }, "\u7A7A\u95F4\u9009\u62E9\uFF1A"), _react.default.createElement("div", {
    className: "item"
  }, _react.default.createElement("span", {
    className: "sub-title"
  }, _react.default.createElement("i", null, "\u7ECF\u5EA6")), _react.default.createElement(_form.default.Item, null, getFieldDecorator('minLong', {
    rules: [{
      required: true,
      message: '请输入最小经度！'
    }]
  })(_react.default.createElement(_inputNumber.default, {
    placeholder: "\u6700\u5C0F\u7ECF\u5EA6",
    min: -180,
    max: 180,
    style: {
      width: '1.4rem'
    }
  }))), _react.default.createElement("span", {
    className: "gap"
  }, "-"), _react.default.createElement(_form.default.Item, null, getFieldDecorator('maxLong', {
    rules: [{
      required: true,
      message: '请输入最大经度！'
    }]
  })(_react.default.createElement(_inputNumber.default, {
    placeholder: "\u6700\u5927\u7ECF\u5EA6",
    min: -180,
    max: 180,
    style: {
      width: '1.4rem'
    }
  })))), _react.default.createElement("div", {
    className: "item"
  }, _react.default.createElement("span", {
    className: "sub-title"
  }, _react.default.createElement("i", null, "\u7EAC\u5EA6")), _react.default.createElement(_form.default.Item, null, getFieldDecorator('minLat', {
    rules: [{
      required: true,
      message: '请输入最小纬度！'
    }]
  })(_react.default.createElement(_inputNumber.default, {
    placeholder: "\u6700\u5C0F\u7EAC\u5EA6",
    min: -90,
    max: 90,
    style: {
      width: '1.4rem'
    }
  }))), _react.default.createElement("span", {
    className: "gap"
  }, "-"), _react.default.createElement(_form.default.Item, null, getFieldDecorator('maxLat', {
    rules: [{
      required: true,
      message: '请输入最大纬度！'
    }]
  })(_react.default.createElement(_inputNumber.default, {
    placeholder: "\u6700\u5927\u7EAC\u5EA6",
    min: -90,
    max: 90,
    style: {
      width: '1.4rem'
    }
  })))));
}

var _default = SpaceChoice;
exports.default = _default;