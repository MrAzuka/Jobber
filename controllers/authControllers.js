const User = require('../models/authUser')
const bcrypt = require('bcrypt')
const passport = require('passport')




exports.userSignUp = async (req, res) => {
    const userFound = await User.findOne({username: req.body.username})
    
    if(userFound) {
        console.log("error", "User with this username already exists")
        res.redirect("/signup")
        return 
    }
       
          try {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            })
            console.log(newUser)
            await newUser.save()
            res.redirect('/login')
          } catch (err) {
              console.log(err)
          }
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
    res.render('signup', {layout: 'form.hbs'})
    // res.status(200).json('SignUp page')
}

exports.getLoginPage =  (req, res) => {
    res.render('login', {layout: 'form.hbs'})
    // res.status(200).json('Login Page')
}

exports.getHomePage =  (req, res) => {
    res.render('home')
    // res.status(200).json('Home Page')
}

exports.getLandingPage =  (req, res) => {
    res.render('landing')
    // res.status(200).json('Home Page')
}