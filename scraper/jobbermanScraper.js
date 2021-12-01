const request = require('request')
const cheerio = require('cheerio')


exports.jobScraper = (req, res, url) => {

    let title, company, link;
    const jobs = [];

    request(url, function (err, response, html) {
        const $ = cheerio.load(html);
        let c = 0;
        let l = 0;
        $('.break-words').each(function () {
            const data = $(this);

            title = data.attr('title');
            jobs.push({ title });
        });

        $('.search-result__job-meta').each(function () {
            const data = $(this);

            company = data.text().trim();
            jobs[c].company = company;
            c++;
        });

        $('.break-words').each(function () {
            const data = $(this);

            link = data.attr('href');
            jobs[l].link = link;
            l++;
        });
        // console.log(jobs)
        res.render('home', {
            jobs
        })
    });
}