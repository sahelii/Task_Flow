// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Task Management App</h1>
      <nav>
        <ul>
          <li><Link href="/signup">Signup</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
      </nav>
    </div>
  );
}
