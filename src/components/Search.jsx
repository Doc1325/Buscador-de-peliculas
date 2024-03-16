import { useCallback, useState } from 'react'
import { useSearch } from '../hooks/useSearch'

import debounce from 'just-debounce-it'
import './styles/Search.css'
export function Search () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()

  const debouncedMovies = useCallback(debounce(search => {
    if (search) window.location.href = `/search/${search}/${sort}`
  }, 500)
  , [])
  function handleSubmit (event) {
    event.preventDefault()

    debouncedMovies(search)
  }

  function handleChange (event) {
    const newSearch = event.target.value

    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    // debouncedMovies(newSearch)
  }

  function handleSort (params) {
    console.log(!sort)
    setSort(!sort)
  }

  return (

    <header>
      <form action='' onSubmit={handleSubmit}>
        <input
          style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
          value={search}
          onChange={handleChange}
          placeholder='Avengers, Star wars ...' name='search' id=''
        />

        <button type='submit'>Buscar</button>
        <input type='checkbox' name='' id='' onChange={handleSort} checked={sort} />

      </form>
    </header>
  )
}
