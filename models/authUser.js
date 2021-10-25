const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

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

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err); }
      user.password = hash;
      next();
    })
  });


module.exports = model("Users", userSchema)