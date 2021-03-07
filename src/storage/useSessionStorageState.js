import { useState } from 'react'
import { getStorageItem, useUpdateStorage } from './util'

function useSessionStorageState(key, initialValue) {
	const [state, setState] = useState(
		getStorageItem(key, initialValue, sessionStorage),
	)
	useUpdateStorage(key, state, sessionStorage)
	return [state, setState]
}

export default useSessionStorageState
