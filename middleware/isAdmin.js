// check if the user is an admin

exports.checkIsAdmin = (req, res, next) => {

    if (!req.session.admin) {
        res.status(401).json({ message: "Route restricted to admin only" })
    }
    next()
}