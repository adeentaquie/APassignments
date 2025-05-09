// src/pages/movies/[id]/index.jsx
import Link from "next/link";
import styles from "@/styles/MovieDetail.module.css"; // or whatever module you’re using

export async function getStaticPaths() {
  // Import the raw data so we know all IDs at build time.
  const { movies } = await import("@/data.json");
  const paths = movies.map((m) => ({ params: { id: m.id } }));

  return {
    paths,
    fallback: "blocking", // build any missing page on first request
  };
}

export async function getStaticProps({ params }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Hit your API route to get the movie data
  const res = await fetch(`${base}/api/movies/${params.id}`);
  if (res.status === 404) {
    return { notFound: true };
  }
  const movie = await res.json();

  return {
    props: { movie },
    revalidate: 10, // ISR
  };
}

export default function MovieDetail({ movie }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.movieTitle}>{movie.title}</h1>
      <p className={styles.movieDescription}>{movie.description}</p>
      <p className={styles.movieDetails}>Year: {movie.releaseYear}</p>
      <p className={styles.movieDetails}>Rating: ⭐ {movie.rating}</p>

      <Link href={`/movies/${movie.id}/director`} className={styles.viewDirectorButton}>
        View Director
      </Link>
    </div>
  );
}
