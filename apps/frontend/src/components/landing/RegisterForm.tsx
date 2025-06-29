import React, { useState } from 'react'

interface RegisterFormProps {
  onSuccess?: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setSuccess(false)
    try {
      // TODO: Integrar con endpoint real
      const res = await fetch('/api/auth/signup-tenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error en el registro')
      setSuccess(true)
      setForm({ name: '', email: '', password: '', company: '' })
      if (onSuccess) onSuccess()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Error desconocido')
      } else {
        setError('Error desconocido')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="bg-white rounded-xl shadow-md p-8 w-full max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Crea tu cuenta</h2>
      <div className="mb-4">
        <label className="block text-blue-700 mb-1" htmlFor="name">
          Nombre completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border rounded p-2"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-blue-700 mb-1" htmlFor="company">
          Empresa
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          className="w-full border rounded p-2"
          value={form.company}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-blue-700 mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border rounded p-2"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <label className="block text-blue-700 mb-1" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="w-full border rounded p-2"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && (
        <div className="text-green-600 mb-4">
          ¡Registro exitoso! Revisa tu email.
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
        disabled={loading}
      >
        {loading ? 'Registrando...' : 'Crear cuenta'}
      </button>
    </form>
  )
}

export default RegisterForm
