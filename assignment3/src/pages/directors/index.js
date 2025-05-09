import useSWR from 'swr';
import styles from '@/styles/Directors.module.css'; // Importing the Directors module styles

const fetcher = url => fetch(url).then(res => res.json());

export default function Directors() {
  const { data, error } = useSWR('/api/director', fetcher);
  
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Directors</h1>
      <div className={styles.directorGrid}>
        {data.map(d => (
          <div key={d.id} className={styles.directorCard}>
            <h2 className={styles.directorName}>{d.name}</h2>
            <p className={styles.directorBio}>{d.biography}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
