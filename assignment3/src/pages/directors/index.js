// pages/directors/index.js
import Link from "next/link";
import styles from "@/styles/Directors.module.css";
import data from "@/data.json";

export async function getStaticProps() {
  // Directly import data.json at build time
  const { directors } = data;

  return {
    props: { directors },
    revalidate: 10, // ISR: update every 10 seconds
  };
}

export default function Directors({ directors }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Directors</h1>
      <div className={styles.directorGrid}>
        {directors.map((d) => (
          <Link
            key={d.id}
            href={`/directors/${d.id}`}
            className={styles.directorCard}
          >
            <h2 className={styles.directorName}>{d.name}</h2>
            <p className={styles.directorBio}>{d.biography}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
