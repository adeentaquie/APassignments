import Link from 'next/link';
import data from '@/data.json';
import styles from '@/styles/MovieDetail.module.css'; // Assuming the styles are in this module

export async function getStaticPaths() {
  const paths = data.movies.map(m => ({ params: { id: m.id } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const movie = data.movies.find(m => m.id === params.id);
  return movie ? { props: { movie }, revalidate: 10 } : { notFound: true };
}

export default function MovieDetail({ movie }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.movieTitle}>{movie.title}</h1>
      <p className={styles.movieDescription}>{movie.description}</p>
      <p className={styles.movieDetails}>Year: {movie.releaseYear}</p>
      <p className={styles.movieDetails}>Rating: ⭐ {movie.rating}</p>
      <Link href={`/movies/${movie.id}/director`}>
        <button className={styles.viewDirectorButton}>
          View Director
        </button>
      </Link>
    </div>
  );
}
