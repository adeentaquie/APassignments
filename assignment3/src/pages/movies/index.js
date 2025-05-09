import Link from 'next/link';
import styles from '@/styles/MovieCard.module.css';
import data from '@/data.json';
import { useState } from 'react';

// Static Generation with Incremental Static Regeneration (ISR)
export async function getStaticProps() {
  const movies = data.movies;
  const genres = data.genres;

  // If no movies are found, return notFound: true
  if (!movies || movies.length === 0) {
    return { notFound: true };
  }

  // Return data for Static Generation
  return {
    props: { movies, genres },
    revalidate: 10, // Regenerate the page every 10 seconds
  };
}

export default function Movies({ movies, genres }) {
  const [genre, setGenre] = useState('');
  const filtered = genre ? movies.filter(m => m.genreId === genre) : movies;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Explore Movies</h1>

      <div className={styles.filter}>
        <select onChange={e => setGenre(e.target.value)} className={styles.genreSelect}>
          <option value=''>All Genres</option>
          {genres.map(g => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {filtered.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id} className={styles.card}>
            <div className={styles.cardContent} style={{ background: `linear-gradient(to right, ${movie.colorStart}, ${movie.colorEnd})` }}>
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
