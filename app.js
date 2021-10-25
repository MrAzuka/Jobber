require('dotenv').config()
const express = require('express')
const session = require('express-session')
const path = require('path')
const {PORT, SESSION_SECRET_KEY } = process.env
const {connectDB} = require('./DB/connectDB')
const authRoutes = require('./routes/authRoutes')
const {store} = require('./sessions/sessionsConfig')

const app = express()

// Database Connection
connectDB()

// View Engine
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store
}))
// app.use(cors())



// Routes
app.use(authRoutes)

app.listen(PORT, ()=>{
    console.log('Server running on PORT 8000')
})