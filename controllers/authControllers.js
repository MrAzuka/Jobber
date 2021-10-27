const User = require('../models/authUser')
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('../passport-config/passport-config')


initializePassport(
    passport, 
    async (email) => {
        const userFound = await User.findOne({email})
        return userFound
    },
    async (id) => {
        const userFound = await User.findOne({_id: id})
        return userFound
    }
)

exports.userSignUp = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email})

    if(userFound) {
        req.flash("error", "User with this email already exists")
        res.redirect("/signup")
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        await user.save()
        res.redirect("/login")
    } catch (err) {
           console.log({err})
           res.redirect("/signup")
       }
    
}

exports.userLogin = passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true
})

exports.userLogout = (req,res) => {
    req.logOut()
    res.redirect("/")
}

exports.getSignUpPage =  (req, res) => {
    res.render('signup')
    // res.status(200).json('SignUp page')
}

exports.getLoginPage =  (req, res) => {
    res.render('login.ejs')
    // res.status(200).json('Login Page')
}

exports.getHomePage =  (req, res) => {
    res.render('home.ejs')
    // res.status(200).json('Home Page')
}

exports.getLandingPage =  (req, res) => {
    res.render('landing.ejs')
    // res.status(200).json('Home Page')
}