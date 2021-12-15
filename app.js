require('dotenv').config()
const express = require('express')
const session = require('express-session')
const { PORT, SESSION_SECRET_KEY } = process.env
const { connectDB } = require('./DB/connectDB')
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const homeRoutes = require('./routes/homeRoutes')
const { store } = require('./sessions/sessionsConfig')
const cors = require('cors')


const app = express()

// Database Connection
connectDB()


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// NOTE: Always put session before passport.session
app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: store
}))



// Routes
app.use('/auth', authRoutes)
app.use(homeRoutes)
app.use(profileRoutes)


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})