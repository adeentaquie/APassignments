// pages/api/directors/[id].js
import data from "@/data.json";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const director = data.directors.find((d) => d.id === id);

  if (!director) {
    return res.status(404).json({ error: "Director not found" });
  }

  // Attach that director’s movies
  const moviesByDirector = data.movies.filter((m) => m.directorId === id);
  return res.status(200).json({ ...director, movies: moviesByDirector });
}
