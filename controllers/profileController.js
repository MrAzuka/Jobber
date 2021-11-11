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
        res.redirect('/home', 201)
    } catch (err) {
        console.log(err)
        // TODO: Send a flash error message and redirect to error page
    }
}

exports.updateProfile = async (req,res) => {
    try {
        const updateProfile = await Profile.findByIdAndUpdate(req.params.id, {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            address: req.body.address,
            occup: req.body.occup
        })
        
        if (req.params.id != updateProfile) {
            // TODO: Redirect to update page and send a flash error message
            res.send('404error')
        }else{
            res.send(`profile: ${updateProfile}`)
        }
    } catch (err) {
        console.log(err)
        res.send('404error')
    }
}


exports.getProfilePage = (req,res) => {
    res.render('profile', {layout: 'form.hbs'})
}