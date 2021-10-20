const session = require('express-session')
const MongoSession = require('connect-mongodb-session')(session)
require('dotenv').config()
const {MONGO_URI} = process.env


exports.store = new MongoSession({
    uri: MONGO_URI,
    collection: 'Sessions'
})