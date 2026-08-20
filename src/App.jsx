import { useState } from 'react'
import { Modal } from './components/Modal'
import { SignupForm } from './components/SignupForm'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [lastSubmission, setLastSubmission] = useState(null)

  async function handleSubmit(values) {
    setLastSubmission(values)
    setIsOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 px-4 text-center">
      <div>
        <p className="text-sm font-medium text-emerald-400">Component toolkit</p>
        <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">Modal + Form components</h1>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          A reusable, accessible Modal and a validated SignupForm, covered by unit tests.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        Open sign-up modal
      </button>

      {lastSubmission && (
        <p className="text-sm text-slate-500">
          Last submission: <span className="text-slate-200">{lastSubmission.name}</span> (
          {lastSubmission.email})
        </p>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create your account">
        <SignupForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  )
}

export default App
