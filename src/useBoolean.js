import { useState } from 'react'

function useBoolean(initialValue = false) {
  const [bool, setBool] = useState(initialValue)
  const setTrue = () => setBool(true)
  const setFalse = () => setBool(false)
  const toggle = () => setBool(e => !e)
  return [bool, { setTrue, setFalse, toggle }]
}

export default useBoolean
