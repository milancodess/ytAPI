const express = require("express");
const yts = require("yt-search");
const ytdl = require("@distube/ytdl-core");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ result: true, message: "Success" });
});

// Search YouTube videos
app.get("/search", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const result = await yts(query);
    res.json(result.videos);
  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({ error: "Search failed" });
  }
});

// Get direct stream URL using ytdl-core
app.get("/api/ytdl", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const firstFormat = info.formats.find((f) => f.url);

    if (!firstFormat?.url) {
      return res.status(404).json({ error: "No downloadable URL found." });
    }

    res.json({ url: firstFormat.url });
  } catch (error) {
    console.error("Failed to fetch video info:", error);
    res.status(500).json({ error: "Failed to fetch video info." });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 API is live on port http://localhost:${PORT}`);
});
