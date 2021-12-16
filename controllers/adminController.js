const Users = require('../models/authUser')


// Gets all Users
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find({})
        res.status(200).json({ "Users": allUsers })
    } catch (err) {
        console.log("I'm the error")
        res.status(500).json({ "Error": err })
    }
}

// Gets User with email
exports.getOneUser = async (req, res) => {
    try {
        const oneUser = await Users.findOne({ email: req.params.email })
        res.status(200).json({ "User": oneUser })
    } catch (err) {
        res.status(500).json({ "Error": err })
    }
}

// Updates User from db
exports.updateUser = async (req, res) => {
    try {
        const updateUser = await Users.findOneAndUpdate({ email: req.params.email }, {
            fname: req.body.fname,
            lname: req.body.lname,
            password: req.body.password,
            country: req.body.country,
            occup: req.body.occup
        })
        if (email != updateUser) {
            res.status(404).json("User not found")
        }
        res.status(200)
            .json({ message: "Succesfully Updated" }, { "User": updateUser })
    } catch (err) {
        res.status(500).json({ "Error": err })
    }
}

// Deletes contact from db
exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await Users.findOneAndDelete({ email: req.params.email })
        if (email != deleteUser) {
            res.status(404).json("User doesn't exist")
        }
        res.status(200).json("User Deleted Succsessfully")
    } catch (err) {
        res.status(500).json({ "Error": err })
    }
}
