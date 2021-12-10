const { Router } = require('express')
const router = Router()
const { getHomePage, getLandingPage } = require('../controllers/homeControllers')
const { isAuth } = require('../middleware/isAuth')

// GET routes

// @routes /
// @desc   Get landing page
router.get('/', getLandingPage)

// @routes /home
// @desc   Get home page
router.get('/home', isAuth, getHomePage)


module.exports = router