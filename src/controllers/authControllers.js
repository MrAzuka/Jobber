const bcrypt = require('bcrypt')
const User = require('../models/authUser')


exports.userSignUp = async (req, res) => {
    await User.findOne({email: req.body.email}, (err,existingUser) => {
        if (err) {
            res.status(500).json({err})
        }
        if(existingUser) {
            res.status(400).json('A user already has that email')
        }
        // Create new user
        User.create({
            fullName: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, (err, newUser) => {  
            if(err){
             res.status(500).json({err})
            }else{
                res.status(200).json('User created Successfully')
            }
        }) 
    })
}

exports.userLogin = async (req, res) => {
    await User.findOne({email: req.body.email}, (err,existingUser) => {
        if (err) {
            res.status(500).json({err})
        }
        if(!existingUser) {
            res.status(401).json({message: "Incorrect Username"})
        }
        // Compare passowrd with hashed password
        let matchedPassword = bcrypt.compareSync(req.body.password, existingUser.password)
        if(!matchedPassword){
            res.status(401).json({message: "Incorrect password"})
        }else{
            res.status(200).json('Logged in successfully')
        }
     })
}

exports.getSignUpPage = async (req, res) => {
    res.status(200).json('SignUp page')
}

exports.getLoginPage = async (req, res) => {
    res.status(200).json('Login Page')
}