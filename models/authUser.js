const {Schema, model} = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        // required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

// userSchema.plugin(passportLocalMongoose)
module.exports = model("Users", userSchema)