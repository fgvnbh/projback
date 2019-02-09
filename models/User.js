const crypto = require('crypto');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type:String,
        lowercase: true,
        trim:true,
    },
    hash: String,
    salt: String,
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

const User = mongoose.model("User", UserSchema);
module.exports=User;