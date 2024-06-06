import { Movie } from './Movie'

export const MovieList = ({ movies }) => {
  return (
    <div className="search-results-list">
      {movies.map(result => (
        <Movie key={result.imdbID} movie={result} />
      ))}
    </div>
  )
}
