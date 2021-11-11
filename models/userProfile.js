const {Schema, model} = require('mongoose')


const profileSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId
    },
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
    country: {
        type: String,
        trim: true
    },
    occup: {
        type: String,
        trim: true
    }
}, {timestamps: true})


module.exports = model("Profile", profileSchema)