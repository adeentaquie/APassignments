import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Help.module.css'; // Importing the Help module styles

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
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>{content.title}</h1>
      <p className={styles.pageBody}>{content.body}</p>

      <div className={styles.helpTopics}>
        <h3>Explore Help Topics:</h3>
        <ul className={styles.topicList}>
          <li><Link href="/help/faqs" className={styles.topicLink}>📌 FAQs</Link></li>
          <li><Link href="/help/contact" className={styles.topicLink}>📧 Contact</Link></li>
          <li><Link href="/help/privacy" className={styles.topicLink}>🔒 Privacy Policy</Link></li>
        </ul>
      </div>
    </div>
  );
}
