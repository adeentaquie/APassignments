import data from '@/data.json';
import styles from '@/styles/Director.module.css'; // Importing the Director module styles

export async function getStaticPaths() {
  return {
    paths: data.movies.map(m => ({ params: { id: m.id } })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const movie = data.movies.find(m => m.id === params.id);
  const director = data.directors.find(d => d.id === movie?.directorId);
  return director ? { props: { director }, revalidate: 10 } : { notFound: true };
}

export default function Director({ director }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.directorName}>{director.name}</h2>
      <p className={styles.directorBio}>{director.biography}</p>
    </div>
  );
}
