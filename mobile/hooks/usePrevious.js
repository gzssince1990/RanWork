import { useRef, useEffect } from 'react'

export default usePrevious = (value) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
