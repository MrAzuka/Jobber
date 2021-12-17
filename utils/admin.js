const User = require('../models/authUser')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { ADMIN_PASSWORD, ADMIN_EMAIL } = process.env

exports.seedAdmin = async () => {
    try {
        // Check if Admin already exists
        const findAdmin = await User.findOne({ role: "admin" })
        if (findAdmin) return console.log("Admin already exists")

        // Create new Admin
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(ADMIN_PASSWORD, salt)
        const createAdmin = await User.create({

            fname: "Admin",
            lname: "Admin",
            email: ADMIN_EMAIL,
            password: hashPassword,
            country: "Nil",
            occup: "admin",
            role: "admin"
        })
        const newAdmin = await createAdmin.save()
        console.log("Admin Created")
    } catch (err) {
        console.log(err)
    }

}
