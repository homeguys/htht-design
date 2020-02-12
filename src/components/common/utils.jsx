/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/**
 * 深度合并两个对象
 * @param {*} FirstOBJ 对象1
 * @param {*} SecondOBJ 对象2
 */
export function deepObjectMerge (FirstOBJ, SecondOBJ) {
  for (const key in SecondOBJ) {
    FirstOBJ[key] =
      FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]'
        ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key])
        : (FirstOBJ[key] = SecondOBJ[key])
  }
  return FirstOBJ
}

/**
 * 创建一个随机hash值
 * @param {*} hashLength hash值的长度
 */
export function createHash (hashLength) {
  if (!hashLength || typeof Number(hashLength) !== 'number') {
    return
  }
  const ar = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ]
  const hs = []
  const hl = Number(hashLength)
  const al = ar.length
  for (let i = 0; i < hl; i++) {
    hs.push(ar[Math.floor(Math.random() * al)])
  }

  return hs.join('')
}

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
    if (p.tagName === 'HTML') return
  }

  return p
}
