# 🎬 ytAPI

A simple and lightweight Node.js API to search YouTube videos and get direct stream URLs using [`yt-search`](https://www.npmjs.com/package/yt-search) and [`@distube/ytdl-core`](https://www.npmjs.com/package/@distube/ytdl-core).

## 🚀 Features

- 🔎 Search YouTube videos by query
- 🎥 Get direct video stream URL from a YouTube link
- 🌐 JSON API responses ready to use in web or app projects

## 🛠️ Technologies Used

- [Express.js](https://expressjs.com/) – Web server
- [yt-search](https://www.npmjs.com/package/yt-search) – YouTube search utility
- [@distube/ytdl-core](https://www.npmjs.com/package/@distube/ytdl-core) – YouTube video downloader core

---

## 📦 Installation

```bash
git clone https://github.com/milancodess/ytAPI.git
cd ytAPI
npm install
```

---

## ▶️ Usage

### Start the server

```bash
node index.js
or
npm start
```

---

## 📡 API Endpoints

### `GET /`

Basic health check

**Response:**

```json
{
  "result": true,
  "message": "Success"
}
```

---

### `GET /search?query=your+search+term`

Searches YouTube for videos matching the query.

**Query Parameters:**

- `query` – The search term (required)

**Example:**

```bash
/search?query=kal+ho+na+ho
```

**Response:**

```json
[
  {
    "type": "video",
    "videoId": "g0eO74UmRBs",
    "url": "https://youtube.com/watch?v=g0eO74UmRBs",
    "title": "Kal Ho Naa Ho Full Video - Title Track | Shah Rukh Khan, Saif Ali Khan, Preity Zinta | Sonu Nigam",
    "description": "A soulful melody pondering on life is sung by Sonu Nigam featuring the stars of the film 'Kal Ho Naa Ho' - Shah Rukh Khan, Preity ...",
    "image": "https://i.ytimg.com/vi/g0eO74UmRBs/hq720.jpg",
    "thumbnail": "https://i.ytimg.com/vi/g0eO74UmRBs/hq720.jpg",
    ...
  },
  ...
]
```

---

### `GET /api/ytdl?url=https://youtube.com/watch?v=g0eO74UmRBs`

Fetches the direct stream URL of a YouTube video.

**Query Parameters:**

- `url` – The full YouTube video URL (required)

**Example:**

```bash
/api/ytdl?url=https://www.youtube.com/watch?v=jfKfPfyJRdk
```

**Response:**

```json
{
  "url": "https://rr6---sn-fapo3ox25a-3uhk.googlevideo.com/videoplayback?expire=1753133157&ei=BVx-aND3CLDsg8UP35TroQQ&......"
}
```

---

## ⚠️ Notes

- Host it on [Render](https://render.com), [Vercel](https://vercel.com/), or your own VPS.

---

## 👨‍💻 Author

**Milan Bhandari** – [@milancodess](https://github.com/milancodess)
