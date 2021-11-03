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

        console.log(user)
        res.redirect('/login')
        } catch (err) {
            console.log(err)
        }
} 
    


exports.userLogin = async (req, res) => {
   try {
    const user = await User.findOne({username: req.body.username})
    if (!user) {
        req.flash('error', "User doesn't exist")
        res.redirect('/login')
    }
   
    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if(!isMatch) {
        req.flash("error", "Wrong password")
        res.redirect('/login')  
    }
    req.session.isAuth = true
    res.redirect('/home')
   } catch (err) {
       console.log(err)
   }
}

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