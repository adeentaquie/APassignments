// pages/api/genres/[id]/movies.js
import data from "@/data.json";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const filtered = data.movies.filter((m) => m.genreId === id);
  return res.status(200).json(filtered);
}
