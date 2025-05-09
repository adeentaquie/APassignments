import Link from 'next/link';
import styles from '@/styles/MovieCard.module.css';

export async function getStaticProps() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${base}/api/movies`);
  const movies = await res.json();

  if (!movies || movies.length === 0) {
    return { notFound: true };
  }

  return {
    props: { movies },
    revalidate: 10, // ISR: regenerate every 10 seconds
  };
}

export default function Movies({ movies }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Movies</h1>

      <div className={styles.grid}>
        {movies.map((movie) => (
          <Link
            href={`/movies/${movie.id}`}
            key={movie.id}
            className={styles.card}
          >
            <div
              className={styles.cardContent}
              style={{
                background: movie.colorStart && movie.colorEnd
                  ? `linear-gradient(to right, ${movie.colorStart}, ${movie.colorEnd})`
                  : undefined,
              }}
            >
              <h3 className={styles.cardTitle}>{movie.title}</h3>
              <p className={styles.cardText}>Year: {movie.releaseYear}</p>
              <p className={styles.cardText}>Rating: ⭐ {movie.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
