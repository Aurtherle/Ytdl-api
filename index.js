const { Youtube } = require('@neoxr/youtube-scraper')

// Initialize the YouTube scraper with configuration
const yt = new Youtube({
  fileAsUrl: true // Ensures the returned file is a direct URL
})

yt.play('sickick infected').then(console.log)
