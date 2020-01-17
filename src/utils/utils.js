import { Icon } from 'antd'
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/**
 * 将多维数组转换成一维数组
 * @param {*} arr
 */
export function flattenArr(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flattenArr(next) : next)
  }, [])
}

/**
 * 判断是否为对象
 * @param {*} obj
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 深度拷贝
 * @param {*} obj
 */

export function deepCloneObject(obj) {
  if (!isObject(obj)) {
    throw new Error('obj 不是一个对象！')
  }

  const isArray = Array.isArray(obj)
  const cloneObj = isArray ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = isObject(obj[key]) ? deepCloneObject(obj[key]) : obj[key]
    }
  }

  return cloneObj
}

/**
 * 获取元素父级元素
 * @param el // 当前对象
 * @param parentSelector // 父级对象
 * @return {*}
 */
export function getParents(el, parent = '') {
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

/**
 * 将两个数组组装成数组对象
 * @param arr1 component
 * @param arr2 demo code
 * @param arr3 demo description
 * @return {*}
 */
export function handleArrs(arr1, arr2, arr3) {
  const len = arr1.length
  const arr = []
  for (let i = 0; i < len; i++) {
    const data = {
      component: arr1[i],
      code: arr2[i],
      desc: arr3[i]
    }

    arr.push(data)
  }

  return arr
}

/**
 * 日期格式化
 * @param {*} data new Date()对象
 * @param {*} fmt yyyy-MM-dd hh:mm:ss
 */
export function dateFormat(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      )
    }
  }
  return fmt
}

/**
 * 提示弹出，封装antd
 * @param {*} message antd的message组件
 * @param {*} str 提示文字
 * @param {*} type 提示类型
 */
export function toast(message, str, type) {
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
 * 创建一个随机hash值
 * @param {*} hashLength hash值的长度
 */
export function createHash(hashLength) {
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
 * 深度合并两个对象
 * @param {*} FirstOBJ 对象1
 * @param {*} SecondOBJ 对象2
 */
export function deepObjectMerge(FirstOBJ, SecondOBJ) {
  // eslint-disable-next-line guard-for-in
  for (const key in SecondOBJ) {
    FirstOBJ[key] =
      FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]'
        ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key])
        : (FirstOBJ[key] = SecondOBJ[key])
  }
  return FirstOBJ
}

/**
 * 清除同级其他元素高亮，当前元素设置高亮
 * @param {*} lists
 * @param {*} current
 */
export function setActive(lists, current, className) {
  // 清除高亮
  Array.from(lists).forEach(item => {
    item.classList.remove(className)
  })
  // 当前增加高亮
  if (current) {
    current.classList.add(className)
  }
}

// antd和iconfont组合一起
export const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1575007_am2j2qus0nt.js'
})
