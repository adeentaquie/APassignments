// pages/help/[...slug].js - Catch-All Help Page
import { useRouter } from 'next/router';
import Link from 'next/link';

const helpContent = {
  '': {
    title: 'Help Center',
    body: 'Welcome to the Movie House Help Center. Use the links below to explore our FAQs, contact options, and privacy policy.'
  },
  faqs: {
    title: 'Frequently Asked Questions',
    body: 'Here you can find answers to common questions about using the Movie House app, browsing movies, and filtering by genre or director.'
  },
  contact: {
    title: 'Contact Us',
    body: 'Need help? Reach out to our team at support@moviehouse.com. We’re here to assist you 24/7.'
  },
  privacy: {
    title: 'Privacy Policy',
    body: 'We respect your privacy. Read about how your data is handled and protected in our platform.'
  }
};

export default function Help() {
  const { query } = useRouter();
  const slug = query.slug || [];
  const pageKey = slug[0] || '';
  const content = helpContent[pageKey] || { title: 'Help Page', body: 'The requested help topic was not found.' };

  return (
    <div style={{ padding: '2rem', background: '#ede7f6', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', color: '#512da8' }}>{content.title}</h1>
      <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>{content.body}</p>

      <div style={{ marginTop: '2rem' }}>
        <h3>Explore Help Topics:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link href="/help/faqs" style={{ color: '#303f9f' }}>📌 FAQs</Link></li>
          <li><Link href="/help/contact" style={{ color: '#303f9f' }}>📧 Contact</Link></li>
          <li><Link href="/help/privacy" style={{ color: '#303f9f' }}>🔒 Privacy Policy</Link></li>
        </ul>
      </div>
    </div>
  );
}
