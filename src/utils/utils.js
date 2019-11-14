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
			console.warn(Object.prototype.hasOwnProperty.call(obj, key))
			cloneObj[key] = isObject(obj[key]) ? deepCloneObject(obj[key]) : obj[key]
		}
	}

	return cloneObj
}
