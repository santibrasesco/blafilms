import { fireEvent, render, screen } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('SearchBarComponent', () => {
  it('call handleSearch when clicking the button', () => {
    const handleClick = jest.fn()
    render(<SearchBar handleSearch={handleClick} />)

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')
    fireEvent.change(input, { target: { value: 'testing' } })
    fireEvent.click(button)

    expect(handleClick).toBeCalledWith('testing')
  })
})
