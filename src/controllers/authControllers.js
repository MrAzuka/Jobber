const bcrypt = require('bcrypt')
const User = require('../models/authUser')


exports.userSignUp = async (req, res) => {
   const {username, email, password} = req.body

   let user = await User.findOne({email})

   if (user) {
       res.status(400).json('User already exist')
   }

   user = new User({
       username,
       email,
       password
   })

   await user.save()
   res.status(200).json('User Creation Success')
}

exports.userLogin = async (req, res) => {
    const {username, password} = req.body

    let user = await User.findOne({username})
 
    if (!user) {
        res.status(200).json('User doesn\'t exist')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        res.status(200).json('Go and login')   
    }
    req.session.isAuth = true
    res.status(200).json('Login Success')
}

exports.userLogout = async (req, res) => {
    try {
        await req.session.destroy()
        res.status(200).json('Logout Success')
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getSignUpPage = async (req, res) => {
    res.status(200).json('SignUp page')
}

exports.getLoginPage = async (req, res) => {
    res.status(200).json('Login Page')
}

exports.getHomePage = async (req, res) => {
    res.status(200).json('Home Page')
}

