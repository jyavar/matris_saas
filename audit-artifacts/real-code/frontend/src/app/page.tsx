import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to StratoSaaS</h1>
      <p>This is the public home page.</p>
      <Link href="/login">Go to Login</Link>
    </div>
  );
} 