import { render, screen } from '@testing-library/react'
import { Movie } from './Movie'

describe('MovieComponent', () => {
  it('Shows movie info', () => {
    const data = {
      Title: 'Title',
      Type: 'type',
      Year: '2005',
      Poster: 'poster.jpg',
    }

    render(<Movie movie={data} />)

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('type | 2005')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'poster.jpg')
  })
})
