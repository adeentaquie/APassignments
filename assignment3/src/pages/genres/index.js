import data from '@/data.json';
import Link from 'next/link';
import styles from '@/styles/Genres.module.css'; // Importing the genres module styles

export async function getServerSideProps() {
  return { props: { genres: data.genres, movies: data.movies } };
}

export default function Genres({ genres, movies }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Genres</h1>
      <div className={styles.genreGrid}>
        {genres.map(genre => (
          <div key={genre.id} className={styles.genreCard}>
            <h2 className={styles.genreTitle}>{genre.name}</h2>
            <ul className={styles.movieList}>
              {movies.filter(m => m.genreId === genre.id).map(m => (
                <li key={m.id} className={styles.movieItem}>
                  <Link href={`/movies/${m.id}`} className={styles.movieLink}>
                    {m.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
