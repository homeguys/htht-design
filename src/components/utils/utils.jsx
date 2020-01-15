/**
 * 提示弹出，封装antd
 * @param {*} message antd的message组件
 * @param {*} str 提示文字
 * @param {*} type 提示类型
 */
export function toast (message, str, type) {
  if (str !== '') {
    message.destroy()
    message.config({
      top: document.documentElement.clientHeight - 200,
      duration: 1
    })
    switch (type) {
      case 'success':
        message.success(str)
        break
      case 'warning':
        message.warning(str)
        break
      case 'error':
        message.error(str)
        break
      case 'info':
        message.info(str)
        break
      default:
        message.warning(str)
    }
  }
}

/**
 * 获取元素父级元素
 * @param el // 当前对象
 * @param parentSelector // 父级对象
 * @return {*}
 */
export function getParents (el, parent = '') {
  const parentSelector = parent.replace('.', '')
  let p = el.parentNode

  if (el.tagName === parentSelector || Array.from(el.classList).indexOf(parentSelector) !== -1) {
    return el
  }

  let condition = parent.includes('.')
    ? Array.from(p.classList).indexOf(parentSelector) === -1
    : p.tagName !== parentSelector

  while (condition) {
    p = p.parentNode
    condition = parent.includes('.')
      ? Array.from(p.classList).indexOf(parentSelector) === -1
      : p.tagName !== parentSelector
    if (p.tagName === 'HTML') return null
  }

  return p
}
