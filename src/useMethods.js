import { useMemo, useState } from 'react'

// return U 再想辦法找寫法，目前先這樣
/**
 * @template T
 * @template U
 * @param {T} initialValue
 * @param {U} methods
 * @returns {[T, U]}
 */
function useMethods (initialValue, methods) {
	const [state, setState] = useState(initialValue)
	const bindMethods = useMemo(
		() =>
			Object.entries(methods).reduce(
				(p, [name, fn]) => (
					(p[name] = (...args) => setState(state => fn(state, ...args))), p
				),
				{},
			),
		[methods],
	)
	return [state, bindMethods]
}

export default useMethods
