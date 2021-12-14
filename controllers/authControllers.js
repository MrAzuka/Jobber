const User = require('../models/authUser')
const bcrypt = require('bcrypt')


exports.userSignUp = async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            password: hashPassword,
        })

        const user = await newUser.save()
        res.status(200).json({ message: "Signup Successful" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err })
    }
}



exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(400).json({ message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) {
            res.status(400).json({ message: "Incorrect Password" })
        }
        req.session.isAuth = true
        res.status(200).json({ message: `Login Successful. Welcome ${user.username}` })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err })
    }
}

exports.userLogout = (req, res) => {
    req.logOut()
    res.status(200).json({ message: "Logout Successful" })
}

exports.getSignUpPage = (req, res) => {
    res.status(200).json({ message: "Welcome to the Registeration Page" })
}

exports.getLoginPage = (req, res) => {
    res.status(200).json({ message: "Welcome to the Login Page" })
}
