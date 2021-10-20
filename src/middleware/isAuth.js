exports.isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    }else{
        res.status(500).json('Not Authenticated')
    }
}