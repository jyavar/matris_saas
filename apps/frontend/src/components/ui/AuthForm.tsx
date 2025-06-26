import React, { useState } from 'react'

type AuthFormProps = {
  onSubmit: (email: string, password: string) => void
  title?: string
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, title = 'Sign In' }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow w-full max-w-sm mx-auto"
      role="form"
      aria-label="Authentication form"
    >
      <h2
        className="text-xl font-semibold text-center"
        role="heading"
        aria-level={2}
      >
        {title}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
        aria-label="Email address"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
        aria-label="Password"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        aria-label={title}
      >
        {title}
      </button>
    </form>
  )
}

export default AuthForm
