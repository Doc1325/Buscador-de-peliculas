import { useState, useEffect, useRef } from 'react'
export function useSearch () {
  const [error, setError] = useState()
  const [search, updateSearch] = useState('')
  const firstInput = useRef(true)
  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = false
      return
    }
    if (search === '') {
      setError('No se puede realizar una busqueda vacia')
      return
    }
    if (search.length < 3) {
      setError('La busqueda debe tener al menos tres caracteres')
      return
    }

    setError(null)
  }, [search])
  return { search, updateSearch, error }
}
