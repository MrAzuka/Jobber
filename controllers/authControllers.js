const User = require('../models/authUser')
const bcrypt = require('bcrypt')
const passport = require('passport')




exports.userSignUp = (req, res) => {
    const userFound = User.findOne({username: req.body.username})
    
    if(userFound) {
        req.flash("error", "User with this username already exists")
        res.redirect("/signup")
        return 
    }
    
    bcrypt.genSalt(12, function (err, salt) {
        if (err) return next(err)
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) return next(err)
            const newUser = new User({
                username: req.body.username,
                password: hash
            })
            console.log(newUser)
            newUser.save()

            res.redirect('/login')
        })
    })
    
} 
    


exports.userLogin = passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login?error=true",
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