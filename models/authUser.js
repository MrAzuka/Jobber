const { Schema, model } = require('mongoose')


const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        trim: true
    },
    occup: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, { timestamps: true })


module.exports = model("User", userSchema)