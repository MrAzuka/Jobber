const { jobScraper } = require('../scraper/jobbermanScraper')

exports.getHomePage = (req, res) => {
    url = "https://www.jobberman.com/jobs"
    jobScraper(req, res, url)
}

exports.getLandingPage = (req, res) => {
    console.log('sss')
    res.status(200).json({ message: "Welcome to the Landing Page" })
}
