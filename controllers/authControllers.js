const bcrypt = require('bcrypt')
const User = require('../models/authUser')


exports.userSignUp = async (req, res) => {
   try {
    const {username, email, password} = req.body

    let user = await User.findOne({email})
 
    if (user) {
        return res.json('User already exist')
    }
 
    user = new User({
        username,
        email,
        password
    })
 
    await user.save()
    
    // return res.status(200).json('User Creation Success')
   } catch (error) {
       res.status(500).json({error})
   }
   res.redirect('login.ejs')
}

exports.userLogin = async (req, res) => {
    try {
        const {email, password} = req.body

    let user = await User.findOne({email})
 
    if (!user) {
       return res.status(200).json('User doesn\'t exist')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
       return res.status(200).json('Go and login')   
    }
    req.session.isAuth = true
    return res.status(200).json('Login Success')
    } catch (error) {
        res.status(500).json({error})
    }
    res.redirect('home.ejs')
}

exports.userLogout = async (req, res) => {
    try {
        await req.session.destroy()
        res.status(200).json('Logout Success')
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getSignUpPage =  (req, res) => {
    res.render('signup')
    res.status(200).json('SignUp page')
}

exports.getLoginPage =  (req, res) => {
    res.render('login.ejs')
    res.status(200).json('Login Page')
}

exports.getHomePage =  (req, res) => {
    res.render('login.ejs')
    res.status(200).json('Home Page')
}

