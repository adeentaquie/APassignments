import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());

export default function Directors() {
  const { data, error } = useSWR('/api/director', fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#e8f5e9', minHeight: '100vh' }}>
      <h1>Directors</h1>
      {data.map(d => (
        <div key={d.id} style={{ marginBottom: '2rem' }}>
          <h2>{d.name}</h2>
          <p>{d.biography}</p>
        </div>
      ))}
    </div>
  );
}