import Link from 'next/link';
import data from '@/data.json';

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
    <div style={{ padding: '2rem', background: '#fff3e0', minHeight: '100vh' }}>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Year: {movie.releaseYear}</p>
      <p>Rating: ⭐ {movie.rating}</p>
      <Link href={`/movies/${movie.id}/director`}>
        <button style={{ marginTop: '1rem', backgroundColor: '#0288d1', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>
          View Director
        </button>
      </Link>
    </div>
  );
}