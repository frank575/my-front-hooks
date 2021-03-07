import useMethods from './useMethods'

const methods = {
	setTrue: () => true,
	setFalse: () => false,
	toggle: state => !state,
	setState: (_, e) => e,
}

function useBoolean(initialValue = false) {
	const [bool, { setTrue, setFalse, toggle, setState }] = useMethods(
		initialValue,
		methods,
	)
	return [bool, { setTrue, setFalse, toggle, setState }]
}

export default useBoolean
