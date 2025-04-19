import data from '@/data.json';

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
    <div style={{ padding: '2rem', backgroundColor: '#e0f7fa', minHeight: '100vh' }}>
      <h2>{director.name}</h2>
      <p>{director.biography}</p>
    </div>
  );
}
