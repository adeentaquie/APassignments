// src/components/Header.jsx
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import styles from "./Header.module.css"; // optional CSS module

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>Movie House</Link>
        <div className={styles.links}>
          <Link href="/movies" className={styles.link}>Movies</Link>
          <Link href="/genres" className={styles.link}>Genres</Link>
          <Link href="/directors" className={styles.link}>Directors</Link>
        </div>
      </nav>
      <button onClick={toggleTheme} className={styles.toggle}>
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}
