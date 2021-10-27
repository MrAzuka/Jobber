const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


const initialize = (passport, getUserByEmail, getUserById) => {
    const authenticateUser = async(email, password, done) => {
        const user = await getUserByEmail(email)
        if(user == null) {
            return done(null, false, {message: "No user with that email"})
        }

        try {
            if(await bcrypt.compare(passport, user.password)){
                return done(null, user)
            } else{
                return done(null, false, {message: "Password Incorrect"})
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: "email"}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        return done(null, await getUserById(id))
    })
}
module.exports = initialize 