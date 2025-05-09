import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getStaticProps() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Fetch all movies from your API
  const res = await fetch(`${base}/api/movies`);
  const movies = await res.json();

  // Compute top-3 by rating
  const trending = movies
    .slice()                            // copy to avoid mutating
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  if (!trending.length) {
    return { notFound: true };
  }

  return {
    props: { trending },
    revalidate: 10,  // ISR: regenerate every 10 seconds
  };
}

export default function Home({ trending }) {
  if (!trending) {
    return <div>Movie data not found.</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>🎬 Trending Movies</title>
      </Head>

      <h1 className={styles.heading}>🎬 Trending Movies</h1>

      <div className={styles.movieGrid}>
        {trending.map((movie) => (
          <Link
            href={`/movies/${movie.id}`}
            key={movie.id}
            className={styles.card}
          >
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{movie.title}</h3>
              <p className={styles.cardText}>⭐ {movie.rating}</p>
              <p className={styles.cardText}>Year: {movie.releaseYear}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <Link href="/movies">
          <button className={styles.button}>All Movies</button>
        </Link>
        <Link href="/genres">
          <button className={styles.button}>Browse Genres</button>
        </Link>
        <Link href="/directors">
          <button className={styles.button}>Explore Directors</button>
        </Link>
        <Link href="/help/faqs">
          <button className={styles.button}>Help</button>
        </Link>
      </div>
    </div>
  );
}