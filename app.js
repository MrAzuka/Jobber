const PORT = 8000 || process.env.PORT
const express = require('express')
// const scraper = require('./src/scraper/bookScraper')
require('dotenv').config()
const {connectDB} = require('./src/DB/connectDB')
const authRoutes = require('./src/routes/authRoutes')

const app = express()

connectDB()

app.use(express.json())

app.use(authRoutes)


app.listen(PORT, ()=>{
    console.log('Server running on PORT 8000')
})