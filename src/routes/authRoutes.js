const {Router} = require('express')
const router = Router()
const {userSignUp, userLogin, getSignUpPage, getLoginPage} = require('../controllers/authControllers')


// POST routes

// @routes /signup
// @desc   Signup
router.post('/signup', userSignUp)

// @routes /login
// @desc   Login
router.post('/login', userLogin)

// GET routes

router.get('/signup', getSignUpPage)
router.get('/login', getLoginPage)


module.exports = router