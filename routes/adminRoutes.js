const { Router } = require('express')
const router = Router()
const { checkIsAdmin } = require('../middleware/isAdmin')
const { isAuth } = require('../middleware/isAuth')
const { getAllUsers, getOneUser, updateUser, deleteUser } = require('../controllers/adminController')


// For admin User only
// Admin can perform CRUD operations on the user account

// GET routes

// @routes /admin/user
// @desc   Get All Users
router.get('/user', isAuth, checkIsAdmin, getAllUsers)

// @routes /admin/user/:email
// @desc   Get User by email
router.get('/user/:email', isAuth, checkIsAdmin, getOneUser)

// PUT route

// @routes /admin/user/:email
// @desc   Update User by email
router.put('/user/:email', isAuth, checkIsAdmin, updateUser)

// DELETE route

// @routes /admin/user/:email
// @desc   Delete User by email
router.delete('/user/:email', isAuth, checkIsAdmin, deleteUser)


module.exports = router