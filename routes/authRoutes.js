const { Router } = require('express')
const router = Router()
const { userSignUp, userLogin, getSignUpPage, getLoginPage, getHomePage, userLogout, getLandingPage } = require('../controllers/authControllers')
const { jobScraper } = require('../scraper/jobbermanScraper')
const { isAuth } = require('../middleware/isAuth')



// POST routes

// @routes /signup
// @desc   Signup
router.post('/signup', userSignUp)

// @routes /login
// @desc   Login
router.post('/login', userLogin)


// GET routes

// @routes /
// @desc   Get landing page
router.get('/', getLandingPage)

// @routes /signup
// @desc   Get signup page
router.get('/signup', getSignUpPage)

// @routes /login
// @desc   Get login page
router.get('/login', getLoginPage)

// @routes /home
// @desc   Get home page
router.get('/home', isAuth, getHomePage)


//  DELETE ROUTE
// @routes /logout
// @desc   Logout
router.delete('/logout', userLogout)

module.exports = router