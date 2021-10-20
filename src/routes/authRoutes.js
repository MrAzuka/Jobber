const {Router} = require('express')
const router = Router()
const {userSignUp, userLogin, getSignUpPage, getLoginPage, getHomePage, userLogout} = require('../controllers/authControllers')
const {isAuth} = require('../middleware/isAuth')


// POST routes

// @routes /signup
// @desc   Signup
router.post('/signup', userSignUp)

// @routes /login
// @desc   Login
router.post('/login', userLogin)

// @routes /logout
// @desc   Logout
router.post('/logout', userLogout)

// GET routes

// @routes /signup
// @desc   Get signup page
router.get('/signup', getSignUpPage)

// @routes /login
// @desc   Get login page
router.get('/login', getLoginPage)

// @routes /home
// @desc   Get home page
router.get('/home', isAuth, getHomePage)

module.exports = router