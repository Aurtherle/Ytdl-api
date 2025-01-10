const { Youtube } = require('@neoxr/youtube-scraper');

// Initialize the YouTube scraper
const yt = new Youtube({
  fileAsUrl: true // Ensures direct URLs for downloads
});

// Vercel API handler
export default async function handler(req, res) {
  // Allow only GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed. Use GET requests only.' });
  }

  // Extract query parameters
  const { query, format } = req.query;

  // Validate query parameters
  if (!query) {
    return res.status(400).json({ error: 'Missing "query" parameter. Please provide a search term or YouTube URL.' });
  }

  try {
    // Search for the video
    console.log(`Searching for: "${query}" with format: "${format || 'video, 720p'}"`);
    const videoData = await yt.play(query, format || 'video, 720p');

    // Check if video data was found
    if (!videoData) {
      return res.status(404).json({ error: 'No video found for the provided query.' });
    }

    // Return video details
    res.status(200).json({
      title: videoData.title,
      duration: videoData.duration,
      thumbnail: videoData.thumbnail,
      download_url: videoData.url // Direct URL for the specified format
    });
  } catch (error) {
    // Handle errors gracefully
    console.error('Error fetching video:', error.message);
    res.status(500).json({ error: 'Failed to fetch video details.', details: error.message });
  }
}
