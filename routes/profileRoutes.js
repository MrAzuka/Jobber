const { Router } = require('express')
const router = Router()
const { createProfile, updateProfile, getProfilePage } = require('../controllers/profileController')
const { isAuth } = require('../middleware/isAuth')


// POST routes

// @routes /profile
// @desc   Create User Profile
router.post('/profile', isAuth, createProfile)

// @routes /update-profile
// @desc   Update User Profile
router.post('/update-profile', isAuth, updateProfile)


// GET routes

// @routes /profile
// @desc   Get landing page
router.get('/profile', isAuth, getProfilePage)


module.exports = router