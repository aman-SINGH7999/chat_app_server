const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "Email is Required."],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Password is Required."]
    },
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    image : {
        type : String
    },
    bio : {
        type : String,
    }
}, {timestamps : true},)


userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user',userSchema);
module.exports = User
