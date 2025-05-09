import Link from "next/link";
import styles from "@/styles/Director.module.css";

export async function getStaticPaths() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/movies`);
  const movies = await res.json();

  const paths = movies.map((m) => ({
    params: { id: m.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // 1. Fetch the movie to get its directorId
  const movieRes = await fetch(`${base}/api/movies/${params.id}`);
  if (movieRes.status === 404) return { notFound: true };
  const movie = await movieRes.json();

  // 2. Fetch the director (with their movies attached)
  const dirRes = await fetch(`${base}/api/directors/${movie.directorId}`);
  if (dirRes.status === 404) return { notFound: true };
  const directorData = await dirRes.json();

  return {
    props: {
      director: {
        ...directorData,
        movies: Array.isArray(directorData.movies) ? directorData.movies : [],
      },
    },
    revalidate: 10,
  };
}

export default function Director({ director }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.directorName}>{director.name}</h2>
      <p className={styles.directorBio}>{director.biography}</p>

      <h3 className={styles.filmographyHeading}>
        Films by {director.name}
      </h3>
      <ul className={styles.filmographyList}>
        {director.movies.length > 0 ? (
          director.movies.map((m) => (
            <li key={m.id} className={styles.filmItem}>
              <Link href={`/movies/${m.id}`} className={styles.filmLink}>
                {m.title} ({m.releaseYear})
              </Link>
            </li>
          ))
        ) : (
          <li className={styles.noFilms}>No films found for this director.</li>
        )}
      </ul>
    </div>
  );
}
