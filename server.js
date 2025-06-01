import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

console.log("Unsplash Access Key:", accessKey);

app.use(express.static("public"));

app.get("/api/search", async (req, res) => {
  const { query, page } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query param is required" });
  }
  const url = `https://api.unsplash.com/search/photos?page=${page || 1}&query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=12`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from Unsplash:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
