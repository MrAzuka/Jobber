const Profile = require('../models/userProfile')

exports.createProfile = async (req, res) => {
    try {
        const newProfile = new Profile({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            address: req.body.address,
            occup: req.body.occup
        })

        const User = await newProfile.save()
        res.status(201).json({ message: "Profile created" })
        res.redirect('/home')
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const updateProfile = await Profile.findByIdAndUpdate(req.params.id, {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            address: req.body.address,
            occup: req.body.occup
        })

        if (req.params.id != updateProfile) {
            res.status(404).json({ message: "Profile not Found" })
        } else {
            res.status(200).json({ "profile": updateProfile })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err })
    }
}


exports.getProfilePage = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id)
        if (req.params.id != profile) {
            res.status(404).json({ message: "Profile not Found" })
        } else {
            res.status(200).json({ "User profile": profile })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err })
    }
}