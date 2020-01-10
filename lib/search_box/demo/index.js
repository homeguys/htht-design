"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

require("antd/lib/radio/style/css");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireWildcard(require("react"));

var _demo = _interopRequireDefault(require("../../time_choice/demo"));

var _demo2 = _interopRequireDefault(require("../../space_choice/demo"));

var _demo3 = _interopRequireDefault(require("../../linkage_select/demo"));

var _warn_box = _interopRequireDefault(require("../../utils/warn_box"));

var FormItem = _form.default.Item;
var Option = _select.default.Option;

function Searchbox(props) {
  var form = props.form,
      mode = props.mode,
      linkageData = props.linkageData,
      _props$radioData = props.radioData,
      radioData = _props$radioData === void 0 ? [] : _props$radioData,
      _props$checkboxData = props.checkboxData,
      checkboxData = _props$checkboxData === void 0 ? [] : _props$checkboxData,
      _props$selectData = props.selectData,
      selectData = _props$selectData === void 0 ? [] : _props$selectData,
      onSubmit = props.onSubmit; // 没传mode或者传horizontal和vertical之外的值，默认是horizontal

  var checked = mode && mode === 'vertical'; // 没传form的话警告，form必传

  if (!form) {
    return _react.default.createElement(_warn_box.default, {
      title: "\u8BF7\u4F20\u5165form"
    });
  } // 判断横向还是纵向来赋值class名


  var className = checked ? 'htht-search-box-vertical' : 'htht-search-box-horizontal';
  var getFieldDecorator = form.getFieldDecorator;
  return _react.default.createElement("div", {
    className: "htht-search-box ".concat(className)
  }, _react.default.createElement(_form.default, null, _react.default.createElement(_demo.default, {
    form: form
  }), !checked ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_demo3.default, {
    form: form,
    dataSource: linkageData
  }), _react.default.createElement(_button.default, {
    type: "primary",
    htmlType: "submit",
    onClick: onSubmit
  }, "\u63D0\u4EA4")) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_demo2.default, {
    form: form
  }), radioData.length ? _react.default.createElement("div", {
    className: "htht-radio-choice htht-radio-choice-horizontal"
  }, _react.default.createElement("div", {
    className: "item"
  }, _react.default.createElement("span", {
    className: "title"
  }, "\u5355\u9009\u8981\u7D20\uFF1A"), _react.default.createElement(FormItem, null, getFieldDecorator('radioGroup')(_react.default.createElement(_radio.default.Group, null, radioData.map(function (item) {
    return _react.default.createElement(_radio.default, {
      key: item.value,
      value: item.value
    }, item.name);
  })))))) : null, checkboxData.length ? _react.default.createElement("div", {
    className: "htht-check-choice htht-check-choice-horizontal"
  }, _react.default.createElement("div", {
    className: "item"
  }, _react.default.createElement("span", {
    className: "title"
  }, "\u591A\u9009\u8981\u7D20\uFF1A"), _react.default.createElement(FormItem, null, getFieldDecorator('checkedGroup')(_react.default.createElement(_checkbox.default.Group, null, checkboxData.map(function (item) {
    return _react.default.createElement(_checkbox.default, {
      key: item.value,
      value: item.value
    }, item.name);
  })))))) : null, selectData.length ? _react.default.createElement("div", {
    className: "htht-select-choice"
  }, _react.default.createElement("div", {
    className: "item"
  }, _react.default.createElement("span", {
    className: "title"
  }, "\u4E0B\u62C9\u9009\u62E9\uFF1A"), _react.default.createElement(FormItem, null, getFieldDecorator('selectGroup')(_react.default.createElement(_select.default, {
    placeholder: "\u8BF7\u9009\u62E9\u4E0B\u62C9",
    style: {
      width: '100%'
    }
  }, selectData.map(function (item) {
    return _react.default.createElement(Option, {
      key: item.value,
      value: item.value
    }, item.name);
  })))))) : null, _react.default.createElement(_button.default, {
    type: "primary",
    block: true,
    onClick: onSubmit
  }, "\u63D0\u4EA4"))));
}

var _default = Searchbox;
exports.default = _default;