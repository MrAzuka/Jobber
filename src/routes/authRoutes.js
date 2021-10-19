const {Router} = require('express')
const router = Router()
const {userSignUp, userLogin} = require('../controllers/authControllers')

router.post('/signup', userSignUp)
router.post('/login', userLogin)


module.exports = router