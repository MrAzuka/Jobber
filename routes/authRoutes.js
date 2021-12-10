const { Router } = require('express')
const router = Router()
const { userSignUp, userLogin, getSignUpPage, getLoginPage, userLogout } = require('../controllers/authControllers')

// POST routes

// @routes /auth/signup
// @desc   Signup
router.post('/signup', userSignUp)

// @routes /auth/login
// @desc   Login
router.post('/login', userLogin)


// GET routes

// @routes /auth/signup
// @desc   Get signup page
router.get('/signup', getSignUpPage)

// @routes /auth/login
// @desc   Get login page
router.get('/login', getLoginPage)


//  DELETE ROUTE

// @routes /auth/logout
// @desc   Logout
router.delete('/logout', userLogout)

module.exports = router