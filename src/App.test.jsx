import { test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App.jsx', () => {
  test('if title renders on navbar', () => {
    render(<App />)
    const linkElement = screen.getByText(/Zenika Cities weather/i)
    expect(linkElement).toBeInTheDocument()
  })
})
