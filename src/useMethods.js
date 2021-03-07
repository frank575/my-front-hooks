import { useMemo, useState } from 'react'

function useMethods(initialValue, methods) {
	const [state, setState] = useState(initialValue)
	const bindMethods = useMemo(
		() =>
			Object.entries(methods).reduce(
				(p, [name, fn]) => (
					(p[name] = (...args) => setState(fn(state, ...args))), p
				),
				{},
			),
		[methods],
	)
	return [state, bindMethods]
}

export default useMethods
