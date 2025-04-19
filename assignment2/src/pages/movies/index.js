import Link from 'next/link';
import styles from '@/styles/MovieCard.module.css';
import data from '@/data.json';
import { useState } from 'react';

export async function getStaticProps() {
  return { props: { movies: data.movies, genres: data.genres }, revalidate: 10 };
}

export default function Movies({ movies, genres }) {
  const [genre, setGenre] = useState('');
  const filtered = genre ? movies.filter(m => m.genreId === genre) : movies;

  return (
    <div className={styles.grid}>
      <select onChange={e => setGenre(e.target.value)} className={styles.card}>
        <option value=''>All Genres</option>
        {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>
      {filtered.map(movie => (
        <Link href={`/movies/${movie.id}`} key={movie.id} className={styles.card}>
          <div>
            <h3>{movie.title}</h3>
            <p>Year: {movie.releaseYear}</p>
            <p>Rating: ⭐ {movie.rating}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}