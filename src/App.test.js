import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

global.fetch = jest.fn()

describe('App integration tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays "no results" message while having no movies', () => {
    render(<App />)

    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })

  it('displays movies when searching', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            Response: 'True',
            Search: [
              { Title: 'title 1', imdbID: '1' },
              { Title: 'title 2', imdbID: '2' },
            ],
            totalResults: '2',
          }),
      }),
    )

    render(<App />)
    expect(screen.getByText('No results yet')).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')
    fireEvent.change(input, { target: { value: 'title' } })
    fireEvent.click(button)

    expect(await screen.findByText('title 1')).toBeInTheDocument()
    expect(await screen.findByText('title 2')).toBeInTheDocument()
  })
})
