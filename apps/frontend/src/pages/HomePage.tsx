import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div>
      <h1>Welcome to StratoSaaS</h1>
      <p>This is the public home page.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  )
}
