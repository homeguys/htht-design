"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toast;

/**
 * 提示弹出，封装antd
 * @param {*} message antd的message组件
 * @param {*} str 提示文字
 * @param {*} type 提示类型
 */
function toast(message, str, type) {
  if (str !== '') {
    message.destroy();
    message.config({
      top: document.documentElement.clientHeight - 200,
      duration: 1
    });

    switch (type) {
      case 'success':
        message.success(str);
        break;

      case 'warning':
        message.warning(str);
        break;

      case 'error':
        message.error(str);
        break;

      case 'info':
        message.info(str);
        break;

      default:
        message.warning(str);
    }
  }
}