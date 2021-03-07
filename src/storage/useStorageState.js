import { useEffect, useState } from 'react'

const useStorageState = (() => {
	const CACHE = {}
	return (symbol, initialValue) => {
		const [state, setState] = useState(CACHE[symbol] ?? initialValue)
		useEffect(() => {
			CACHE[symbol] = state
		}, [state])
		return [state, setState]
	}
})()

export default useStorageState
