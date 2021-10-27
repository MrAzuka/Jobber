const {Schema, model} = require('mongoose')


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        // required: true
    },
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

module.exports = model("Users", userSchema)