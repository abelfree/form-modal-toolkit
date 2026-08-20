import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { TextField } from './TextField'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export function SignupForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema) })

  async function submit(values) {
    await onSubmit?.(values)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
      <TextField label="Name" {...register('name')} error={errors.name?.message} />
      <TextField label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <TextField
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  )
}
