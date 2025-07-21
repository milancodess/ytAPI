const cheerio = require("cheerio");
const express = require("express");
const yts = require("yt-search");
const axios = require("axios");
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
  const videoURL = req.query.url;

  if (!videoURL) {
    return res
      .status(400)
      .json({ error: "Missing YouTube URL in 'url' query parameter" });
  }

  try {
    const response = await axios.post(
      "https://ssyoutube.online/yt-video-detail/",
      new URLSearchParams({ videoURL }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "user-agent": "Mozilla/5.0",
          referer: "https://ssyoutube.online/",
          cookie: "pll_language=en",
        },
      }
    );

    const $ = cheerio.load(response.data);
    const results = [];

    $("tbody tr").each((_, el) => {
      const qualityRaw = $(el).find("td").first().text().trim();
      const quality = qualityRaw.replace(/\s+/g, " ");
      const size = $(el).find("td").eq(1).text().trim();
      const url = $(el).find("button").attr("data-url");

      if (url) {
        results.push({ quality, size, url });
      }
    });

    res.json({ result: true, data: results });
  } catch (err) {
    console.error("Error:", err.message);
    res
      .status(500)
      .json({ result: false, error: "Failed to fetch download links" });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 API is live on port http://localhost:${PORT}`);
});
