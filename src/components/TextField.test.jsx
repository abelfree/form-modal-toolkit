import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TextField } from './TextField'

describe('TextField', () => {
  it('associates the label with the input for accessibility', () => {
    render(<TextField label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders an error message and marks the input invalid', () => {
    render(<TextField label="Email" error="Enter a valid email address" />)
    const input = screen.getByLabelText('Email')
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not render an error message when there is no error', () => {
    render(<TextField label="Email" />)
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'false')
  })
})
