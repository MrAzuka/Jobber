const axios = require('axios')
const cheerio = require('cheerio')


const url = 'https://www.pdfdrive.com/'

axios(url)
    .then(response => {
        const html = response.data
        const books = []
        const $ = cheerio.load(html)

        $('.img-zoom file-img',).each(function() {
           const title = $(this).find('img').attr('title')

           books.push({
               title,
           })
        })
        $('.file-left', html).each(function() {
            const link =  $(this).find('a').attr('href')
 
            books.push({
                link
            })
         })
        console.log(books)
    }).catch(err => {console.log(err)})


