import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();
  return (
    <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#ffebee', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#d32f2f' }}>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button onClick={() => router.push('/')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px' }}>
        Go Home
      </button>
    </div>
  );
}