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

exports.userSignUp = (req, res) => {
    const userFound = User.findOne({email: req.body.email})

    if(userFound) {
        req.flash("error", "User with this email already exists")
        res.redirect("/signup")
    }
    
    User.create({
        email: req.body.email,
        password: req.body.password
    }).then((newUser) => {
       
        const salt = 12
        const hashPassword = bcrypt.hash(req.body.password,salt)

        newUser.password = hashPassword
        newUser.save()
    }).then(() => {
        res.redirect("/login")
        console.log("Finally login")
    }).catch((err) => {
        console.log(err)
        req.flash("error", "User not created")

    })
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