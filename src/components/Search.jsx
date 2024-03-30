import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearch } from '../hooks/useSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import debounce from 'just-debounce-it'
import './styles/Search.css'
export function Search () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const [viewSearch, setViewSearch] = useState(false)

  const debouncedMovies = useCallback(debounce(search => {
    if (search) window.location.href = `/search/${search}/${sort}`
  }, 500)
  , [])
  const menuRef = useRef()
  useEffect(() => {
    function handler (e) {
      if (!menuRef.current.contains(e.target)) { setViewSearch(false) }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })
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

  function handleSort () {
    console.log(!sort)
    setSort(!sort)
  }

  function handleViewSearch (event) {
    const newView = !viewSearch
    setViewSearch(newView)
  }
  return (
    <>

      <form action='' onSubmit={handleSubmit} className='desktop-search'>
        <input
          style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
          value={search}
          onChange={handleChange}
          placeholder='Avengers, Star wars ...' name='search' id=''
        />

        <button type='submit'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {/* <input type='checkbox' name='' id='' onChange={handleSort} checked={sort} /> */}

      </form>
      <div className='mobile-search' ref={menuRef}>

        <form
          action='' onSubmit={handleSubmit}

        >

          <input
            className={`input-mobile ${viewSearch === true ? '' : 'invisible'}`}
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
            value={search}
            onChange={handleChange}
            placeholder='Avengers, Star wars ...' name='search' id=''
          />

          {/* <input type='checkbox' name='' id='' onChange={handleSort} checked={sort} /> */}

        </form>
        <button className='mobile-search-button' role='button' onClick={handleViewSearch}>
          <FontAwesomeIcon icon={viewSearch ? faXmark : faSearch} />
        </button>
      </div>
    </>

  )
}
