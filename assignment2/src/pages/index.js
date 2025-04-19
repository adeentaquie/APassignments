import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';
import data from '@/data.json';
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
  const trending = [...data.movies].sort((a, b) => b.rating - a.rating).slice(0, 3);
  return { props: { trending }, revalidate: 10 };
}

export default function Home({ trending }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🎬 Trending Movies</h1>
      <ul className={styles.list}>
        {trending.map(movie => (
          <li key={movie.id} className={styles.item}>{movie.title} - ⭐ {movie.rating}</li>
        ))}
      </ul>

      <div className={styles.buttonGroup}>
        <Link href="/movies"><button className={styles.button}>All Movies</button></Link>
        <Link href="/genres"><button className={styles.button}>Browse Genres</button></Link>
        <Link href="/directors"><button className={styles.button}>Explore Directors</button></Link>
        <Link href="/help/faqs"><button className={styles.button}>Help</button></Link>
      </div>
    </div>
  );
}