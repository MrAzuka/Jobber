const bcrypt = require('bcrypt')
const User = require('../models/authUser')


exports.userSignUp = async (req, res) => {
    try {
        const userCheck = await User.findOne({email: req.body.email})
        if (userCheck == true) {
            res.json('email already exists')
        }else {
            await User.create({
                fullName: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
        }
        res.status(200).json('User created successfully')
    } catch (error) {
        res.status(400).json({error})
    }
}