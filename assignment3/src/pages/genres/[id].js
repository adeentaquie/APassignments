// pages/genres/[id].js
import Link from "next/link";
import styles from "@/styles/MoviesByGenre.module.css"; 

export async function getStaticPaths() {
  const data = await import("@/data.json");
  const paths = data.genres.map((g) => ({
    params: { id: g.id },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // fetch the genre name (optional)
  const allGenresRes = await fetch(`${base}/api/genres`);
  const allGenres = await allGenresRes.json();
  const genre = allGenres.find((g) => g.id === params.id);

  // fetch movies for this genre
  const moviesRes = await fetch(`${base}/api/genres/${params.id}/movies`);
  const movies = await moviesRes.json();

  if (!genre) {
    return { notFound: true };
  }

  return {
    props: {
      genre,
      movies,
    },
    revalidate: 10,
  };
}

export default function MoviesByGenre({ genre, movies }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{genre.name} Movies</h1>
      <div className={styles.movieGrid}>
        {movies.map((m) => (
          <Link
            href={`/movies/${m.id}`}
            key={m.id}
            className={styles.card}
          >
            <h3 className={styles.cardTitle}>{m.title}</h3>
            <p className={styles.cardText}>Year: {m.releaseYear}</p>
            <p className={styles.cardText}>⭐ {m.rating}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
