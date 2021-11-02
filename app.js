require('dotenv').config()
const express = require('express')
const exphbs  = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')
const methodOveride = require('method-override')
const {PORT, SESSION_SECRET_KEY } = process.env
const {connectDB} = require('./DB/connectDB')
const authRoutes = require('./routes/authRoutes')
const {store} = require('./sessions/sessionsConfig')
const {passportMiddleWare,serializeUser,deserializeUser} = require('./passport-config/passport-config')

const app = express()

// Database Connection
connectDB()


// View Engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())
// NOTE: Always put session before passport.session
app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use(methodOveride('_method'))
app.use(express.static('public'))

// Passport JS
app.use(passport.initialize())
app.use(passport.session())
serializeUser
deserializeUser
passportMiddleWare

// Routes
app.use(authRoutes)

app.listen(PORT, ()=>{
    console.log('Server running on PORT 8000')
})