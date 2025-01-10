const express = require('express');
const { getVideo } = require('@neoxr/youtube-scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/youtube-downloader', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'You must provide a YouTube URL' });
  }

  try {
    const videoData = await getVideo(url);
    if (!videoData) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.status(200).json({
      title: videoData.title,
      description: videoData.description,
      thumbnail: videoData.thumbnail,
      video_url: videoData.formats[0].url, // First format's URL
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video details', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
