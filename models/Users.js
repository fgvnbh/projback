const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30
        },
        age: {
            type: Date
        },
        description: {
            type: String,
            maxLength: 500
        },
    photoURL: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    hash: String,
    salt: String,
    admin:Boolean
},{versionKey: false});
const Users = mongoose.model("Users", usersSchema);

module.exports = Users;