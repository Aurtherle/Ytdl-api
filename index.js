const { getVideo } = require('@neoxr/youtube-scraper');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}
