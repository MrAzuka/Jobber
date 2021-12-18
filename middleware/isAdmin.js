// check if the user is an admin
require('dotenv').config()
const { ADMIN_PASSWORD, ADMIN_EMAIL } = process.env

exports.checkIsAdmin = (req, res, next) => {
    user = req.session.user
    if (user.role !== "admin") {
        res.status(401).json({ message: "Route restricted to admin only" })
    }
    next()

}