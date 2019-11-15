/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
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
export function getParents(el, parentSelector) {
	if (parentSelector === undefined) {
		parentSelector = ''
	}

	let p = el.parentNode

	while (Array.from(p.classList).indexOf(parentSelector) === -1) {
		p = p.parentNode
		if (p.tagName === 'HTML') return
	}
	// eslint-disable-next-line consistent-return
	return p
}

/**
 * 将两个数组组装成数组对象
 * @param arr1
 * @param arr2
 * @return {*}
 */
export function handleArrs(arr1, arr2) {
	const len = arr1.length
	const arr = []
	for (let i = 0; i < len; i++) {
		const data = {
			component: arr1[i],
			code: arr2[i]
		}

		arr.push(data)
	}

	return arr
}
