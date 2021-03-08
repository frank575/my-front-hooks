import { useState } from 'react'
import { getStorageItem, useUpdateStorage } from './util'

/**
 * 自動存到 localStorage 的 useState
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @returns {[T, function(T | function(T): T): void]}
 */
function useLocalStorageState(key, initialValue) {
	const [state, setState] = useState(
		getStorageItem(key, initialValue, localStorage),
	)
	useUpdateStorage(key, state, localStorage)
	return [state, setState]
}

export default useLocalStorageState
