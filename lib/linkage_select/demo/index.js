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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

var _warn_box = _interopRequireDefault(require("../../utils/warn_box"));

/* eslint-disable react/no-unused-state */
var Option = _select.default.Option;
var FormItem = _form.default.Item;

var LinkageSelect =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(LinkageSelect, _React$Component);

  function LinkageSelect(props) {
    var _this;

    (0, _classCallCheck2.default)(this, LinkageSelect);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LinkageSelect).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handlelevelChange", function (type, value) {
      var _this$props = _this.props,
          form = _this$props.form,
          dataSource = _this$props.dataSource;
      var setFieldsValue = form.setFieldsValue;

      if (type === 'province') {
        dataSource.forEach(function (item) {
          if (item.value === value) {
            setFieldsValue({
              province: item.value,
              city: item.children[0].value,
              county: item.children[0].children[0].value
            });

            _this.setState({
              levelTwoArr: item.children,
              levelThreeArr: item.children[0].children
            });
          }
        });
      } else if (type === 'city') {
        var levelTwoArr = _this.state.levelTwoArr;
        levelTwoArr.forEach(function (item) {
          if (item.value === value) {
            setFieldsValue({
              city: item.value,
              county: item.children[0].value
            });

            _this.setState({
              levelThreeArr: item.children
            });
          }
        });
      } else {
        setFieldsValue({
          county: value
        });
      }
    });
    _this.state = {
      levelOne: '',
      levelTwo: '',
      levelThree: '',
      levelOneArr: [],
      levelTwoArr: [],
      levelThreeArr: [],
      dataSource: []
    };
    return _this;
  }

  (0, _createClass2.default)(LinkageSelect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var form = this.props.form;
      var dataSource = this.state.dataSource; // 没传form的话警告，form必传

      if (!form) {
        return _react.default.createElement(_warn_box.default, {
          title: "\u8BF7\u4F20\u5165form"
        });
      } // 如果dataSource传入的不是数组，返回警告


      if (!Array.isArray(dataSource)) {
        return _react.default.createElement(_warn_box.default, {
          title: "dataSource\u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4"
        });
      }

      var getFieldDecorator = form.getFieldDecorator;
      var _this$state = this.state,
          levelOne = _this$state.levelOne,
          levelTwo = _this$state.levelTwo,
          levelThree = _this$state.levelThree,
          levelOneArr = _this$state.levelOneArr,
          levelTwoArr = _this$state.levelTwoArr,
          levelThreeArr = _this$state.levelThreeArr;
      return _react.default.createElement("div", {
        className: "htht-linkage-select"
      }, _react.default.createElement("div", {
        className: "item"
      }, _react.default.createElement("span", {
        className: "title"
      }, "\u7701\uFF1A"), _react.default.createElement(FormItem, null, getFieldDecorator('province', {
        rules: [{
          required: true,
          message: '请输入省！'
        }],
        initialValue: levelOne
      })(_react.default.createElement(_select.default, {
        style: {
          width: 120
        },
        onChange: function onChange(value) {
          _this2.handlelevelChange('province', value);
        }
      }, levelOneArr.map(function (item) {
        return _react.default.createElement(Option, {
          key: item.value
        }, item.name);
      }))))), _react.default.createElement("div", {
        className: "item"
      }, _react.default.createElement("span", {
        className: "title"
      }, "\u5E02\uFF1A"), _react.default.createElement(FormItem, null, getFieldDecorator('city', {
        rules: [{
          required: true,
          message: '请输入市！'
        }],
        initialValue: levelTwo
      })(_react.default.createElement(_select.default, {
        style: {
          width: 120
        },
        onChange: function onChange(value) {
          _this2.handlelevelChange('city', value);
        }
      }, levelTwoArr.map(function (item) {
        return _react.default.createElement(Option, {
          key: item.value
        }, item.name);
      }))))), _react.default.createElement("div", {
        className: "item"
      }, _react.default.createElement("span", {
        className: "title"
      }, "\u53BF\uFF1A"), _react.default.createElement(FormItem, null, getFieldDecorator('county', {
        rules: [{
          required: true,
          message: '请输入县！'
        }],
        initialValue: levelThree
      })(_react.default.createElement(_select.default, {
        style: {
          width: 120
        },
        onChange: function onChange(value) {
          _this2.handlelevelChange('county', value);
        }
      }, levelThreeArr.map(function (item) {
        return _react.default.createElement(Option, {
          key: item.value
        }, item.name);
      }))))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var dataSource = nextProps.dataSource;

      if ('dataSource' in nextProps && nextProps.dataSource !== prevState.dataSource) {
        if (!Array.isArray(dataSource)) {
          return {
            dataSource: dataSource
          };
        }

        return {
          dataSource: dataSource,
          levelOne: dataSource[0].value,
          levelTwo: dataSource[0].children[0].value,
          levelThree: dataSource[0].children[0].children[0].value,
          levelOneArr: dataSource,
          levelTwoArr: dataSource[0].children,
          levelThreeArr: dataSource[0].children[0].children
        };
      }

      return prevState;
    } // 三级联动切换

  }]);
  return LinkageSelect;
}(_react.default.Component);

var _default = LinkageSelect;
exports.default = _default;