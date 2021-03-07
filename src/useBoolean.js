import useMethods from './useMethods'

function useBoolean(initialValue = false) {
	const [bool, methods] = useMethods(initialValue, {
		setTrue: () => true,
		setFalse: () => false,
		toggle: state => !state,
	})
	return [bool, methods]
}

export default useBoolean
