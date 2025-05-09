// pages/directors/[id].js
import Link from "next/link";
import styles from "@/styles/Director.module.css";

export async function getStaticPaths() {
  const { directors } = await import("@/data.json");
  const paths = directors.map((d) => ({ params: { id: d.id } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/directors/${params.id}`);

  if (res.status === 404) {
    return { notFound: true };
  }

  const director = await res.json();
  return {
    props: { director },
    revalidate: 10,
  };
}

export default function DirectorDetail({ director }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.directorName}>{director.name}</h1>
      <p className={styles.directorBio}>{director.biography}</p>

      <h2 className={styles.filmographyHeading}>Filmography</h2>
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
          <li className={styles.noFilms}>No films found.</li>
        )}
      </ul>
    </div>
  );
}
