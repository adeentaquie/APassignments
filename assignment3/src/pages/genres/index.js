// pages/genres/index.js
import Link from "next/link";
import styles from "@/styles/Genres.module.css";

export async function getStaticProps() {
  const data = await import("@/data.json");
  return {
    props: {
      genres: data.genres,
    },
    revalidate: 10,
  };
}

export default function Genres({ genres }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Genres</h1>
      <div className={styles.genreGrid}>
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genres/${genre.id}`}
            className={styles.genreCard}
          >
            <h2 className={styles.genreTitle}>{genre.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
