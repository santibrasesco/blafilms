import { useEffect, useState } from 'react'

export const useMoviesFetch = (searchParams, shouldFetch) => {
  const [searchResult, setSearchResult] = useState(null)
  const { filter, page } = searchParams

  useEffect(() => {
    if (!shouldFetch) return

    const search = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=a461e386&s=${filter}&page=${page}`,
        )

        const data = await response.json()
        if (data.Response === 'True') {
          setSearchResult(data)
        } else {
          setSearchResult(null)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setSearchResult(null)
      }
    }

    search()
  }, [searchParams])

  return searchResult
}
