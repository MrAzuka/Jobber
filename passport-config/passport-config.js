const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/authUser')
const passport = require('passport')


exports.serializeUser = passport.serializeUser( function (user, done) {
                            done(null, user.id)
                                
                        })
exports.deserializeUser = passport.deserializeUser( function (id, done) {
                                User.findById(id, function (err, user) {
                                    done(err, user)
                                })
                            })

exports.passportMiddleWare = passport.use(new LocalStrategy(function (username, password, done) {
                                User.findById({username: username}, function (err, user) {
                                    if (err) return done(err)
                                    if (!user) return done(null, false, {message: "Incorrect Username. "})

                                    bcrypt.compare(password, user.password, function (err, res) {
                                        if (err) return done(err)
                                        if (res === false) return done(null, false, {message: "Incorrect password"})

                                        return done(null, user)
                                    })
                                })
                            }))
