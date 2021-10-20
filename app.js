require('dotenv').config()
const express = require('express')
const session = require('express-session')
const {PORT, SESSION_SECRET_KEY } = process.env
const {connectDB} = require('./src/DB/connectDB')
const authRoutes = require('./src/routes/authRoutes')
const {store} = require('./src/sessions/sessionsConfig')

const app = express()

// Database Connection
connectDB()

// View Engine
app.set("view engine", "ejs")

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store
}))

// Routes
app.use(authRoutes)


app.listen(PORT, ()=>{
    console.log('Server running on PORT 8000')
})