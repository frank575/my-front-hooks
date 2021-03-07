import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/**
 * 加載用鉤子
 * @param promiseFun Promise<void> | { [key: string]: Promise<void> } 執行的方法
 * @param options?
 * 	append: ref | dom
 * 	run: String | Boolean | [string, ...any] = run
 */
function useLoad(promiseFun, options) {
	const isFun = useMemo(() => typeof promiseFun === 'function', [promiseFun])
	const run = useRef(options?.run ?? 'run')
	const append = useRef(options?.append)
	const throttle = useRef({})
	const [state, setState] = useState({
		error: undefined,
		pending: false,
	})

	const getRemoveThrottle = useCallback(key => {
		delete throttle.current[key]
		return Object.keys(throttle.current).length ? throttle.current : false
	}, [])

	const pFun = useCallback(async (fun, key, ...args) => {
		if (throttle.current[key]) {
			return
		}
		throttle.current[key] = true

		try {
			setState({ error: undefined, pending: throttle.current })
			const result = await fun.call(promiseFun, ...args)
			setState({ error: undefined, pending: getRemoveThrottle(key) })
			return result
		} catch (error) {
			console.error(error)
			setState({ error, pending: getRemoveThrottle(key) })
		}
	}, [])

	const dispatch = useCallback(
		async (key = 'run', ...args) => {
			const fun = isFun ? promiseFun : promiseFun[key]
			return await pFun(fun, key, ...args)
		},
		[promiseFun, pFun],
	)

	useEffect(() => {
		const { current } = run
		if (current !== false) {
			if (Array.isArray(current)) {
				const key = current.splice(0, 1)
				dispatch(key, ...current)
			} else {
				dispatch(current)
			}
		}
	}, [])

	return { error: state.error, pending: state.pending, dispatch }
}

export default useLoad
