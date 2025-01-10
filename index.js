const { Youtube } = require('@neoxr/youtube-scraper');

// Initialize the YouTube scraper with configuration
const yt = new Youtube({
  fileAsUrl: true // Ensures the returned file is a direct URL
});

// Function to search and retrieve video details
async function getYoutubeVideo(query, format = 'video, 720p') {
  try {
    console.log(`Searching for "${query}" with format "${format}"...`);

    // Fetch the video information
    const videoData = await yt.play(query, format);

    if (!videoData) {
      console.error('No video found for the query!');
      return;
    }

    // Print the retrieved video data
    console.log('Video Details:');
    console.log(`Title: ${videoData.title}`);
    console.log(`Duration: ${videoData.duration}`);
    console.log(`Thumbnail: ${videoData.thumbnail}`);
    console.log(`Download URL: ${videoData.url}`);
  } catch (error) {
    // Handle errors (e.g., video not found, invalid format)
    console.error('Error:', error.message);
  }
}

// Run the function with a search query
getYoutubeVideo('wide awake', 'video, 720p');
