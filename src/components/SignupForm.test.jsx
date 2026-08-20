import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SignupForm } from './SignupForm'

describe('SignupForm', () => {
  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    render(<SignupForm onSubmit={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(await screen.findByText(/name must be at least 2 characters/i)).toBeInTheDocument()
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument()
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
  })

  it('calls onSubmit with the entered values when valid', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<SignupForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/name/i), 'Abel Takele')
    await user.type(screen.getByLabelText(/email/i), 'abel@example.com')
    await user.type(screen.getByLabelText(/password/i), 'supersecret')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Abel Takele',
        email: 'abel@example.com',
        password: 'supersecret',
      }),
    )
  })
})
