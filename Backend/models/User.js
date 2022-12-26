const mongoose = require('mongoose');

const userShema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        userRole: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userShema);

module.exports = User;