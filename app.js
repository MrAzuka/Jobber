require('dotenv').config()
const express = require('express')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const flash = require('express-flash')
const methodOveride = require('method-override')
const {PORT, SESSION_SECRET_KEY } = process.env
const {connectDB} = require('./DB/connectDB')
const authRoutes = require('./routes/authRoutes')
const {store} = require('./sessions/sessionsConfig')

const app = express()

// Database Connection
connectDB()


// View Engine
app.set('view engine', 'ejs')


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())
// NOTE: Always put session before passport.session
app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOveride('_method'))
app.use(express.static('public'))


// Routes
app.use(authRoutes)

app.listen(PORT, ()=>{
    console.log('Server running on PORT 8000')
})