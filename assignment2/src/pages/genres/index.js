import data from '@/data.json';
import Link from 'next/link';

export async function getServerSideProps() {
  return { props: { genres: data.genres, movies: data.movies } };
}

export default function Genres({ genres, movies }) {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#fce4ec', minHeight: '100vh' }}>
      <h1>Genres</h1>
      {genres.map(genre => (
        <div key={genre.id} style={{ marginBottom: '2rem' }}>
          <h2>{genre.name}</h2>
          <ul>
            {movies.filter(m => m.genreId === genre.id).map(m => (
              <li key={m.id}>
                <Link href={`/movies/${m.id}`}>{m.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}