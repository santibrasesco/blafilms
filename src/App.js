import React, { useEffect, useState } from 'react'
import './App.css'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import { MovieList } from './components/MovieList'
import { SearchBar } from './components/SearchBar'
import { useMoviesFetch } from './hooks/useMoviesFetch'

function App() {
  const [searchResult, setSearchResult] = useState()
  const [searchParams, setSearchParams] = useState({
    filter: '',
    page: 1,
  })
  // evita el fetch inicial
  const [shouldFetch, setShouldFetch] = useState(false)

  const resultData = useMoviesFetch(searchParams, shouldFetch)

  useEffect(() => {
    setSearchResult(resultData)
  }, [resultData])

  const handleSearch = async (inputText, newPage) => {
    const { filter, page } = searchParams
    const validPage =
      searchResult &&
      newPage > 0 &&
      newPage <= Math.ceil(searchResult.totalResults / 10)

    const filterChanged = filter !== inputText
    const pageChanged = page !== newPage && validPage

    if (filterChanged || pageChanged) {
      setSearchParams({
        filter: inputText,
        page: pageChanged ? newPage : 1,
      })
      setShouldFetch(true)
    } else {
      setShouldFetch(false)
    }
  }

  return (
    <div className="App">
      <SearchBar
        handleSearch={filter => {
          handleSearch(filter, searchParams.page)
        }}
      />
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron">
            <ChevronLeft
              onClick={() =>
                handleSearch(searchParams.filter, searchParams.page - 1)
              }
            />
          </div>
          <MovieList movies={searchResult.Search} />
          <div className="chevron">
            <ChevronRight
              onClick={() =>
                handleSearch(searchParams.filter, searchParams.page + 1)
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
